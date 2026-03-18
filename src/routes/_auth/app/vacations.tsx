import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { PageStats } from "@/components/page-stats";
import { vacationsQueryOptions } from "@/lib/functions/vacations";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TableCard } from "@/components/table-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_auth/app/vacations")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(vacationsQueryOptions());
  },
});

function RouteComponent() {
  const { data: vacations } = useSuspenseQuery(vacationsQueryOptions());

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Отпуска
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление отпусками сотрудников
      </p>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <PageStats name="В процессе" count={0} icon={Calendar} />
        <PageStats name="Запланировано" count={0} icon={Calendar} />
        <PageStats name="Завершено" count={0} icon={Calendar} />
      </div>
      <TableCard cardTitle="Все отпуска" className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Сотрудник</TableHead>
              <TableHead>Тип отпуска</TableHead>
              <TableHead>Дата начала</TableHead>
              <TableHead>Дата окончания</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacations.map((contract) => {
              return (
                <TableRow>
                  <TableCell>
                    {`${contract.employee?.lastName} ${contract.employee?.firstName} ${contract.employee?.surname}`}
                  </TableCell>
                  <TableCell>{contract.vacationType}</TableCell>
                  <TableCell>{contract.startDate}</TableCell>
                  <TableCell>{contract.endDate}</TableCell>
                  <TableCell>{contract.endDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableCard>
    </div>
  );
}
