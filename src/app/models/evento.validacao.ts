// src/app/models/evento.validacao.ts

export function validarTitulo(titulo: string): string | null {
  if (!titulo || titulo.trim() === '') {
    return "O título não pode ficar em branco.";
  }
  if (titulo.length < 5 || titulo.length > 80) {
    return "O título deve ter entre 5 e 80 caracteres.";
  }
  return null;
}

export function validarData(data: string): string | null {
  if (!data) {
    return "A data não pode ficar em branco.";
  }
  
  
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const dataHojeStr = `${ano}-${mes}-${dia}`;

  if (data < dataHojeStr) {
    return "A data não pode estar no passado.";
  }
  
  return null;
}

export function validarLocal(local: string): string | null {
  if (!local || local.trim() === '') {
    return "O local não pode ficar em branco.";
  }
  return null;
}

export function validarEmail(email: string): string | null {
  if (!email || email.trim() === '') {
    return "O e-mail não pode ficar em branco.";
  }
  // Regex simples para verificar formato de e-mail (texto@texto.texto)
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "E-mail em formato inválido.";
  }
  return null;
}

export function validarVagas(vagas: number | null, local?: string): string | null {
  if (vagas === null) {
    return "O número de vagas não pode ficar em branco.";
  }
  if (!Number.isInteger(vagas) || vagas < 1 || vagas > 200) {
    return "As vagas devem ser um número inteiro de 1 a 200.";
  }

  if ((local === 'Laboratório 1' || local === 'Laboratório 2') && vagas > 30) {
    return "Laboratórios permitem no máximo 30 vagas.";
  }

  return null;
}