import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
	selector: 'app-registro',
	templateUrl: './registro.page.html',
	styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

	public formRegister: FormGroup;

	public validacao = {
		nome: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'minlength', msg: 'Insira no mínimo 3 caracteres!' }
		],
		cpf: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'minlength', msg: 'Insira no mínimo 11 caracteres ou no máximo 14!' },
			{ tipo: 'maxlength', msg: 'Insira no mínimo 11 caracteres ou no máximo 14!' }
		],
		data_nascimento: [
			{ tipo: 'required', msg: 'Campo obrigatório!' }
		],
		genero: [
			{ tipo: 'required', msg: 'Campo obrigatório!' }
		],
		celular: [
			{ tipo: 'maxlength', msg: 'Insira no máximo 16 caracteres!' }
		],
		email: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'email', msg: 'E-mail inválido!' }
		],
		senha: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'minlength', msg: 'Insira no mínimo 6 caracteres!' },
		],
		senha_confirm: [
			{ tipo: 'required', msg: 'Campo obrigatório!' },
			{ tipo: 'minlength', msg: 'Insira no mínimo 6 caracteres!' },
		]
	};

	constructor(private formBuilder: FormBuilder, private route: Router) {

		this.formRegister = formBuilder.group({
			nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
			cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14)])],
			data_nascimento: ['', Validators.compose([Validators.required])],
			genero: ['', Validators.compose([Validators.required])],
			celular: ['', Validators.compose([Validators.maxLength(16)])],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			senha_confirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});

	}

	ngOnInit() {
	}

	public register() {
		if (this.formRegister.valid) {
			console.log('Formulário válido');
			this.route.navigateByUrl('/home');
		} else {
			console.log('Formulário inválido');
		}
	}

}
