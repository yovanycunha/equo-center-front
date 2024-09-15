"use client";

import { useDispatch } from "react-redux";
import scss from "../page.module.scss";
import { useForm } from "react-hook-form";
import { EGender, IPraticante } from "../types";
import moment from "moment";
import Option from "@/components/Option/Option";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import { PractitionersService } from "@/services/practitioners/practitioners";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const getPractitioner = async (document: string) => {
  const data = await PractitionersService.getPractitionerByDocument(document);
  return data;
};

export default function EditPractitioner({
  params,
}: {
  params: { document: string };
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["practitioner"],
    queryFn: () => getPractitioner(params.document),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<IPraticante>({
    mode: "onBlur",
    defaultValues: {
      gender: EGender.male,
      document: params.document,
      name: data?.name,
    },
  });

  const defaultValues = () => {
    if (!isLoading) {
      setValue("name", data?.name);
      setValue("CID", data?.cid);
      setValue("age", data?.age);
      setValue("gender", data?.gender);
      setValue("sponsor.name", data?.sponsor.name);
      setValue("sponsor.phone", data?.sponsor.phone);
      setValue("sponsor.document", data?.sponsor.document);
      setValue("sponsor.email", data?.sponsor.email);
      setValue("address.street", data?.address.street);
      setValue("address.city", data?.address.city);
      setValue("address.neiborhood", data?.address.neiborhood);
      setValue(
        "admissiondate",
        moment(data?.admissiondate).format("DD/MM/YYYY")
      );
      setValue("birthdate", moment(data?.birthdate).format("DD/MM/YYYY"));
    }
  };

  const nomeRef = register("name", {
    required: true,
    minLength: 3,
  });

  const CIDRef = register("CID", {
    required: false,
    minLength: 3,
  });

  const birthdateRef = register("birthdate", {
    required: true,
    minLength: 8,
    pattern: {
      value:
        /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/,
      message: "Data inválida",
    },
  });

  const ageRef = register("age", {
    required: false,
    maxLength: 2,
  });

  const admissiondateRef = register("admissiondate", {
    required: false,
  });

  const genderRef = register("gender", {
    required: false,
  });

  const documentRef = register("document", {
    required: true,
    minLength: 7,
  });

  const sponsorNameRef = register("sponsor.name", {
    required: true,
    minLength: 3,
  });

  const sponsorPhoneRef = register("sponsor.phone", {
    required: true,
  });

  const sponsorDocumentRef = register("sponsor.document", {
    required: true,
    minLength: 7,
  });

  const sponsorEmailRef = register("sponsor.email", {
    required: false,
  });

  const streetRef = register("address.street", {
    required: false,
  });

  const cityRef = register("address.city", {
    required: false,
  });

  const neiborhoodRef = register("address.neiborhood", {
    required: false,
  });

  const handleBirthdateBlur = (e: any) => {
    birthdateRef.onBlur(e);

    const formattedDate = moment(
      watch("birthdate"),
      "DD/MM/YYYY",
      "pt-br",
      true
    );
    if (!formattedDate.isValid()) {
      setError("birthdate", {
        type: "valueAsDate",
        message: "Data inválida",
      });
    }
  };

  const handleAdmissiondateBlur = (e: any) => {
    admissiondateRef.onBlur(e);

    const formattedDate = moment(
      watch("admissiondate"),
      "DD/MM/YYYY",
      "pt-br",
      true
    );
    if (!formattedDate.isValid()) {
      setError("admissiondate", {
        type: "valueAsDate",
        message: "Data inválida",
      });
    }
  };

  const convertDate = (date: string) => {
    const removeBackslash = date.replace(/\//g, "-");
    return moment(removeBackslash, "DD-MM-YYYY:").toISOString();
  };

  const onSubmit = async (data: IPraticante) => {
    const { name, gender, CID, sponsor, address } = data;
    const convertedBirthdate = convertDate(data.birthdate);
    const convertedAdmissiondate = convertDate(data.admissiondate);
    const convertedAge: number = +data.age;
    const olddocument = decodeURI(params.document);

    const dataToSubmit = {
      birthdate: convertedBirthdate,
      admissiondate: convertedAdmissiondate,
      age: convertedAge,
      olddocument: olddocument,
      newdocument: data.document,
      name,
      gender,
      CID,
      sponsor,
      address,
    };

    try {
      setBtnLoading(true);
      await PractitionersService.updatePractitioner(dataToSubmit);

      router.push("/praticantes");

      setBtnLoading(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleRemovePractitioner = async () => {
    try {
      setBtnLoading(true);
      await PractitionersService.deletePractitioner(params.document);

      router.push("/praticantes");
      setBtnLoading(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  const birthdateValue = watch("birthdate");
  const admissiondateValue = watch("admissiondate");

  const sponsorPhone = watch("sponsor.phone");

  const normalizeCepNumber = (value: String | undefined) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
      .replace(/(-\d{3})(\d+?)/, "$1");
  };

  const normalizeCnpjNumber = (value: String | undefined) => {
    if (!value) return "";

    return value
      .replace(/[\D]/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const normalizePhoneNumber = (value: String | undefined) => {
    if (!value) return "";

    return value
      .replace(/[\D]/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)/, "$1");
  };

  const normalizeDate = (value: String | undefined) => {
    if (!value) return "";

    return value
      .replace(/[\D]/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  const renderOptions = () =>
    (Object.keys(EGender) as Array<keyof typeof EGender>)
      .map((gender, index) => (
        <Option
          key={`${gender + index}`}
          value={gender}
          selected={watch("gender") === gender}
        >
          {gender === "female" ? "Feminino" : "Masculino"}
        </Option>
      ))
      .reverse();

  useEffect(() => {
    setValue("admissiondate", normalizeDate(admissiondateValue));
    setValue("birthdate", normalizeDate(birthdateValue));
  }, [admissiondateValue, birthdateValue, setValue]);

  useEffect(() => {
    setValue("sponsor.phone", normalizePhoneNumber(sponsorPhone));
  }, [sponsorPhone, setValue]);

  useEffect(() => {
    defaultValues();
  }, [data]);

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Editar Praticante</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={scss.subtitle}>Informações do Praticante</h2>
          <div className={scss.inputGroups}>
            <Input
              name={nomeRef.name}
              placeholder="Nome"
              inputref={nomeRef.ref}
              value={watch("name")}
              onChange={nomeRef.onChange}
              onBlur={nomeRef.onBlur}
              errors={errors.name && true}
              errorMessage={errors.name?.message}
            />
            <div className={scss.inlineGroup}>
              <Input
                name={birthdateRef.name}
                placeholder="Data de Nascimento"
                inputref={birthdateRef.ref}
                value={watch("birthdate")}
                onChange={birthdateRef.onChange}
                onBlur={handleBirthdateBlur}
                errors={errors.birthdate && true}
                errorMessage={errors.birthdate?.message}
                className={scss.nameInput}
              />

              <Input
                name={ageRef.name}
                placeholder="Idade"
                inputref={ageRef.ref}
                value={watch("age")}
                onChange={ageRef.onChange}
                onBlur={ageRef.onBlur}
                errors={errors.age && true}
                errorMessage={errors.CID?.message}
                className={scss.nameInput}
              />
            </div>

            <div className={scss.inlineGroup}>
              <Input
                name={documentRef.name}
                placeholder="Documento"
                inputref={documentRef.ref}
                value={watch("document")}
                onChange={documentRef.onChange}
                onBlur={documentRef.onBlur}
                errors={errors.document && true}
                errorMessage={errors.document?.message}
                className={scss.nameInput}
              />

              <Select
                className={scss.nameInput}
                arrow
                value={watch("gender")}
                errors={!!errors.gender}
                label="Gênero"
                onChange={(value: keyof typeof EGender) =>
                  setValue("gender", value)
                }
                errorMessage="Gênero é um campo obrigatório."
                onBlur={() => {
                  if (!watch("gender")) {
                    setError("gender", {
                      type: "manual",
                      message: "Gênero é um campo obrigatório",
                    });
                  }
                }}
                onFocus={() => {
                  clearErrors("gender");
                }}
              >
                {renderOptions()}
              </Select>
            </div>

            <div className={scss.inlineGroup}>
              <Input
                name={admissiondateRef.name}
                placeholder="Data de admissão"
                inputref={admissiondateRef.ref}
                value={watch("admissiondate")}
                onChange={admissiondateRef.onChange}
                onBlur={handleAdmissiondateBlur}
                errors={errors.admissiondate && true}
                errorMessage={errors.admissiondate?.message}
                className={scss.nameInput}
              />

              <Input
                name={CIDRef.name}
                placeholder="CID"
                inputref={CIDRef.ref}
                value={watch("CID")}
                onChange={CIDRef.onChange}
                onBlur={CIDRef.onBlur}
                errors={errors.CID && true}
                errorMessage={errors.CID?.message}
                className={scss.nameInput}
              />
            </div>

            <h2 className={scss.subtitle}>Informações do Responsável</h2>
            <Input
              name={sponsorNameRef.name}
              placeholder="Nome do Responsável"
              inputref={sponsorNameRef.ref}
              value={watch("sponsor.name")}
              onChange={sponsorNameRef.onChange}
              onBlur={sponsorNameRef.onBlur}
              errors={errors.sponsor?.name && true}
              errorMessage={errors.sponsor?.name?.message}
            />

            <div className={scss.inlineGroup}>
              <Input
                name={sponsorDocumentRef.name}
                placeholder="Documento do Responsável"
                inputref={sponsorDocumentRef.ref}
                value={watch("sponsor.document")}
                onChange={sponsorDocumentRef.onChange}
                onBlur={sponsorDocumentRef.onBlur}
                errors={errors.sponsor?.document && true}
                errorMessage={errors.sponsor?.document?.message}
                className={scss.nameInput}
              />

              <Input
                name={sponsorPhoneRef.name}
                placeholder="Telefone"
                inputref={sponsorPhoneRef.ref}
                value={watch("sponsor.phone")}
                onChange={sponsorPhoneRef.onChange}
                onBlur={sponsorPhoneRef.onBlur}
                errors={errors.sponsor?.phone && true}
                errorMessage={errors.sponsor?.phone?.message}
                className={scss.nameInput}
              />
            </div>

            <Input
              name={sponsorEmailRef.name}
              placeholder="E-mail"
              inputref={sponsorEmailRef.ref}
              value={watch("sponsor.email")}
              onChange={sponsorEmailRef.onChange}
              onBlur={sponsorEmailRef.onBlur}
              errors={errors.sponsor?.email && true}
              errorMessage={errors.sponsor?.email?.message}
            />

            <h2 className={scss.subtitle}>Endereço</h2>
            <Input
              name={cityRef.name}
              placeholder="Cidade"
              inputref={cityRef.ref}
              value={watch("address.city")}
              onChange={cityRef.onChange}
              onBlur={cityRef.onBlur}
              errors={errors.address?.city && true}
              errorMessage={errors.address?.city?.message}
            />

            <Input
              name={streetRef.name}
              placeholder="Endereço"
              inputref={streetRef.ref}
              value={watch("address.street")}
              onChange={streetRef.onChange}
              onBlur={streetRef.onBlur}
              errors={errors.address?.street && true}
              errorMessage={errors.address?.street?.message}
            />

            <Input
              name={neiborhoodRef.name}
              placeholder="Bairro"
              inputref={neiborhoodRef.ref}
              value={watch("address.neiborhood")}
              onChange={neiborhoodRef.onChange}
              onBlur={neiborhoodRef.onBlur}
              errors={errors.address?.neiborhood && true}
              errorMessage={errors.address?.neiborhood?.message}
            />
          </div>

          <div className={scss.btnsContainer}>
            <Button type="submit" loading={btnLoading}>
              Editar
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleRemovePractitioner();
              }}
              className={scss.btnRemove}
              loading={btnLoading}
            >
              Remover
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
