export enum EGender {
  male = "male",
  female = "female",
}

type TAddress = {
  city: string;
  street: string;
  neiborhood: string;
};

type TSponsor = {
  name: string;
  document: string;
  phone: string;
  email?: string | undefined;
};

export interface IPraticante {
  name: string;
  admissiondate: string;
  CID: string;
  birthdate: string;
  age: string | number;
  gender: keyof typeof EGender;
  document: string;

  sponsor: TSponsor;

  address: TAddress;
}
