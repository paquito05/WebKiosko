import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      const body = document.getElementsByTagName('body')[0];
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (body.classList.contains('modal-open')) {
        body.classList.remove('modal-open');
        modalBackdrop.remove();
      }
    });

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['./pages/login']);
    }

    if (localStorage.getItem('token') != null && localStorage.getItem('role') === "ADMIN_ROLE") {
      this.router.navigate(['./tienda']);
    }


    if (localStorage.getItem('token') != null && localStorage.getItem('role') === "USER_ROLE") {
      this.router.navigate(['./detalletienda']);
    }
    

  }
}
