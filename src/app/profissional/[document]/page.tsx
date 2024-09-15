"use client";

import { ProfessionalsService } from "@/services/professionals/professionals";
import { useQuery } from "@tanstack/react-query";
import { IProfissional } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import scss from "../page.module.scss";
import Input from "@/components/Input/Input";
import { useRouter } from "next/navigation";

const getProfessional = async (document: string) => {
  const data = await ProfessionalsService.getProfessional(document);
  return data;
};

export default function EditProfessional({
  params,
}: {
  params: { document: string };
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["professional"],
    queryFn: () => getProfessional(params.document),
  });

  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<IProfissional>({
    mode: "onBlur",
    defaultValues: { isCertified: false },
  });

  const defaultValues = () => {
    if (!isLoading) {
      setValue("name", data?.name);
      setValue("document", data?.document);
      setValue("specialty", data?.specialty);
      setValue("isCertified", data?.iscertified);
    }
  };

  const nomeRef = register("name", {
    required: true,
    minLength: 3,
  });

  const documentRef = register("document", {
    required: true,
    minLength: 6,
  });

  const specialtyRef = register("specialty", {
    required: true,
    minLength: 3,
  });

  const certifiedRef = register("isCertified", {
    required: false,
  });

  const onSubmit = async (data: IProfissional) => {
    const { name, document, specialty, isCertified } = data;
    const olddocument = decodeURI(params.document);

    const dataToUpdate = {
      name,
      olddocument: olddocument,
      newdocument: document,
      specialty,
      iscertified: isCertified,
    };

    try {
      setBtnLoading(true);
      await ProfessionalsService.updateProfessional(dataToUpdate);

      router.push("/profissionais");
    } catch (error) {
      console.log(error);
    }
    setBtnLoading(false);
  };

  const handleRemoveProfessional = async () => {
    try {
      setBtnLoading(true);

      await ProfessionalsService.removeProfessional(params.document);
      router.push("/profissionais");

      setBtnLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    defaultValues();
  }, [data]);

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Cadastro de Profissional</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={scss.subtitle}>Informações do Profissional</h2>
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

              <Input
                name={specialtyRef.name}
                placeholder="Especialidade"
                inputref={specialtyRef.ref}
                value={watch("specialty")}
                onChange={specialtyRef.onChange}
                onBlur={specialtyRef.onBlur}
                errors={errors.specialty && true}
                errorMessage={errors.specialty?.message}
                className={scss.nameInput}
              />
            </div>
            <label
              htmlFor={certifiedRef.name}
              className={scss.checkboxContainer}
            >
              <input
                id={certifiedRef.name}
                onChange={certifiedRef.onChange}
                ref={certifiedRef.ref}
                type="checkbox"
                name={certifiedRef.name}
                className={scss.checkbox}
                defaultChecked={watch("isCertified")}
              />
              <span className={scss.checkboxText}>
                Possui Curso Básico de Equoterapia
              </span>
            </label>
          </div>

          <div className={scss.btnsContainer}>
            <Button type="submit" loading={btnLoading}>
              Editar
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveProfessional();
              }}
              loading={btnLoading}
              className={scss.btnRemove}
            >
              Remover
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
