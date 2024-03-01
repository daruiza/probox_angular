import { ApplicationConfig, CSP_NONCE, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './services/midleware/loading.service';
import { SnackBarService } from './services/midleware/snackbar.service';

export const appConfig: ApplicationConfig = {

    providers: [{
        provide: CSP_NONCE,
        useValue: 'FwL+nkiRn6uydWA4g7MJtojf5RIpHSxnBwTzpS1+zyE='
    },
    LoadingService,
    SnackBarService,
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideRouter(routes)
    ]
};
