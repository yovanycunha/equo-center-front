"use client";

import { useForm } from "react-hook-form";
import scss from "./page.module.scss";
import Input from "@/components/Input/Input";
import { ICentro } from "./types";

export default function CadastroEquipe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm<ICentro>({
    mode: "onBlur",
    defaultValues: {
      nome: "",
      cnpj: "",
      fisio: {},
    },
  });

  const fisioNameRef = register("fisio.nome", {
    required: true,
    minLength: { value: 3, message: "Nome inválido" },
  });
  const fisioCertifiedRef = register("fisio.certified", {
    required: true,
  });
  const fisioProfessionalIdRef = register("fisio.professionalId", {
    required: true,
  });

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Cadastro da Equipe</h1>

        <form>
          <h2 className={scss.subtitle}>Equipe Básica</h2>

          <Input
            name={fisioNameRef.name}
            placeholder="Nome Fisio"
            inputref={fisioNameRef.ref}
            value={watch("fisio.nome")}
            onChange={fisioNameRef.onChange}
            onBlur={fisioNameRef.onBlur}
            errors={errors.fisio?.nome && true}
            errorMessage={errors.fisio?.nome?.message}
          />

          <Input
            name={fisioProfessionalIdRef.name}
            placeholder="CREFITO"
            inputref={fisioProfessionalIdRef.ref}
            value={watch("fisio.professionalId")}
            onChange={fisioProfessionalIdRef.onChange}
            onBlur={fisioProfessionalIdRef.onBlur}
            errors={errors.fisio?.professionalId && true}
            errorMessage={errors.fisio?.professionalId?.message}
          />
        </form>
      </div>
    </main>
  );
}
