import { equocenterback } from "..";

export class ActivitiesService {
  static getActivities = async () => {
    try {
      const { data } = await equocenterback.get("/api/activity/all");
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar atividades");
    }
  };

  static createActivity = async (activity: any) => {
    try {
      const { data } = await equocenterback.post(
        "/api/activity/create",
        activity
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar atividade");
    }
  };

  static getActivity = async (id: string) => {
    try {
      const { data } = await equocenterback.get(`/api/activity/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar atividade");
    }
  };

  static updateActivity = async (activity: any) => {
    try {
      const { data } = await equocenterback.patch(
        `/api/activity/update`,
        activity
      );
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar atividade");
    }
  };

  static removeActivity = async (id: string) => {
    try {
      const { data } = await equocenterback.delete(`/api/activity/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao remover atividade");
    }
  };
}
