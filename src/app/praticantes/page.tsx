"use client";

import { PractitionersService } from "@/services/practitioners/practitioners";
import scss from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";

const getAll = async () => {
  const data = await PractitionersService.getPractitioners();
  return data;
};

export default function Praticantes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["practitioners"],
    queryFn: getAll,
  });

  const renderAllPractitioners = () => {
    if (isLoading || !data) {
      return <Loading loading={isLoading} />;
    }

    return data.map((pract: any) => {
      return (
        <div className={scss.practContainer} key={pract.name}>
          <p className={scss.practInfo}>{pract.name}</p>
          <p className={scss.practInfo}>{pract.sponsor.name}</p>
        </div>
      );
    });
  };

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <h1 className={scss.title}>Praticantes</h1>
        <div className={scss.listContainer}>{renderAllPractitioners()}</div>
      </div>
    </main>
  );
}
