import Axios from "axios";
import { getEnvs, TStages } from "@/config/env";

const endpoints = getEnvs(process.env.STAGE as TStages);

const equocenterback = Axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export { equocenterback };
