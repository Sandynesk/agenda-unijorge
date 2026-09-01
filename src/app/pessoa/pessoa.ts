import { Component } from '@angular/core';
import { Pessoa as IPessoa } from './pessoa.model';
import { validarPessoa, validarIdsUnicos } from './pessoa.validacao';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.css'
})
export class Pessoa {
  pessoas: IPessoa[] = [
    {
      id: 1,
      nome: 'Ana Souza',
      curso: 'Engenharia de Computação',
      email: 'ana.souza@unijorge.edu.br',
      telefone: '71988887777',
      vinculo: 'aluno',
      ativo: true
    },
    {
      id: 2,
      nome: 'Bruno Lima',
      curso: 'Ciência da Computação',
      email: 'bruno.lima@unijorge.edu.br',
      telefone: '71999998888',
      vinculo: 'aluno',
      ativo: true
    },
    {
      id: 3,
      nome: 'Carla Dias',
      curso: 'Sistemas de Informação',
      email: 'carla.dias@unijorge.edu.br',
      telefone: '7133334444',
      vinculo: 'professor',
      ativo: true
    },
    {
      id: 4,
      nome: 'Diego Castro',
      curso: 'Engenharia de Computação',
      email: 'diego.castro@unijorge.edu.br',
      vinculo: 'aluno',
      ativo: false
    },
    {
      id: 1, // ID propositalmente repetido para o desafio de IDs únicos
      nome: 'Eva 123', // Nome propositalmente inválido (contém números)
      curso: 'Medicina', // Curso fora da lista aceita
      email: 'eva#exemplo', // E-mail sem @
      telefone: '123', // Telefone curto
      vinculo: 'aluno',
      ativo: true
    }
  ];

  avisosLista = validarIdsUnicos(this.pessoas);

  resultados = this.pessoas.map(pessoa => ({
    pessoa,
    erros: validarPessoa(pessoa)
  }));
}
