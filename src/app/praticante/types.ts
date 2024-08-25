export enum EGender {
  Masculino = "Masculino",
  Feminino = "Feminino",
}

type TAddress = {
  city: string;
  street: string;
  neiboardhood: string;
}

type TSponsor = {
  name: string;
  document: string;
  phone: string;
  email?: string | undefined;
}

export interface IPraticante {
  name: string;
  admissiondate: string;
  CID: string;
  birthdate: string;
  age: string;
  gender: keyof typeof EGender;
  document: string;

  sponsor: TSponsor;

  address: TAddress;
}
