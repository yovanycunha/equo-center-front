"use client";

import { ActivitiesService } from "@/services/activities/activities";
import scss from "../page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IActivity } from "../types";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const getActivity = async (id: string) => {
  const data = await ActivitiesService.getActivity(id);
  return data;
};

export default function EditProfessional({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["activity"],
    queryFn: () => getActivity(params.id),
  });

  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);
  const [professionalsList, setProfessionalsList] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<IActivity>({
    mode: "onBlur",
    defaultValues: {
      feedback: "",
      actions: "",
      purpose: "",
      professionals: [],
    },
  });

  const defaultValues = () => {
    if (!isLoading) {
      setValue("title", data?.title);
      setValue("purpose", data?.purpose);
      setValue("actions", data?.actions);
      setValue("professionals", data?.professionals);
      setValue("feedback", data?.feedback);
      setProfessionalsList(data?.professionals.join(","));
    }
  };

  const titleRef = register("title", {
    minLength: 3,
  });

  const purposeRef = register("purpose", {
    minLength: 3,
  });

  const actionsRef = register("actions", {
    minLength: 3,
  });

  const professionalsRef = register("professionals", {});

  const feedbackRef = register("feedback", {});

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
      await ActivitiesService.updateActivity({ id: params.id, ...data });
      router.push("/atividades");
    } catch (error) {
      console.log(error);
    }
    setBtnLoading(false);
  };

  const handleRemoveActivity = async () => {
    try {
      setBtnLoading(true);
      await ActivitiesService.removeActivity(params.id);
      router.push("/atividades");
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    defaultValues();
  }, [data]);

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Editar de Atividade</h1>
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
            <Input
              name={feedbackRef.name}
              placeholder="Avaliação da atividade"
              inputref={feedbackRef.ref}
              value={watch("feedback")}
              onChange={feedbackRef.onChange}
              onBlur={feedbackRef.onBlur}
              errors={errors?.feedback && true}
              errorMessage={errors?.feedback?.message}
            />
          </div>
          <div className={scss.btnsContainer}>
            <Button type="submit" loading={btnLoading}>
              Editar
            </Button>
            <Button
              type="button"
              loading={btnLoading}
              className={scss.btnRemove}
              onClick={(e) => {
                e.preventDefault();
                handleRemoveActivity();
              }}
            >
              Remover
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
