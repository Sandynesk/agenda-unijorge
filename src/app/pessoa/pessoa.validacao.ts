import { Pessoa } from './pessoa.model';

export const CURSOS_VALIDOS = [
  'Engenharia de Computação',
  'Sistemas de Informação',
  'Ciência da Computação'
];

export function validarNome(nome: string): string | null {
  const limpo = nome.trim();

  if (limpo.length < 3) {
    return 'O nome deve ter ao menos 3 caracteres.';
  }
  if (/\d/.test(limpo)) {
    return 'O nome não pode conter números.';
  }
  return null;
}

export function validarEmail(email: string): string | null {
  const limpo = email.trim();

  if (!limpo) {
    return 'O e-mail é obrigatório.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  if (!emailRegex.test(limpo)) {
    return 'O e-mail deve estar no formato válido (ex: alguem@dominio.algo).';
  }

  return null;
}

export function validarTelefone(telefone?: string): string | null {
  if (telefone === undefined || telefone === null || telefone.trim() === '') {
    return null;
  }

  const digitos = telefone.replace(/\D/g, '');
  if (digitos.length !== 10 && digitos.length !== 11) {
    return 'O telefone deve conter 10 ou 11 dígitos (com DDD).';
  }

  return null;
}

export function validarCurso(curso: string): string | null {
  if (!curso || !CURSOS_VALIDOS.includes(curso.trim())) {
    return `O curso deve ser um dos seguintes: ${CURSOS_VALIDOS.join(', ')}.`;
  }

  return null;
}

export function validarPessoa(pessoa: Pessoa): string[] {
  const erros: (string | null)[] = [
    validarNome(pessoa.nome ?? ''),
    validarEmail(pessoa.email ?? ''),
    validarTelefone(pessoa.telefone),
    validarCurso(pessoa.curso ?? '')
  ];

  return erros.filter((erro): erro is string => erro !== null);
}

export function validarIdsUnicos(pessoas: Pessoa[]): string[] {
  const idsVistos = new Set<number>();
  const idsDuplicados = new Set<number>();

  for (const p of pessoas) {
    if (idsVistos.has(p.id)) {
      idsDuplicados.add(p.id);
    } else {
      idsVistos.add(p.id);
    }
  }

  if (idsDuplicados.size > 0) {
    return [`Aviso: Existem IDs duplicados na lista (ID: ${Array.from(idsDuplicados).join(', ')}).`];
  }

  return [];
}
