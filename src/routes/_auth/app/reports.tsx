import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/app/reports")({
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
    </div>
  );
}
