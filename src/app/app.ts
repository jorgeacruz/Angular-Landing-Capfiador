import { Component, signal, OnInit } from '@angular/core';
import { Menu } from './components/menu/menu';
import { Footer } from './components/footer/footer';
import { Home } from './pages/home/home';
import { Spiner } from './components/spiner/spiner';
import { Login } from './pages/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Menu, Footer, Home, Spiner, Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  isLoadingState = signal<boolean>(false);

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoadingState.set(true);
    setTimeout(() => {
      this.isLoadingState.set(false);
    }, 4000);
  }

  protected readonly title = signal('Start War - Quizz');
}
