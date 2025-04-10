import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tiktok-downloader',
  templateUrl: './tiktok-downloader.component.html',
  styleUrls: ['./tiktok-downloader.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class TikTokDownloaderComponent {
  url: string = '';
  output: string = '';
  sources: any[] = [];
  isLoading: boolean = false;
  isSearchCompleted: boolean = false;
  isFormVisible: boolean = true;
  isTitleVisible: boolean = true;

  constructor(private http: HttpClient) {}

  // Función para enviar la solicitud y obtener los datos de la API
  async onSubmit() {
    const url = this.url.trim();

    // Expresión regular para validar la URL de TikTok (incluyendo vm.tiktok.com)
    const tiktokUrlPattern = /^(https:\/\/(?:www\.)?tiktok\.com\/@?[a-zA-Z0-9._%+-]+\/video\/[0-9]+(?:\?[\w&=]+)?)|(https:\/\/vm\.tiktok\.com\/[a-zA-Z0-9]+\/?)$/;
    
    if (!tiktokUrlPattern.test(url)) {
      this.output = 'Por favor, ingresa una URL válida de TikTok.';
      return;
    }

    this.isLoading = true;
    this.isSearchCompleted = false;

    try {
      const apiUrl = `http://localhost:3000/download`;
      const response = await firstValueFrom(this.http.post<any>(apiUrl, { url: url }));

      console.log('response:', response);
      console.log('sources:', this.sources);
      console.log('output:', this.output);

      if (response.data && response.data.sources && response.data.sources.length > 0) {
        this.sources = response.data.sources;
      } else {
        this.output = 'No se encontraron fuentes de video disponibles.';
      }
    } catch (error) {
      console.error(error);
      this.output = 'Hubo un error al procesar la solicitud.';
    } finally {
      this.isLoading = false;
      this.isSearchCompleted = true;
      this.isFormVisible = false;
      this.isTitleVisible = false;
    }
  }

  onNewSearch() {
    this.isSearchCompleted = false; // Reiniciar el estado de búsqueda
    this.url = ''; // Limpiar el campo de URL
    this.output = ''; // Limpiar el resultado
    this.sources = []; // Limpiar las fuentes
    this.isFormVisible = true;  // Mostrar el formulario nuevamente para una nueva búsqueda
    this.isTitleVisible = true; // Mostrar el título nuevamente
  }

  // Función para forzar la descarga del video
  async downloadVideo(url: string, filename: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Error al descargar el video:', error);
    }
  }

  // Función para obtener un timestamp único
  getTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}_${milliseconds}`;
  }

  // Función para extraer la calidad del video
  extractQuality(url: string): string {
    const match = url.match(/br=(\d+)/);
    if (match) {
      const bitrate = parseInt(match[1]);
      return bitrate > 1000 ? `${bitrate / 1000} kbps` : 'Desconocida';
    }
    return 'Desconocida';
  }
}