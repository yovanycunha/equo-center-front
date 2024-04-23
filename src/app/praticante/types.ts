export interface IPraticante {
  nome: string;
  dataAdmissao: string;
  CID: string;
  dataNascimento: string;
  idade: string;
  genero: "Masculino" | "Feminino" | "Outro";
  documento: string;

  nomeResponsavel: string;
  telefoneResponsavel: string;
  documentoResponsavel: string;
  emailResponsavel: string;

  endereco: string;
  cidade: string;
  bairro: string;
}
