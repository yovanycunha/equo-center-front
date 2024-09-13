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
}
