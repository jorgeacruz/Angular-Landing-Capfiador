import { Component, signal, OnInit } from '@angular/core';
import { Menu } from './components/menu/menu';
import { Footer } from './components/footer/footer';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Menu, Footer, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Cap Fiador');
}
