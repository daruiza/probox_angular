import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Signal, ViewChild, ViewChildren, ViewContainerRef, computed, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ModalMapComponent } from '../../shared/modal-map/modal-map.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { SnackBarService } from 'src/app/services/midleware/snackbar.service';
import { BaseComponent } from 'src/app/components/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';
import { ProjectTaskComponent } from '../project-task/project-task.component';
import { OptionCard } from 'src/app/enums/option-card';
import { ProjectDocumentComponent } from '../project-document/project-document.component';
import { ProjectCustomerComponent } from '../project-customer/project-customer.component';
import { ProjectColaboratorComponent } from '../project-colaborator/project-colaborator.component';
import { ProjectNoteComponent } from '../project-note/project-note.component';
import { TagService } from 'src/app/services/project/tag.service';
import { forkJoin } from 'rxjs';

import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent extends BaseComponent implements OnInit {

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChildren('project_option_componet', { read: ViewContainerRef }) container!: QueryList<ViewContainerRef>;

  @Input() project: any = {};
  @Input() options_user: any = [];
  @Output() updataProject = new EventEmitter<any>();

  options_card = signal<any[]>([]);
  options_main = signal<any[]>([]);

  tags_status = signal<any[]>([]);
  tags_labour = signal<any[]>([]);

  // todos los tags
  tag_status_default = signal<any[]>([]);
  tag_labour_default = signal<any[]>([]);

  // tags que se dentro del selector
  // tag_status_select: Signal<any[]> = computed(() => (this.tag_status_default().filter(tsd => !this.tags_status().find(ts => ts === tsd))));
  tag_status_select: Signal<any[]> = computed(() => this.tag_status_default().filter(tsd => !this.tags_status().find(ts => ts.name === tsd.name)));
  tag_labour_select: Signal<any[]> = computed(() => this.tag_labour_default().filter(tsd => !this.tags_labour().find(ts => ts.name === tsd.name)));


  public projectFormOld = signal<any>({});
  public projectForm!: FormGroup;

  tagCtrl = new FormControl('');
  separatorKeysCodes: number[] = [ENTER, COMMA];

  public url = signal<string | ArrayBuffer | null>(null);

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    private readonly storageService: StorageService,
    private readonly projectService: ProjectService,
    private readonly tagService: TagService,
    private readonly modalService: NgbModal,
    public readonly snackBarService: SnackBarService,
  ) { super(translate, appService); }

  ngOnDestroy(): void {
    if (this.translateSuscription) {
      this.translateSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // get image by url - logo
    this.optionsSet();
    this.formConstructor().then(() => {
      this.callService();
    })
  }

  ngAfterViewInit() {
    // this.cdr.detectChanges();
    // console.log('ngAfterViewInit', this.container);
    // console.log('ngAfterViewInit', this.container);
  }

  // Opera con al opciones 
  async optionsSet() {
    this.options_card.set(
      this.options_user?.filter((el: any) =>
        el.pivot.name == 'card' && el.pivot.description == 'card')
        .map((il: any) => ({ ...il, badge: null })) ?? []
    );

    this.options_main.set(
      this.options_user?.filter((el: any) =>
        el.pivot.name == 'card' && el.pivot.description == 'card_main')
        .map((il: any) => ({ ...il, badge: null })) ?? []
    );

    this.tags_status.set(
      this.project.tags?.filter((el: any) =>
        el.category == 'status')
        .map((il: any) => ({ ...il, badge: null })) ?? []
    );

    this.tags_labour.set(
      this.project.tags?.filter((el: any) =>
        el.category == 'labour')
        .map((il: any) => ({ ...il, badge: null })) ?? []
    );

    console.log('this.options_main', this.options_main());

  }

  async formConstructor() {
    this.projectForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      logo: new FormControl(),
      photo: new FormControl(),
      address: new FormControl(),
      location: new FormControl(),
    });
    this.projectForm.patchValue({ ...this.project }, { emitEvent: false });
    this.projectFormOld.set({ ...this.projectForm.value })
  }

  callService() {
    this.projectData();
    this.setUrl();
  }

  // Services
  projectData() {

    forkJoin([
      this.projectService.showbyid(this.project.id),
      this.tagService.get()
    ]).subscribe({
      next: ([project, tags]) => {

        // Asignación de badge para las Opciones
        this.options_card.set(this.options_card().map((el: any) => {
          if (el.name === 'notes') return { ...el, badge: project?.notes?.length ?? null }
          if (el.name === 'documents') return { ...el, badge: project?.documents?.length ?? null }
          if (el.name === 'tasks') return { ...el, badge: project?.tasks?.length ?? null }
          if (el.name === 'colaborators') return { ...el, badge: project?.colaborators?.length ?? null }
          if (el.name === 'customers') return { ...el, badge: project?.customers?.length ?? null }
          return { ...el }
        }))


        console.log('project', project);
        console.log('tags', tags);

        this.tag_status_default.set(tags.filter((el: any) => el.category === 'status' && el.default === 1))
        this.tag_labour_default.set(tags.filter((el: any) => el.category === 'labour' && el.default === 1))
        // console.log('tag_status_default', this.tag_status_default());
        // console.log('tag_labour_default', this.tag_labour_default());


      },
      error: (error) => {
        console.log('projectData', error);
        console.log('error.status', error.status);
        // Si el erro es 401
        // this.activeModal.close;
      }
    });
  }

  setUrl() {
    if (this.project.logo && this.project.logo != '') {
      this.storageService.downloadFile(this.project.logo).subscribe(file => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.url.set(reader.result);
        }, false);
        if (file) {
          reader.readAsDataURL(file);
        }
      })
    }
  }

  // Events

  option_after_open(option: any) {

    // Actualización de Opción
    // this.options_card.set(this.options_card().map((op: any) => {
    //   if (op.name === option.name) return { ...option, badge: null }
    //   return op;
    // }))

    let ProjectTaskComponentRef = null;
    this.container.get(this.options_card().indexOf(option))?.clear();
    switch (option.name) {

      case OptionCard.tasks:
        ProjectTaskComponentRef = this.container.get(this.options_card().indexOf(option))?.createComponent(ProjectTaskComponent);
        // ProjectTaskComponentRef.instance.input = value;
        break;
      case OptionCard.documents:
        ProjectTaskComponentRef = this.container.get(this.options_card().indexOf(option))?.createComponent(ProjectDocumentComponent);
        // ProjectTaskComponentRef.instance.input = value;
        break;
      case OptionCard.customers:
        ProjectTaskComponentRef = this.container.get(this.options_card().indexOf(option))?.createComponent(ProjectCustomerComponent);
        // ProjectTaskComponentRef.instance.input = value;
        break;
      case OptionCard.colaborators:
        ProjectTaskComponentRef = this.container.get(this.options_card().indexOf(option))?.createComponent(ProjectColaboratorComponent);
        // ProjectTaskComponentRef.instance.input = value;
        break;
      case OptionCard.notes:
        ProjectTaskComponentRef = this.container.get(this.options_card().indexOf(option))?.createComponent(ProjectNoteComponent);
        break;
      default:
        break;
    }
    if (option.name === OptionCard.tasks) {
    }
  }

  // Event Chips
  remove(tag: any) {
    this.tags_status.set([...this.tags_status().filter(el => el != tag)]);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    // Actualizamos las tag en back
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    console.log('value', { name: value, category: 'status', class: 'primary', default: 0, });


    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  selected(tag: MatAutocompleteSelectedEvent) {
    this.tags_status.set([...this.tags_status(), this.tag_status_default().find(el => el.name === tag.option.viewValue)]);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  onFileChanged(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.storageService.postUpload(`commerce/${this.project.commerce_id ?? 1}/project/${this.project.id ?? 1}/logo`, file).subscribe(
        response => {
          if (response) {
            console.log('postUpload', response);
            // asignamos a campo photo
            // this.userForm.get('photo')?.setValue(response.storage_image_path);
          }
        })
    }

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url.set(reader.result);
      };
    }
  }

  showAddressMap() {
    const mapModal = this.modalService.open(ModalMapComponent, { size: 'lg', backdrop: 'static' });
    if (this.options_user.find((el: any) => el.name === 'edit_map')) mapModal.componentInstance.addMarkerOnClick = true;
    mapModal.componentInstance.location = this.project?.location ? JSON.parse(this.project?.location) : null;
    mapModal.componentInstance.marker_options = { title: this.project?.name ?? '', draggable: true }
    mapModal.componentInstance.addressMarkerOnChange.subscribe((geo: any) => {
      console.log('geo', geo);

      this.projectForm.get('address')?.setValue(geo.address);
      this.projectForm.get('location')?.setValue(geo.location);
    });

    mapModal.result.then(result => {
      this.save();
    }, reason => {
      this.save();
    });
  }

  save() {
    // se guardan los cambios
    if (!this.oldChanges()) {
      this.projectService.update(this.project.id, { ...this.projectForm.value }).subscribe({
        next: (project) => {
          // this.alert.set({
          //   type: 'danger',
          //   message: error.error.message,
          //   title: 'Actualizacción denegada',
          // })
          const message = project?.message ? project?.message : '';
          const action = 'update-ok!';
          this.snackBarService.updatedSnackBehavior({
            message: message,
            action: action,
            onAction: () => { }
          });
        },
        error: (error) => {
          const errorMessage = error?.error?.message ? error.error.message : error.message;
          const errorAction = error?.error?.action ? error.error.action : 'Error!';
          this.snackBarService.updatedSnackBehavior({
            message: errorMessage,
            action: errorAction,
            onAction: () => { }
          });
        },
        complete: () => {
          // Actualizamos los proyectos
          this.updataProject.emit('update_ok');
        }
      })
    }
  }

  // validaciones
  oldChanges() {
    return JSON.stringify(this.projectFormOld()) == JSON.stringify(this.projectForm.value)
  }

}
