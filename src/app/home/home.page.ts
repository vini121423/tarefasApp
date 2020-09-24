import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    public alertController: AlertController
  ) { }

  async ionViewWillEnter() {
    const usuarioLogado = await this.usuarioService.buscarUsuarioLogado();
    if (!usuarioLogado) {
      this.router.navigateByUrl('/login');
    }
  }

  async exibirAlertaLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Quer mesmo sair do Aplicativo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Quero sair',
          handler: () => {
            this.usuarioService.removerUsuarioLogado();
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
