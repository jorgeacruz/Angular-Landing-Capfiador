import { Component } from '@angular/core';

import { CarousselComponent } from '../../components/caroussel/caroussel';
import { FaqAccordionComponent } from '../../components/faq-questions/faq-accordion';
import { RouterLink, Router } from '@angular/router';
import { FormularioComponent } from '../../components/formulario/formulario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarousselComponent, FaqAccordionComponent, RouterLink, FormularioComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private readonly router: Router) {}

  irParaContato(): void {
    this.router.navigate(['/'], { fragment: 'Inicio' });
  }
}
