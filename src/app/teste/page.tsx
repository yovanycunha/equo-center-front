"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Option from "@/components/Option/Option";
import Select from "@/components/Select/Select";
import { FC, RefAttributes, SyntheticEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormData {
  nome: string;
  year: number;
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
    clearErrors,
  } = useForm<IFormData>({
    mode: "onBlur",
    defaultValues: { nome: "", year: 2024 },
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    console.log("data", data);
  };

  const inptRef = register("nome", { required: true, minLength: 3 });

  const renderYears = () =>
    new Array(17)
      .fill(2024 - 10)
      .map((value, index) => (
        <Option
          key={`${value + index}`}
          value={value + index}
          selected={watch("year") === value + index}
        >
          {value + index}
        </Option>
      ))
      .reverse();

  //   useEffect(() => {
  //     setError("nome", {
  //       type: "manual",
  //       message: "Este campo é obrigatório",
  //     });
  //   }, [setError]);

  console.log(watch("year"), "year");

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

        <Select
          arrow
          value={watch("year")}
          errors={!!errors.year}
          // className={scss.select}
          label="Ano de formação"
          onChange={(value: number) => setValue("year", value)}
          errorMessage="Ano de formação é um campo obrigatório."
          onBlur={() => {
            if (!watch("year")) {
              setError("year", {
                type: "manual",
                message: "Ano de formação é um campo obrigatório",
              });
            }
          }}
          onFocus={() => {
            clearErrors("year");
          }}
        >
          {renderYears()}
        </Select>

        {/* {errors.nome && <span>required</span>} */}
        <input type="submit" />

        <Button loading={true}>Teste Loading</Button>
      </form>
    </main>
  );
};

export default Teste;
