"use client";

import { useState } from "react";
import scss from "./page.module.scss";
import { useForm } from "react-hook-form";
import { IProfissional } from "./types";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { ProfessionalsService } from "@/services/professionals/professionals";

export default function Profissional() {
  const [btnLoading, setBtnLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IProfissional>({
    mode: "onBlur",
    defaultValues: { isCertified: false },
  });

  const nomeRef = register("name", {
    required: true,
    minLength: 3,
  });

  const documentoRef = register("document", {
    required: true,
    minLength: 6,
  });

  const especialidadeRef = register("speciality", {
    required: true,
    minLength: 3,
  });

  const certifiedRef = register("isCertified", {
    required: false,
  });

  const onSubmit = async (data: IProfissional) => {
    setBtnLoading(true);
    try {
      await ProfessionalsService.createProfessional(data);

      reset();
    } catch (error) {
      console.log(error);
    }
    setBtnLoading(false);
  };

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
                name={documentoRef.name}
                placeholder="Documento"
                inputref={documentoRef.ref}
                value={watch("document")}
                onChange={documentoRef.onChange}
                onBlur={documentoRef.onBlur}
                errors={errors.document && true}
                errorMessage={errors.document?.message}
                className={scss.nameInput}
              />

              <Input
                name={especialidadeRef.name}
                placeholder="Especialidade"
                inputref={especialidadeRef.ref}
                value={watch("speciality")}
                onChange={especialidadeRef.onChange}
                onBlur={especialidadeRef.onBlur}
                errors={errors.speciality && true}
                errorMessage={errors.speciality?.message}
                className={scss.nameInput}
              />
            </div>
            <label htmlFor="isCertified" className={scss.checkboxContainer}>
              <input
                id="isCertified"
                onChange={certifiedRef.onChange}
                ref={certifiedRef.ref}
                type="checkbox"
                name={certifiedRef.name}
                className={scss.checkbox}
                checked={watch("isCertified")}
              />
              <span className={scss.checkboxText}>
                Possui Curso Básico de Equoterapia
              </span>
            </label>
          </div>

          <div>
            <Button type="submit" loading={btnLoading}>
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
