export interface IProfissional {
  nome: string;
  certified: boolean;
  professionalId: string; // CRM / CRP / CREFITO
}

export interface ICentro {
  nome: string;
  cnpj: string;

  fisioterapeuta: IProfissional;
  psicologo: IProfissional;
  medico: IProfissional;
}
