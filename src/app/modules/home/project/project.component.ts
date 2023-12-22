import { Component, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { IAlert } from 'src/app/models/IAlert';
import { IUser } from 'src/app/models/IUser';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent extends BaseComponent implements OnInit {

  public alert = signal<IAlert | undefined>(undefined);
  public projects_customer = signal<any[]>([]);
  public projects_colaborator = signal<any[]>([]);
  

  constructor(
    public override readonly translate: TranslateService,
    public override readonly appService: AppService,
    public readonly userService: UserService,
  ) {
    super(translate, appService);
  }

  ngOnInit(): void {
    // mis projects_customer, projects_colaborator
    this.callServices().then(()=>{
      console.log('call callServices');

    })
  }
  
  async callServices(){
    console.log('init callServices');
    this.userService.getUser().subscribe(user => {
      console.log('ProjectComponentUser', user);
      this.projects_customer.set(user?.projects_customer??[]);
      this.projects_colaborator.set(user?.projects_colaborator??[]);
    });
    
  }

}
