"use client";

import Button from "@/components/Button/Button";
import scss from "./page.module.scss";
import { useRouter } from "next/navigation";
import { ActivitiesService } from "@/services/activities/activities";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";

const getAllActivities = async () => {
  const data = await ActivitiesService.getActivities();
  return data;
};

export default function Atividades() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: getAllActivities,
  });

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/atividade");
  };

  const renderActivities = () => {
    if (isLoading || !data) {
      return <Loading loading={isLoading} />;
    }

    return data.map((activity: any) => {
      return (
        <Link
          className={scss.link}
          key={`${activity.name}-${activity.id}`}
          href={`/atividade/${activity.id}`}
        >
          <div className={scss.activityContainer}>
            <p className={scss.activityInfo}>{activity.title}</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <main className={scss.main}>
      <div className={scss.container}>
        <div className={scss.titleContainer}>
          <h1 className={scss.title}>Atividades</h1>
          <Button
            type="button"
            loading={false}
            className={scss.addBtn}
            onClick={handleRedirect}
          >
            Add
          </Button>
        </div>
        <div className={scss.listContainer}>{renderActivities()}</div>
      </div>
    </main>
  );
}
