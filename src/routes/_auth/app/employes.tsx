import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/app/employes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Реестр сотрудников
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление данными о сотрудниках организации
      </p>
    </div>
  );
}
