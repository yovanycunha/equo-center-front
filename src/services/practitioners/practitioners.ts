import { equocenterback } from "@/services";

interface IPractitioner {}

export class PractitionersService {
  static getPractitioners = async () => {
    try {
      const { data } = await equocenterback.get("/api/practitioner/all");

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar praticantes");
    }
  };

  static createPractitioner = async (practitioner: any) => {
    try {
      const { data } = await equocenterback.post(
        "/api/practitioner/create",
        practitioner
      );

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar praticante");
    }
  };
}
