export type TStages = "LOCAL" | "PROD";

const stages = {
  LOCAL: {
    equocenterback: {
      baseUrl: "http://localhost:8080",
    },
  },
  PROD: {
    equocenterback: {
      baseUrl: "http://localhost:8080",
    },
  },
};

export const getEnvs = (env: TStages) => stages[env];
