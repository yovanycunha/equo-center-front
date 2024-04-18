"use client";

import { useForm } from "react-hook-form";
import scss from "./page.module.scss";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

type TAtividade = {
  nome: string;
  tipo: string;
};

interface IFormPratica {
  praticante: string;
  atividades: TAtividade[];
  instrutor: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    setError,
  } = useForm<IFormPratica>({
    mode: "onBlur",
    defaultValues: { praticante: "", instrutor: "", atividades: [] },
  });

  const praticanteRef = register("praticante", {
    required: true,
    minLength: 3,
  });
  const instrutorRef = register("instrutor", {
    required: true,
    minLength: 3,
  });

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Cadastro de Prática</h1>

        <form>
          <div className={scss.inputGroup}>
            <Input
              name={praticanteRef.name}
              placeholder="Nome do Praticante"
              inputref={praticanteRef.ref}
              value={watch("praticante")}
              onChange={praticanteRef.onChange}
              onBlur={praticanteRef.onBlur}
              errors={errors.praticante && true}
              errorMessage={errors.praticante?.message}
            />
          </div>

          <div className={scss.inputGroup}>
            <Input
              name={instrutorRef.name}
              placeholder="Nome do Instrutor"
              inputref={instrutorRef.ref}
              value={watch("praticante")}
              onChange={instrutorRef.onChange}
              onBlur={instrutorRef.onBlur}
              errors={errors.instrutor && true}
              errorMessage={errors.instrutor?.message}
            />
          </div>

          <Button type="submit" loading={false}>
            Cadastrar
          </Button>
        </form>
      </div>
    </main>
  );
}
