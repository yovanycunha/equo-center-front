"use client";

import { useForm } from "react-hook-form";
import scss from "./page.module.scss";
import Input from "@/components/Input/Input";
import { ICentro } from "./types";
import { useState } from "react";

import Header from "@/components/Header/Header";

export default function CadastroEquipe() {
  const [isBasicTeam, setIsBasicTeam] = useState<Boolean>(true);

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
      fisioterapeuta: { certified: false },
      psicologo: { certified: false },
      medico: { certified: false },
      equitador: { certified: false, professionalId: "" },
    },
  });

  const onFisioCertifiedChange = () => {
    setValue("fisioterapeuta.certified", !watch("fisioterapeuta.certified"));
  };

  const onPsicoCertifiedChange = () => {
    setValue("psicologo.certified", !watch("psicologo.certified"));
  };

  const onMedicoCertifiedChange = () => {
    setValue("medico.certified", !watch("medico.certified"));
  };

  const onEquitadorCertifiedChange = () => {
    setValue("equitador.certified", !watch("equitador.certified"));
  };

  const basicTeam = {
    fisioterapeuta: {
      nameRef: register("fisioterapeuta.nome", {
        required: true,
        minLength: { value: 3, message: "Nome inválido" },
      }),
      professionalIdRef: register("fisioterapeuta.professionalId", {
        required: true,
      }),
      certifiedRef: register("fisioterapeuta.certified", {
        required: true,
      }),
      errors: errors.fisioterapeuta,
      onCertifiedChange: () => onFisioCertifiedChange(),
      placeholderName: "Nome do Fisioterapeuta",
      placeholderProfessionalId: "CREFITO",
    },

    psicologo: {
      nameRef: register("psicologo.nome", {
        required: true,
        minLength: { value: 3, message: "Nome inválido" },
      }),
      professionalIdRef: register("psicologo.professionalId", {
        required: true,
      }),
      certifiedRef: register("psicologo.certified", {
        required: true,
      }),
      errors: errors.psicologo,
      onCertifiedChange: () => onPsicoCertifiedChange(),
      placeholderName: "Nome do Psicólogo",
      placeholderProfessionalId: "CRP",
    },

    medico: {
      nameRef: register("medico.nome", {
        required: true,
        minLength: { value: 3, message: "Nome inválido" },
      }),
      professionalIdRef: register("medico.professionalId", {
        required: true,
      }),
      certifiedRef: register("medico.certified", {
        required: true,
      }),
      errors: errors.medico,
      onCertifiedChange: () => onMedicoCertifiedChange(),
      placeholderName: "Nome do Médico",
      placeholderProfessionalId: "CRM",
    },
    equitador: {
      nameRef: register("equitador.nome", {
        required: true,
        minLength: { value: 3, message: "Nome inválido" },
      }),
      certifiedRef: register("equitador.certified", {
        required: true,
      }),
      errors: errors.equitador,
      onCertifiedChange: () => onEquitadorCertifiedChange(),
      placeholderName: "Nome do Equitador",
    },
  };

  const renderInput = (professional: any, type: string) => {
    return (
      <>
        <h3 className={scss.professionalTitle}>{type}</h3>
        <Input
          name={professional.nameRef.name}
          placeholder={professional.placeholderName}
          inputref={professional.nameRef.ref}
          value={watch(professional.nameRef.name)}
          onChange={professional.nameRef.onChange}
          onBlur={professional.nameRef.onBlur}
          errors={professional.errors?.nome && true}
          errorMessage={professional.errors?.nome.message}
        />

        <div className={scss.inlineGroup}>
          {type !== "Equitador" && (
            <Input
              name={professional.professionalIdRef.name}
              placeholder={professional.placeholderProfessionalId}
              inputref={professional.professionalIdRef.ref}
              value={watch(professional.professionalIdRef.name)}
              onChange={professional.professionalIdRef.onChange}
              onBlur={professional.professionalIdRef.onBlur}
              errors={professional.errors?.professionalId && true}
              errorMessage={professional.errors?.professionalId?.message}
              className={scss.nameInput}
            />
          )}
          <label
            htmlFor={`${professional.certifiedRef.name}`}
            className={scss.checkboxContainer}
          >
            <input
              onClick={() => professional.onCertifiedChange()}
              type="checkbox"
              id={`${professional.certifiedRef.name}`}
              name={professional.certifiedRef.name}
              className={scss.checkbox}
            />
            <span>Possui Curso Básico de Equoterapia</span>
          </label>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <Header /> */}
      <main className={scss.main}>
        <div className={scss.container}>
          <h1 className={scss.title}>Cadastro da Equipe</h1>

          <form>
            <h2 className={scss.subtitle}>Equipe Básica</h2>

            <div className={scss.inputGroups}>
              {renderInput(basicTeam.fisioterapeuta, "Fisioterapeuta")}
            </div>

            <div className={scss.divider} />

            <div className={scss.inputGroups}>
              {renderInput(basicTeam.psicologo, "Psicólogo")}
            </div>

            <div className={scss.divider} />

            <div className={scss.inputGroups}>
              {renderInput(basicTeam.medico, "Médico")}
            </div>

            <div className={scss.divider} />

            <div className={scss.inputGroups}>
              {renderInput(basicTeam.equitador, "Equitador")}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
