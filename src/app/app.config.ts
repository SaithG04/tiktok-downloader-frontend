import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { TikTokDownloaderComponent  } from './tiktok-downloader/tiktok-downloader.component'
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    FormsModule
  ]
};