enum EGender {
  Male = "male",
  Female = "female",
}

type TAddress = {
  city: string;
  street: string;
  neiboardhood: string;
};

type TSponsor = {
  name: string;
  document: string;
  phone: string;
  email: string | null;
};

export interface IPraticante {
  name: string;
  birthdate: string;
  age: string;
  document: string;
  admissiondate: string;
  CID: string;
  gender: keyof typeof EGender;

  sponsor: TSponsor;

  address: TAddress;
}
