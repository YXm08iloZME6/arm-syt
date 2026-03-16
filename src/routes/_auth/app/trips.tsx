import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { PageStats } from "@/components/page-stats";

export const Route = createFileRoute("/_auth/app/trips")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Командировки
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление командировками сотрудников
      </p>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <PageStats name="В процессе" count={0} icon={Plane} />
        <PageStats name="Запланировано" count={0} icon={Plane} />
        <PageStats name="Завершено" count={0} icon={Plane} />
      </div>
    </div>
  );
}
