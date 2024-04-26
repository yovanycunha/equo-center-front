export enum EGenero {
  Masculino = "Masculino",
  Feminino = "Feminino",
  Outro = "Outro",
}

export interface IPraticante {
  nome: string;
  dataAdmissao: string;
  CID: string;
  dataNascimento: string;
  idade: string;
  genero: keyof typeof EGenero;
  documento: string;

  nomeResponsavel: string;
  telefoneResponsavel: string;
  documentoResponsavel: string;
  emailResponsavel: string;

  endereco: string;
  cidade: string;
  bairro: string;
}
