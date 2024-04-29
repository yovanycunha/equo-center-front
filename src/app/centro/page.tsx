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
      fisioterapeuta: { certified: false },
      psicologo: { certified: false },
      medico: { certified: false },
      equitador: { certified: false, professionalId: "" },
    },
  });

  const professionals = {
    fisio: {
      nameRef: register("fisioterapeuta.nome", {
        required: true,
        minLength: { value: 3, message: "Nome inválido" },
      }),
      certifiedRef: register("fisioterapeuta.certified", {
        required: true,
      }),
      professionalIdRef: register("fisioterapeuta.professionalId", {
        required: true,
      }),
    },
  };

  const psicologoNameRef = register("psicologo.nome", {
    required: true,
    minLength: { value: 3, message: "Nome inválido" },
  });

  const psicologoCertifiedRef = register("psicologo.certified", {
    required: true,
  });

  const psicologoProfessionalIdRef = register("psicologo.professionalId", {
    required: true,
  });

  const medicoNameRef = register("medico.nome", {
    required: true,
    minLength: { value: 3, message: "Nome inválido" },
  });

  const medicoCertifiedRef = register("medico.certified", {
    required: true,
  });

  const medicoProfessionalIdRef = register("medico.professionalId", {
    required: true,
  });

  const equitadorNameRef = register("equitador.nome", {
    required: true,
    minLength: { value: 3, message: "Nome inválido" },
  });

  const equitadorCertifiedRef = register("equitador.certified", {
    required: true,
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

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Cadastro da Equipe</h1>

        <form>
          <h2 className={scss.subtitle}>Equipe Básica</h2>

          <div className={scss.inputGroups}>
            <h3 className={scss.professionalTitle}>Fisioterapeuta</h3>
            <Input
              name={professionals.fisio.nameRef.name}
              placeholder="Nome do Fisioterapeuta"
              inputref={professionals.fisio.nameRef.ref}
              value={watch("fisioterapeuta.nome")}
              onChange={professionals.fisio.nameRef.onChange}
              onBlur={professionals.fisio.nameRef.onBlur}
              errors={errors.fisioterapeuta?.nome && true}
              errorMessage={errors.fisioterapeuta?.nome?.message}
            />

            <div className={scss.inlineGroup}>
              <Input
                name={professionals.fisio.professionalIdRef.name}
                placeholder="CREFITO"
                inputref={professionals.fisio.professionalIdRef.ref}
                value={watch("fisioterapeuta.professionalId")}
                onChange={professionals.fisio.professionalIdRef.onChange}
                onBlur={professionals.fisio.professionalIdRef.onBlur}
                errors={errors.fisioterapeuta?.professionalId && true}
                errorMessage={errors.fisioterapeuta?.professionalId?.message}
                className={scss.nameInput}
              />
              <label htmlFor="checkbox" className={scss.checkboxContainer}>
                <input
                  onClick={onFisioCertifiedChange}
                  type="checkbox"
                  id="checkbox"
                  name={professionals.fisio.certifiedRef.name}
                  className={scss.checkbox}
                />
                <span>Possui Curso Básico de Equoterapia</span>
              </label>
            </div>
          </div>

          <div className={scss.divider} />

          <div className={scss.inputGroups}>
            <h3 className={scss.professionalTitle}>Psicólogo</h3>
            <Input
              name={psicologoNameRef.name}
              placeholder="Nome do Psicólogo"
              inputref={psicologoNameRef.ref}
              value={watch("psicologo.nome")}
              onChange={psicologoNameRef.onChange}
              onBlur={psicologoNameRef.onBlur}
              errors={errors.psicologo?.nome && true}
              errorMessage={errors.psicologo?.nome?.message}
            />

            <div className={scss.inlineGroup}>
              <Input
                name={psicologoProfessionalIdRef.name}
                placeholder="CRP"
                inputref={psicologoProfessionalIdRef.ref}
                value={watch("psicologo.professionalId")}
                onChange={psicologoProfessionalIdRef.onChange}
                onBlur={psicologoProfessionalIdRef.onBlur}
                errors={errors.psicologo?.professionalId && true}
                errorMessage={errors.psicologo?.professionalId?.message}
                className={scss.nameInput}
              />
              <label
                onClick={onPsicoCertifiedChange}
                htmlFor="checkbox"
                className={scss.checkboxContainer}
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  name={psicologoCertifiedRef.name}
                  className={scss.checkbox}
                />
                <span>Possui Curso Básico de Equoterapia</span>
              </label>
            </div>
          </div>

          <div className={scss.divider} />

          <div className={scss.inputGroups}>
            <h3 className={scss.professionalTitle}>Médico</h3>
            <Input
              name={medicoNameRef.name}
              placeholder="Nome do Médico"
              inputref={medicoNameRef.ref}
              value={watch("medico.nome")}
              onChange={medicoNameRef.onChange}
              onBlur={medicoNameRef.onBlur}
              errors={errors.medico?.nome && true}
              errorMessage={errors.medico?.nome?.message}
            />

            <div className={scss.inlineGroup}>
              <Input
                name={medicoProfessionalIdRef.name}
                placeholder="CRM"
                inputref={medicoProfessionalIdRef.ref}
                value={watch("medico.professionalId")}
                onChange={medicoProfessionalIdRef.onChange}
                onBlur={medicoProfessionalIdRef.onBlur}
                errors={errors.medico?.professionalId && true}
                errorMessage={errors.medico?.professionalId?.message}
                className={scss.nameInput}
              />
              <label
                onClick={onMedicoCertifiedChange}
                htmlFor="checkbox"
                className={scss.checkboxContainer}
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  name={medicoCertifiedRef.name}
                  className={scss.checkbox}
                />
                <span>Possui Curso Básico de Equoterapia</span>
              </label>
            </div>
          </div>

          <div className={scss.divider} />

          <div className={scss.inputGroups}>
            <h3 className={scss.professionalTitle}>Equitador</h3>
            <Input
              name={equitadorNameRef.name}
              placeholder="Nome do Equitador"
              inputref={equitadorNameRef.ref}
              value={watch("equitador.nome")}
              onChange={equitadorNameRef.onChange}
              onBlur={equitadorNameRef.onBlur}
              errors={errors.equitador?.nome && true}
              errorMessage={errors.equitador?.nome?.message}
            />

            <label
              onClick={onEquitadorCertifiedChange}
              htmlFor="checkbox"
              className={scss.checkboxContainer}
            >
              <input
                type="checkbox"
                id="checkbox"
                name={equitadorCertifiedRef.name}
                className={scss.checkbox}
              />
              <span>Possui Curso Básico de Equoterapia</span>
            </label>
          </div>
        </form>
      </div>
    </main>
  );
}
