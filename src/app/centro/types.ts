export interface IProfissional {
  nome: string;
  certified: boolean;
  professionalId: string | null; // CRM / CRP / CREFITO
}

export interface ICentro {
  nome: string;
  cnpj: string;
  profissionais: IProfissional[];
}
