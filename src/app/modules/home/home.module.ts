import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project/project.component'
import { ProjectModule } from '../project/project.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/auth/user.service';
import { AuthInterceptor } from 'src/app/services/interceptors/auth.interceptor';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TagService } from 'src/app/services/project/tag.service';
import { AppModule } from 'src/app/app.module';
import { SnackbarComponent } from "../../components/snackbar/snackbar.component";
import { LoadingComponent } from "../../components/loading/loading.component";

@NgModule({
    declarations: [
        HomeComponent,
        WelcomeComponent,
        ProjectComponent,
    ],
    exports: [
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthGuard,
        AuthService,
        UserService,
        StorageService,
        ProjectService,
        TagService,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        ProjectModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        // SnackbarComponent,
        // LoadingComponent
    ]
})
export class HomeModule { }
