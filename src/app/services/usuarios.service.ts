import { Injectable } from '@angular/core';
import { ArmazenamentoService } from './armazenamento.service';
import { Usuario } from '../models/Usuario';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	public listaUsuarios = [];
	public usuarioLocal: any;
    usuarioLogado:any;
	
	constructor(private armazenamentoService: ArmazenamentoService) { }

	public async buscarTodos() {
		this.listaUsuarios = await this.armazenamentoService.listarDados('usuarios');

		if (!this.listaUsuarios) {
			this.listaUsuarios = [];
		}
	}

	public async salvar(usuario: Usuario) {
		await this.buscarTodos();

		if (!usuario) {
			return false;
		}

		if (!this.listaUsuarios) {
			this.listaUsuarios = [];
		}

		this.listaUsuarios.push(usuario);

		return await this.armazenamentoService.salvarDados('usuarios', this.listaUsuarios);
	}

	public async login(email: string, senha: string) {
		let usuario: Usuario;

		await this.buscarTodos();
           
		const listaTemporaria = this.listaUsuarios.filter(usuarioArmazenado => {
			return (usuarioArmazenado.email == email && usuarioArmazenado.senha == senha);
		});

		if (listaTemporaria.length > 0) {
			usuario = listaTemporaria.reduce(item => item);
		}


		return usuario;
		
	}

	public salvarUsuarioLogado(usuario: Usuario) {
		delete usuario.senha;
		this.armazenamentoService.salvarDados('usuarioLogado', usuario);
	}

	public async buscarUsuarioLogado() {
		return await this.armazenamentoService.listarDados('usuarioLogado');
	}

	public async removerUsuarioLogado() {
		this.armazenamentoService.removerDados('usuarioLogado');
	}
	
}
