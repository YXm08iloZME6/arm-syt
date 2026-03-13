import { createFileRoute } from "@tanstack/react-router";
import { HomeCard } from "@/components/homeCard";

type Data = {
  title: string;
  info: string;
  date: string;
};

const data: Array<Data> = [
  {
    title: "Приказ о приеме на работе",
    info: "Морозов Дмитрий Павлович",
    date: "12.04.2022",
  },
  {
    title: "Приказ о направлении в командировку",
    info: "Сидоров Петр Алексеевич",
    date: "05.12.2024",
  },
];

export const Route = createFileRoute("/_auth/app/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Главная панель
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Обзор текущей деятельности отдела кадров
      </p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <HomeCard
          cardTitle="Последние приказы"
          data={data}
          link={"/app/reports"}
          linkName="Все приказы →"
        />
        <HomeCard
          cardTitle="Текущие командировки"
          data={data}
          link={"/app/reports"}
          linkName="Все командировки →"
        />
        <HomeCard
          cardTitle="Ближайшие отпуска"
          data={data}
          link={"/app/reports"}
          linkName="Все отпуска →"
        />
        <HomeCard
          cardTitle="Статистика по договорам"
          data={data}
          link={"/app/reports"}
          linkName="Все договоры →"
        />
      </div>
    </div>
  );
}
