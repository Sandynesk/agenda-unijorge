import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type CampoEmpresa = 'nome' | 'cnpj' | 'logomarca' | 'fundacao' | 'descricao';

type EmpresaForm = {
  nome: string;
  cnpj: string;
  logomarca: string;
  fundacao: string;
  descricao: string;
};

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.css'],
})
export class Empresa {
  empresasEnviadas: EmpresaForm[] = [];

  empresa: EmpresaForm = {
    nome: '',
    cnpj: '',
    logomarca: '',
    fundacao: '',
    descricao: '',
  };

  erros: Record<CampoEmpresa, string | null> = {
    nome: null,
    cnpj: null,
    logomarca: null,
    fundacao: null,
    descricao: null,
  };

  camposTocados: Partial<Record<CampoEmpresa, boolean>> = {};

  validarCampo(campo: CampoEmpresa): void {
    const valor = (this.empresa[campo] ?? '').trim();

    switch (campo) {
      case 'nome':
        this.erros.nome = valor ? null : 'O nome da empresa é obrigatório.';
        break;
      case 'cnpj':
        if (!valor) {
          this.erros.cnpj = 'O CNPJ é obrigatório.';
          return;
        }

        const apenasNumeros = valor.replace(/\D/g, '');
        this.erros.cnpj = apenasNumeros.length === 14 ? null : 'Informe um CNPJ válido.';
        break;
      case 'logomarca':
        this.erros.logomarca = valor ? null : 'A logomarca é obrigatória.';
        break;
      case 'fundacao':
        this.erros.fundacao = valor ? null : 'A data de fundação é obrigatória.';
        break;
      case 'descricao':
        this.erros.descricao = valor ? null : 'A descrição é obrigatória.';
        break;
    }
  }

  marcarComoTocado(campo: CampoEmpresa): void {
    this.camposTocados[campo] = true;
    this.validarCampo(campo);
  }

  atualizarCampoSeTocado(campo: CampoEmpresa): void {
    if (this.camposTocados[campo]) {
      this.validarCampo(campo);
    }
  }

  mostrarErro(campo: CampoEmpresa): boolean {
    return !!this.camposTocados[campo] && !!this.erros[campo];
  }

  temErro(): boolean {
    return Object.values(this.erros).some((erro) => !!erro);
  }

  validarFormulario(): boolean {
    this.validarCampo('nome');
    this.validarCampo('cnpj');
    this.validarCampo('logomarca');
    this.validarCampo('fundacao');
    this.validarCampo('descricao');

    this.camposTocados = {
      nome: true,
      cnpj: true,
      logomarca: true,
      fundacao: true,
      descricao: true,
    };

    return Object.values(this.erros).every((erro) => !erro);
  }

  limparFormulario(): void {
    this.empresa = {
      nome: '',
      cnpj: '',
      logomarca: '',
      fundacao: '',
      descricao: '',
    };

    this.erros = {
      nome: null,
      cnpj: null,
      logomarca: null,
      fundacao: null,
      descricao: null,
    };

    this.camposTocados = {};
  }

  onSubmit(): void {
    const formularioValido = this.validarFormulario();

    if (!formularioValido) {
      return;
    }

    this.empresasEnviadas.push({ ...this.empresa });
    console.log('Empresa enviada:', this.empresa);
    this.limparFormulario();
  }
}
