import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { PageStats } from "@/components/page-stats";
import { TableCard } from "@/components/table-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tripsQueryOptions } from "@/lib/functions/trips";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth/app/trips")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(tripsQueryOptions());
  },
});

function RouteComponent() {
  const { data: trips } = useSuspenseQuery(tripsQueryOptions());

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
      <TableCard cardTitle="Все командировки" className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Сотрудник</TableHead>
              <TableHead>Место назначения</TableHead>
              <TableHead>Цель</TableHead>
              <TableHead>Дата начала</TableHead>
              <TableHead>Дата окончания</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip) => {
              return (
                <TableRow>
                  <TableCell>
                    {`${trip.employee?.lastName} ${trip.employee?.firstName} ${trip.employee?.surname}`}
                  </TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>{trip.purpose}</TableCell>
                  <TableCell>{trip.startDate}</TableCell>
                  <TableCell>{trip.endDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableCard>
    </div>
  );
}
