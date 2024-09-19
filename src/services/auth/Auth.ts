import { equocenterback } from "..";

export class Auth {
  static login = async (loginData: any) => {
    try {
      const { data } = await equocenterback.post("/api/user/login", loginData);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao fazer login");
    }
  };

  static createUser = async (userData: any) => {
    try {
      const { data } = await equocenterback.post("/api/user/create", userData);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar usuário");
    }
  };
}
