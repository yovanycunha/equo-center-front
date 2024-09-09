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

  static getPractitionerByDocument = async (document: string) => {
    try {
      const { data } = await equocenterback.get(
        `/api/practitioner/${document}`
      );

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar praticante");
    }
  };

  static updatePractitioner = async (practitioner: any) => {
    try {
      const { data } = await equocenterback.patch(
        `/api/practitioner/update`,
        practitioner
      );
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar praticante");
    }
  };

  static deletePractitioner = async (document: string) => {
    try {
      await equocenterback.delete(`/api/practitioner/${document}`);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar praticante");
    }
  };
}
