import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-contenidos',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, RouterLink],
  templateUrl: './gestionar-contenidos.html',
  styleUrl: './gestionar-contenidos.scss',
})
export class GestionarContenidos {
  contenidos = [
    { id: 1, titulo: 'Introducción a Angular', curso: 'Angular desde Cero', tipo: 'VIDEO', url: 'https://youtube.com/...', fecha: '10 Ene 2025' },
    { id: 2, titulo: 'Componentes y Módulos', curso: 'Angular desde Cero', tipo: 'PDF', url: 'https://drive.google.com/...', fecha: '12 Ene 2025' },
    { id: 3, titulo: 'Pandas y NumPy', curso: 'Python para Datos', tipo: 'VIDEO', url: 'https://youtube.com/...', fecha: '08 Ene 2025' },
    { id: 4, titulo: 'Visualización con Matplotlib', curso: 'Python para Datos', tipo: 'PRESENTACION', url: 'https://slides.com/...', fecha: '09 Ene 2025' },
    { id: 5, titulo: 'Principios de Diseño', curso: 'Diseño UI/UX', tipo: 'PDF', url: 'https://drive.google.com/...', fecha: '05 Ene 2025' },
    { id: 6, titulo: 'Figma Avanzado', curso: 'Diseño UI/UX', tipo: 'ENLACE', url: 'https://figma.com/...', fecha: '06 Ene 2025' },
  ];

  getTipoIcon(tipo: string): string {
    const map: Record<string, string> = {
      'VIDEO': 'smart_display',
      'PDF': 'picture_as_pdf',
      'PRESENTACION': 'slideshow',
      'ENLACE': 'link',
    };
    return map[tipo] ?? 'insert_drive_file';
  }

  getTipoColor(tipo: string): string {
    const map: Record<string, string> = {
      'VIDEO': '#F44336',
      'PDF': '#F48C06',
      'PRESENTACION': '#9C27B0',
      'ENLACE': '#49BBBD',
    };
    return map[tipo] ?? '#49BBBD';
  }

  getTipoBg(tipo: string): string {
    const map: Record<string, string> = {
      'VIDEO': '#FFEBEE',
      'PDF': '#FFF3E0',
      'PRESENTACION': '#F3E5F5',
      'ENLACE': '#E0F7F7',
    };
    return map[tipo] ?? '#E0F7F7';
  }

  countTipo(tipo: string): number {
    return this.contenidos.filter(c => c.tipo === tipo).length;
  }
}
