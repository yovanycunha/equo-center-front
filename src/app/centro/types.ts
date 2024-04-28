export interface IProfissional {
  nome: string;
  certified: boolean;
  professionalId: string; // CRM / CRP / CREFITO
}

export interface ICentro {
  nome: string;
  cnpj: string;

  fisio: IProfissional;
}
