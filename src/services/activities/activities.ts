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
}
