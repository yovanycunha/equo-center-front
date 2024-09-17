"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IActivity } from "./types";
import scss from "./page.module.scss";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { ActivitiesService } from "@/services/activities/activities";

export default function Atividade() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [professionalsList, setProfessionalsList] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IActivity>({
    mode: "onBlur",
    defaultValues: { feedback: "" },
  });

  const titleRef = register("title", {
    required: true,
    minLength: 3,
  });

  const purposeRef = register("purpose", {
    required: true,
    minLength: 3,
  });

  const actionsRef = register("actions", {
    required: true,
    minLength: 3,
  });

  const professionalsRef = register("professionals", {
    required: true,
  });

  const handleProfessionalsList = (e: any) => {
    setProfessionalsList(e.target.value);
  };

  const onSubmit = async (data: IActivity) => {
    const professionals = professionalsList.split(",").filter((item: any) => {
      return item.trim().length > 0;
    });
    data.professionals = professionals;

    setBtnLoading(true);
    try {
      await ActivitiesService.createActivity(data);
      reset();
    } catch (error) {
      console.log(error);
    }
    setBtnLoading(false);
  };

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Cadastro de Atividade</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={scss.subtitle}>Informações da Atividade</h2>
          <div className={scss.inputGroups}>
            <div className={scss.inlineGroup}>
              <Input
                name={titleRef.name}
                placeholder="Título"
                inputref={titleRef.ref}
                value={watch("title")}
                onChange={titleRef.onChange}
                onBlur={titleRef.onBlur}
                errors={errors?.title && true}
                errorMessage={errors?.title?.message}
                className={scss.nameInput}
              />
              <Input
                name={purposeRef.name}
                placeholder="Objetivo"
                inputref={purposeRef.ref}
                value={watch("purpose")}
                onChange={purposeRef.onChange}
                onBlur={purposeRef.onBlur}
                errors={errors?.purpose && true}
                errorMessage={errors?.purpose?.message}
                className={scss.nameInput}
              />
            </div>
            <Input
              name={actionsRef.name}
              placeholder="Ações"
              inputref={actionsRef.ref}
              value={watch("actions")}
              onChange={actionsRef.onChange}
              onBlur={actionsRef.onBlur}
              errors={errors?.actions && true}
              errorMessage={errors?.actions?.message}
            />
            <Input
              name={professionalsRef.name}
              placeholder="Profissionais - Separar por vírgula"
              inputref={professionalsRef.ref}
              value={professionalsList}
              onChange={handleProfessionalsList}
              onBlur={professionalsRef.onBlur}
              errors={errors?.professionals && true}
              errorMessage={errors?.professionals?.message}
            />
          </div>
          <div className={scss.btnsContainer}>
            <Button type="submit" loading={btnLoading}>
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
