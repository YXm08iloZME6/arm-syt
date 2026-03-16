import { createFileRoute } from "@tanstack/react-router";
import { HomeCard } from "@/components/home-card";
import { ordersQueryOptions } from "@/lib/functions/orders";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth/app/home")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(ordersQueryOptions());
  },
});

function RouteComponent() {
  const { data, isLoading } = useSuspenseQuery(ordersQueryOptions());

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
      </div>
    </div>
  );
}
