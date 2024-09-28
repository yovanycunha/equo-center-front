"use client";

import { ProfessionalsService } from "@/services/professionals/professionals";
import scss from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import useIsDesktop from "@/hooks/useIsDesktop";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const getAll = async () => {
  const data = await ProfessionalsService.getProfessionals();
  return data;
};

export default function Profissionais() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["professionals"],
    queryFn: getAll,
  });

  const isDesktop = useIsDesktop(720);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/profissional");
  };

  const renderProfessionals = () => {
    if (isLoading || !data) {
      return <Loading loading={isLoading} />;
    }

    return data.map((professional: any) => {
      return (
        <Link
          className={scss.link}
          key={`${professional.name}-${professional.document}`}
          href={`/profissional/${professional.document}`}
        >
          <div className={scss.professionalContainer} key={professional.name}>
            <p className={scss.professionalInfo}>{professional.name}</p>
            <p className={scss.professionalInfo}>{professional.specialty}</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <div className={scss.titleContainer}>
          <h1 className={scss.title}>Profissionais</h1>
          <Button
            type="button"
            loading={false}
            className={scss.addBtn}
            onClick={handleRedirect}
          >
            Adicionar Profissional
          </Button>
          {/* TODO: Colocar ícone */}
        </div>
        <div className={scss.listContainer}>{renderProfessionals()}</div>
      </div>
    </main>
  );
}
