import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private usuarioService: UsuariosService
  ) { }
  
  public efetuarLogout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }
}
