"use client";

import { useForm } from "react-hook-form";
import scss from "./page.module.scss";
import { IPraticante } from "./types";
import Input from "@/components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import { RootState } from "@/redux";
import { useEffect } from "react";

export default function CadastroPraticante() {
  const dispatch = useDispatch();
  const praticantesList = useSelector(
    (state: RootState) => state.praticante.praticantes
  );

  console.log("lista inicial", praticantesList);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    setError,
  } = useForm<IPraticante>({
    mode: "onBlur",
  });

  const nomeRef = register("nome", {
    required: true,
    minLength: 3,
  });

  const CIDRef = register("CID", {
    required: false,
    minLength: 3,
  });

  const dataNascimentoRef = register("dataNascimento", {
    required: true,
    minLength: 8,
  });

  const idadeRef = register("idade", {
    required: false,
    maxLength: 2,
  });

  const dataAdmissaoRef = register("dataAdmissao", {
    required: false,
  });

  const generoRef = register("genero", {
    required: false,
  });

  const documentoRef = register("documento", {
    required: true,
    minLength: 7,
  });

  const nomeResponsavelRef = register("nomeResponsavel", {
    required: true,
    minLength: 3,
  });

  const telefoneResponsavelRef = register("telefoneResponsavel", {
    required: true,
    //TODO: Add phone validation
  });

  const documentoResponsavelRef = register("documentoResponsavel", {
    required: true,
    minLength: 7,
  });

  const emailResponsavelRef = register("emailResponsavel", {
    required: false,
    //TODO: Add email validation
  });

  const enderecoRef = register("endereco", {
    required: false,
  });

  const cidadeRef = register("cidade", {
    required: false,
  });

  const bairroRef = register("bairro", {
    required: false,
  });

  const onSubmit = async (data: IPraticante) => {
    try {
      dispatch({ type: "praticante/addPraticante", payload: data });
      reset();
    } catch (err: any) {
      console.log(err);
    }
  };

  const nascimentoValue = watch("dataNascimento");
  const admissaoValue = watch("dataAdmissao");

  const telefoneValue = watch("telefoneResponsavel");

  const normalizeCepNumber = (value: String | undefined) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
      .replace(/(-\d{3})(\d+?)/, "$1");
  };

  const normalizeCnpjNumber = (value: String | undefined) => {
    if (!value) return "";

    return value
      .replace(/[\D]/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const normalizePhoneNumber = (value: String | undefined) => {
    if (!value) return "";

    return value
      .replace(/[\D]/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)/, "$1");
  };

  const normalizeDate = (value: String | undefined) => {
    if (!value) return "";

    return value
      .replace(/[\D]/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  useEffect(() => {
    setValue("dataAdmissao", normalizeDate(admissaoValue));
    setValue("dataNascimento", normalizeDate(nascimentoValue));
  }, [admissaoValue, nascimentoValue, setValue]);

  useEffect(() => {
    setValue("telefoneResponsavel", normalizePhoneNumber(telefoneValue));
  }, [telefoneValue, setValue]);

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Cadastro do Praticante</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={scss.subtitle}>Informações do Praticante</h2>
          <div className={scss.inputGroups}>
            <Input
              name={nomeRef.name}
              placeholder="Nome"
              inputref={nomeRef.ref}
              value={watch("nome")}
              onChange={nomeRef.onChange}
              onBlur={nomeRef.onBlur}
              errors={errors.nome && true}
              errorMessage={errors.nome?.message}
            />
            <div className={scss.inlineGroup}>
              <Input
                name={dataNascimentoRef.name}
                placeholder="Data de Nascimento"
                inputref={dataNascimentoRef.ref}
                value={watch("dataNascimento")}
                onChange={dataNascimentoRef.onChange}
                onBlur={dataNascimentoRef.onBlur}
                errors={errors.dataNascimento && true}
                errorMessage={errors.dataNascimento?.message}
                className={scss.nameInput}
              />

              <Input
                name={idadeRef.name}
                placeholder="Idade"
                inputref={idadeRef.ref}
                value={watch("idade")}
                onChange={idadeRef.onChange}
                onBlur={idadeRef.onBlur}
                errors={errors.CID && true}
                errorMessage={errors.CID?.message}
                className={scss.nameInput}
              />
            </div>

            <div className={scss.inlineGroup}>
              <Input
                name={documentoRef.name}
                placeholder="Documento"
                inputref={documentoRef.ref}
                value={watch("documento")}
                onChange={documentoRef.onChange}
                onBlur={documentoRef.onBlur}
                errors={errors.documento && true}
                errorMessage={errors.documento?.message}
                className={scss.nameInput}
              />

              <Input
                name={generoRef.name}
                placeholder="Gênero"
                inputref={generoRef.ref}
                value={watch("genero")}
                onChange={generoRef.onChange}
                onBlur={generoRef.onBlur}
                errors={errors.genero && true}
                errorMessage={errors.genero?.message}
                className={scss.nameInput}
              />
            </div>

            <div className={scss.inlineGroup}>
              <Input
                name={dataAdmissaoRef.name}
                placeholder="Data de admissão"
                inputref={dataAdmissaoRef.ref}
                value={watch("dataAdmissao")}
                onChange={dataAdmissaoRef.onChange}
                onBlur={dataAdmissaoRef.onBlur}
                errors={errors.dataAdmissao && true}
                errorMessage={errors.dataAdmissao?.message}
                className={scss.nameInput}
              />

              <Input
                name={CIDRef.name}
                placeholder="CID"
                inputref={CIDRef.ref}
                value={watch("CID")}
                onChange={CIDRef.onChange}
                onBlur={CIDRef.onBlur}
                errors={errors.CID && true}
                errorMessage={errors.CID?.message}
                className={scss.nameInput}
              />
            </div>

            <h2 className={scss.subtitle}>Informações do Responsável</h2>
            <Input
              name={nomeResponsavelRef.name}
              placeholder="Nome do Responsável"
              inputref={nomeResponsavelRef.ref}
              value={watch("nomeResponsavel")}
              onChange={nomeResponsavelRef.onChange}
              onBlur={nomeResponsavelRef.onBlur}
              errors={errors.nomeResponsavel && true}
              errorMessage={errors.nomeResponsavel?.message}
            />

            <div className={scss.inlineGroup}>
              <Input
                name={documentoResponsavelRef.name}
                placeholder="Documento do Responsável"
                inputref={documentoResponsavelRef.ref}
                value={watch("documentoResponsavel")}
                onChange={documentoResponsavelRef.onChange}
                onBlur={documentoResponsavelRef.onBlur}
                errors={errors.documentoResponsavel && true}
                errorMessage={errors.documentoResponsavel?.message}
                className={scss.nameInput}
              />

              <Input
                name={telefoneResponsavelRef.name}
                placeholder="Telefone"
                inputref={telefoneResponsavelRef.ref}
                value={watch("telefoneResponsavel")}
                onChange={telefoneResponsavelRef.onChange}
                onBlur={telefoneResponsavelRef.onBlur}
                errors={errors.telefoneResponsavel && true}
                errorMessage={errors.telefoneResponsavel?.message}
                className={scss.nameInput}
              />
            </div>

            <Input
              name={emailResponsavelRef.name}
              placeholder="E-mail"
              inputref={emailResponsavelRef.ref}
              value={watch("emailResponsavel")}
              onChange={emailResponsavelRef.onChange}
              onBlur={emailResponsavelRef.onBlur}
              errors={errors.emailResponsavel && true}
              errorMessage={errors.emailResponsavel?.message}
            />

            <h2 className={scss.subtitle}>Endereço</h2>
            <Input
              name={cidadeRef.name}
              placeholder="Cidade"
              inputref={cidadeRef.ref}
              value={watch("cidade")}
              onChange={cidadeRef.onChange}
              onBlur={cidadeRef.onBlur}
              errors={errors.cidade && true}
              errorMessage={errors.cidade?.message}
            />

            <Input
              name={enderecoRef.name}
              placeholder="Endereço"
              inputref={enderecoRef.ref}
              value={watch("endereco")}
              onChange={enderecoRef.onChange}
              onBlur={enderecoRef.onBlur}
              errors={errors.endereco && true}
              errorMessage={errors.endereco?.message}
            />

            <Input
              name={bairroRef.name}
              placeholder="Bairro"
              inputref={bairroRef.ref}
              value={watch("bairro")}
              onChange={bairroRef.onChange}
              onBlur={bairroRef.onBlur}
              errors={errors.bairro && true}
              errorMessage={errors.bairro?.message}
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
