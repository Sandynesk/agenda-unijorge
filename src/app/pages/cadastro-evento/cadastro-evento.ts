import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../models/evento';
import {
  validarData,
  validarEmail,
  validarLocal,
  validarTitulo,
  validarVagas,
} from '../../models/evento.validacao';

type CampoEvento = 'titulo' | 'data' | 'local' | 'emailResponsavel' | 'vagas';

@Component({
  selector: 'app-cadastro-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrls: ['./cadastro-evento.css'],
})
export class CadastroEvento {
  eventos: Evento[] = [];
  proximoId = 1;

  evento: Evento = {
    id: 0,
    titulo: '',
    data: '',
    local: '',
    emailResponsavel: '',
    vagas: null,
  };

  erros: Record<CampoEvento, string | null> = {
    titulo: null,
    data: null,
    local: null,
    emailResponsavel: null,
    vagas: null,
  };

  camposTocados: Partial<Record<CampoEvento, boolean>> = {};

  validarCampo(campo: CampoEvento): void {
    switch (campo) {
      case 'titulo':
        this.erros.titulo = validarTitulo(this.evento.titulo);
        break;
      case 'data':
        this.erros.data = validarData(this.evento.data);
        break;
      case 'local':
        this.erros.local = validarLocal(this.evento.local);
        break;
      case 'emailResponsavel':
        this.erros.emailResponsavel = validarEmail(this.evento.emailResponsavel);
        break;
      case 'vagas':
        this.erros.vagas = validarVagas(this.evento.vagas);
        break;
    }
  }

  marcarComoTocado(campo: CampoEvento): void {
    this.camposTocados[campo] = true;
    this.validarCampo(campo);
  }

  atualizarCampoSeTocado(campo: CampoEvento): void {
    if (this.camposTocados[campo]) {
      this.validarCampo(campo);
    }
  }

  mostrarErro(campo: CampoEvento): boolean {
    return !!this.camposTocados[campo] && !!this.erros[campo];
  }

  temErro(): boolean {
    return Object.values(this.erros).some((erro) => !!erro);
  }

  validarFormulario(): boolean {
    this.validarCampo('titulo');
    this.validarCampo('data');
    this.validarCampo('local');
    this.validarCampo('emailResponsavel');
    this.validarCampo('vagas');

    this.camposTocados = {
      titulo: true,
      data: true,
      local: true,
      emailResponsavel: true,
      vagas: true,
    };

    return Object.values(this.erros).every((erro) => !erro);
  }

  limparFormulario(): void {
    this.evento = {
      id: 0,
      titulo: '',
      data: '',
      local: '',
      emailResponsavel: '',
      vagas: null,
    };

    this.erros = {
      titulo: null,
      data: null,
      local: null,
      emailResponsavel: null,
      vagas: null,
    };

    this.camposTocados = {};
  }

  onSubmit(): void {
    const formularioValido = this.validarFormulario();

    if (!formularioValido) {
      return;
    }

    const eventoParaSalvar: Evento = {
      ...this.evento,
      id: this.proximoId,
    };

    this.eventos.push(eventoParaSalvar);
    this.proximoId += 1;
    this.limparFormulario();
  }
}
