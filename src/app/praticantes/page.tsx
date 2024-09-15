"use client";

import { PractitionersService } from "@/services/practitioners/practitioners";
import scss from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import useIsDesktop from "@/hooks/useIsDesktop";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const getAll = async () => {
  const data = await PractitionersService.getPractitioners();
  return data;
};

export default function Praticantes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["practitioners"],
    queryFn: getAll,
  });

  const isDesktop = useIsDesktop(720);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/praticante");
  };

  const renderListHeader = () => {
    return (
      <div className={scss.link}>
        <div className={scss.practContainer}>
          <p className={scss.practInfo}>Nome</p>
          <p className={scss.practInfo}>Documento</p>
          <p className={scss.practInfo}>Responsável</p>
          {isDesktop && (
            <p className={scss.practInfo}>Documento do Responsável</p>
          )}
        </div>
      </div>
    );
  };

  const renderAllPractitioners = () => {
    if (isLoading || !data) {
      return <Loading loading={isLoading} />;
    }

    return data.map((pract: any) => {
      return (
        <Link
          className={scss.link}
          key={`${pract.name}-${pract.document}`}
          href={`/praticante/${pract.document}`}
        >
          <div className={scss.practContainer} key={pract.name}>
            <p className={scss.practInfo}>{pract.name}</p>
            <p className={scss.practInfo}>{pract.document}</p>
            <p className={scss.practInfo}>{pract.sponsor.name}</p>
            {isDesktop && (
              <p className={scss.practInfo}>{pract.sponsor.document}</p>
            )}
          </div>
        </Link>
      );
    });
  };

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <div className={scss.titleContainer}>
          <h1 className={scss.title}>Praticantes</h1>
          <Button
            type="button"
            loading={false}
            className={scss.addBtn}
            onClick={handleRedirect}
          >
            Add
          </Button>
        </div>
        <div className={scss.listContainer}>
          {renderListHeader()}
          {renderAllPractitioners()}
        </div>
      </div>
    </main>
  );
}
