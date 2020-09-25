import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/Usuario';
import { UsuariosService } from '../services/usuarios.service';
import { CpfValidator } from '../validators/cpf-validator';

@Component({
	selector: 'app-alterar-usuario',
	templateUrl: './alterar-usuario.page.html',
	styleUrls: ['./alterar-usuario.page.scss'],
})
export class AlterarUsuarioPage implements OnInit {
	public formAlterar: FormGroup;

	public validacao = {
		nome: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'minlength', msg: 'Insira no mínimo 3 caracteres!' }
		],
		cpf: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'minlength', msg: 'Insira no mínimo 11 caracteres!' },
			{ tipo: 'maxlength', msg: 'Insira no máximo 14 caracteres!' },
			{ tipo: 'invalido', msg: 'CPF inválido!' }
		],
		dataNascimento: [
			{ tipo: 'required', msg: 'Campo obrigatório!' }
		],
		genero: [
			{ tipo: 'required', msg: 'Campo obrigatório!' }
		],
		celular: [
			{ tipo: 'maxlength', msg: 'Insira no mínimo 10 caracteres!' },
			{ tipo: 'maxlength', msg: 'Insira no máximo 16 caracteres!' }
		],
		email: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'email', msg: 'E-mail inválido!' }
		]
	};

	private usuario: Usuario;
	private manterLogadoTemp: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private route: Router,
		private usuariosService: UsuariosService,
		public alertCtrl: AlertController
	) {

		this.formAlterar = formBuilder.group({
			nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
			cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfValidator.cpfValido])],
			dataNascimento: ['', Validators.compose([Validators.required])],
			genero: ['', Validators.compose([Validators.required])],
			celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(16)])],
			email: ['', Validators.compose([Validators.required, Validators.email])]
		});

		this.preencherFormulario();
		
	}

	ngOnInit() {

	}

	public async preencherFormulario() {
		this.usuario = await this.usuariosService.buscarUsuarioLogado();
		this.manterLogadoTemp = this.usuario.manterLogado;
		delete this.usuario.manterLogado;

		this.formAlterar.setValue(this.usuario);
		this.formAlterar.patchValue({ dataNascimento: this.usuario.dataNascimento.toISOString() });
	}

	public async salvar() {
		if (this.formAlterar.valid) {
			this.usuario.nome = this.formAlterar.value.nome;
			this.usuario.dataNascimento = new Date(this.formAlterar.value.dataNascimento);
			this.usuario.genero = this.formAlterar.value.genero;
			this.usuario.celular = this.formAlterar.value.celular;
			this.usuario.email = this.formAlterar.value.email;

			if (await this.usuariosService.alterarUsuario(this.usuario)) {
				this.usuario.manterLogado = this.manterLogadoTemp;
				this.usuariosService.salvarUsuarioLogado(this.usuario);
				this.exibirAlerta('Sucesso', 'Usuário alterado com sucesso');
				this.route.navigateByUrl('/home');
			}
		} else {
			this.exibirAlerta('Advertência', 'Formulário inválido <br> Verifique os campos do seu formulário e preencha-os adequadamente!')
		}
	}

	async exibirAlerta(titulo: string, msg: string) {
		const alert = await this.alertCtrl.create({
			header: titulo,
			message: msg,
			buttons: ['OK']
		});

		await alert.present();
	}

}
