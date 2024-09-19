"use client";

import { useState } from "react";
import scss from "./page.module.scss";
import { ILogin } from "./types";
import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Auth } from "@/services/auth/Auth";

export default function Login() {
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ILogin>({
    mode: "onBlur",
    defaultValues: {},
  });

  const emailRef = register("email", {
    required: true,
    minLength: 3,
  });

  const passwordRef = register("password", {
    required: true,
    minLength: 6,
  });

  const handleRedirect = () => {
    router.push("/cadastro");
  };

  const onSubmit = async (data: ILogin) => {
    setBtnLoading(true);
    try {
      const response = await Auth.login(data);
      localStorage.setItem("authToken", response.token);
      router.push("/praticantes");
    } catch (error) {
      console.error(error);
    }
    setBtnLoading(false);
  };

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={scss.inputGroups}>
            <Input
              name={emailRef.name}
              placeholder="Email"
              inputref={emailRef.ref}
              value={watch("email")}
              onChange={emailRef.onChange}
              onBlur={emailRef.onBlur}
              errors={errors.email && true}
              errorMessage={errors.email?.message}
            />
            <Input
              name={passwordRef.name}
              placeholder="Senha"
              type="password"
              inputref={passwordRef.ref}
              value={watch("password")}
              onChange={passwordRef.onChange}
              onBlur={passwordRef.onBlur}
              errors={errors.password && true}
              errorMessage={errors.password?.message}
            />
          </div>
          <div className={scss.btnsContainer}>
            <Button
              className={scss.loginBtn}
              type="submit"
              loading={btnLoading}
            >
              Acessar
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleRedirect();
              }}
              className={scss.registerBtn}
              type="button"
              loading={false}
            >
              Criar conta
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
