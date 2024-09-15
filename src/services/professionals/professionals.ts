import { equocenterback } from "..";

export class ProfessionalsService {
  static getProfessionals = async () => {
    try {
      const { data } = await equocenterback.get("/api/professional/all");
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Erro ao buscar profissionais");
    }
  };

  static createProfessional = async (professional: any) => {
    try {
      const { data } = await equocenterback.post(
        "/api/professional/create",
        professional
      );
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Erro ao criar profissional");
    }
  };

  static getProfessional = async (document: string) => {
    try {
      const { data } = await equocenterback.get(
        `/api/professional/${document}`
      );
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Erro ao buscar profissional");
    }
  };

  static updateProfessional = async (professional: any) => {
    try {
      const { data } = await equocenterback.patch(
        `/api/professional/update`,
        professional
      );
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar profissional");
    }
  };

  static removeProfessional = async (document: string) => {
    try {
      const { data } = await equocenterback.delete(
        `/api/professional/${document}`
      );
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Erro ao remover profissional");
    }
  };
}
