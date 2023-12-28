import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: any = {};
  @Input() options: any = [];

  public url: string | ArrayBuffer | null = null;

  constructor(
    private readonly storageService: StorageService
  ) { }

  ngOnInit(): void {
    console.log('this.project', this.project);
    // throw new Error('Method not implemented.');
    // get image by url - logo
    this.setUrl();


  }

  onFileChanged(event: any) { }

  setUrl() {
    if (this.project.logo &&  this.project.logo != '') {
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

}
