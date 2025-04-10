import { Component } from '@angular/core';
import { TikTokDownloaderComponent } from './tiktok-downloader/tiktok-downloader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TikTokDownloaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tiktok-downloader';
}
