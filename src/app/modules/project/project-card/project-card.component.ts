import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ModalMapComponent } from '../../shared/modal-map/modal-map.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { SnackBarService } from 'src/app/services/midleware/snackbar.service';
import { BaseComponent } from 'src/app/components/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent extends BaseComponent implements OnInit {

  @Input() project: any = {};
  @Input() options_user: any = [];
  @Output() updataProject = new EventEmitter<any>();

  options_card = signal<any[]>([]);

  public projectFormOld!: any;
  public projectForm!: FormGroup;

  public url: string | ArrayBuffer | null = null;

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    private readonly storageService: StorageService,
    private readonly projectService: ProjectService,
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
    this.init();
    this.formConstructor().then(() => {
      this.callService();

    })

  }

  async init() {

    this.options_card.set(
      this.options_user?.filter((el: any) =>
        el.pivot.name == 'card' && el.pivot.description == 'card')
        .map((il: any) => ({ ...il, badge: null })) ?? []
    );
  }

  async formConstructor() {
    this.projectForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      logo: new FormControl(),
      photo: new FormControl(),
      address: new FormControl(),
      location: new FormControl(),
      // tags: new FormArray([])
    });
    this.projectForm.patchValue({ ...this.project }, { emitEvent: false });
    this.projectFormOld = { ...this.projectForm.value }
  }

  callService() {
    this.projectData();
    this.setUrl();
  }

  // Services
  projectData() {
    this.projectService.showbyid(this.project.id).subscribe(project => {

      this.options_card.set(this.options_card().map((el: any) => {
        if (el.name === 'notes') return { ...el, badge: project?.notes?.length ?? null }
        if (el.name === 'documents') return { ...el, badge: project?.documents?.length ?? null }
        if (el.name === 'tasks') return { ...el, badge: project?.tasks?.length ?? null }
        if (el.name === 'colaborators') return { ...el, badge: project?.colaborators?.length ?? null }
        if (el.name === 'customers') return { ...el, badge: project?.customers?.length ?? null }
        return { ...el }
      }))

      console.log('project', project);
      console.log('options_card', this.options_card());
    })
  }

  setUrl() {
    if (this.project.logo && this.project.logo != '') {
      this.storageService.downloadFile(this.project.logo).subscribe(file => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.url = reader.result;
        }, false);
        if (file) {
          reader.readAsDataURL(file);
        }
      })
    }
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
        this.url = reader.result;
      };
    }
  }

  showAddressMap() {
    const mapModal = this.modalService.open(ModalMapComponent, { size: 'lg', backdrop: 'static' });
    if (this.options_user.find((el: any) => el.name === 'edit_map')) mapModal.componentInstance.addMarkerOnClick = true;
    mapModal.componentInstance.location = this.project?.location ? JSON.parse(this.project?.location) : null;
    mapModal.componentInstance.marker_options = { title: this.project?.name ?? '', draggable: true }
    mapModal.componentInstance.addressMarkerOnChange.subscribe((geo: any) => {
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
    return JSON.stringify(this.projectFormOld) == JSON.stringify(this.projectForm.value)
  }

}
