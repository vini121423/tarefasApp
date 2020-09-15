import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Armazena informações do formulário
  public formLogin: FormGroup;


  public mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo e-mail é obrigatório!' },
      { tipo: 'email', mensagem: 'E-mail inválido!' }
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo senha é obrigatório!' },
      { tipo: 'minlength', mensagem: 'A senha deve possuir pelo menos 6 caracteres !' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      manterLogado: [false]
    });

  }

  ngOnInit() {
  }
 
  async ionViewWillEnter() {
   const usuarioLogado = await this.usuarioService.buscarUsuarioLogado();
   if(usuarioLogado && usuarioLogado.manterLogado){
	   this.router.navigateByUrl('/home');
	   this.presentToast();
   }
  }


  public async login() {

    if (this.formLogin.valid) {

      const usuario = await this.usuarioService.login(this.formLogin.value.email, this.formLogin.value.senha);

      if (usuario) {
        usuario.manterLogado = this.formLogin.value.manterLogado;
        this.usuarioService.salvarUsuarioLogado(usuario);
        this.router.navigateByUrl('/home');
        this.presentToast();

      } else {
        this.presentAlert('Advertência', 'Usuário ou senha inválidos!')
      }

    } else {
      this.presentAlert('Erro', 'Formulário inválido, confira os campos e tente novamente!')
    }

  }


  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Login efetuado com sucesso!',
      duration: 2500
    });
    toast.present();
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();

  }

}
