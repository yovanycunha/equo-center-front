"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { FC, RefAttributes, SyntheticEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormData {
  nome: string;
}
const latinCharacters =
  "a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ";

const fullNameRegex = new RegExp(
  `^([${latinCharacters}]{3,})+\\s+([${latinCharacters}\\s]{3,})+$`
);

const Teste: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    setError,
  } = useForm<IFormData>({ mode: "onBlur", defaultValues: { nome: "" } });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    console.log("data", data);
  };

  const inptRef = register("nome", { required: true, minLength: 3 });

  //   useEffect(() => {
  //     setError("nome", {
  //       type: "manual",
  //       message: "Este campo é obrigatório",
  //     });
  //   }, [setError]);

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name={inptRef.name}
          inputref={inptRef.ref}
          value={watch("nome")}
          placeholder="Nome completo"
          onChange={inptRef.onChange}
          onBlur={inptRef.onBlur}
          errors={errors.nome && true}
          errorMessage={errors.nome?.message}
        />

        {/* {errors.nome && <span>required</span>} */}
        <input type="submit" />

        <Button loading={true}>Teste Loading</Button>
      </form>
    </main>
  );
};

export default Teste;
