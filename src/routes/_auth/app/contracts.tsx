import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, CircleCheck, CircleX } from "lucide-react";
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
import { contractsQueryOptions } from "@/lib/functions/contracts";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth/app/contracts")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(contractsQueryOptions());
  },
});

function RouteComponent() {
  const { data } = useSuspenseQuery(contractsQueryOptions());
  const activeAmountCount = data.filter((d) => d.status == "Активный").length;

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Договоры
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление трудовыми договорами сотрудников
      </p>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <PageStats
          name="Всего договоров"
          count={data.length}
          icon={Briefcase}
        />
        <PageStats
          name="Активные"
          count={activeAmountCount}
          icon={CircleCheck}
        />
        <PageStats
          name="Истекшие"
          count={data.length - activeAmountCount}
          icon={CircleX}
        />
      </div>
      <TableCard cardTitle="Все договоры" className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Номер договора</TableHead>
              <TableHead>Сотрудник</TableHead>
              <TableHead>Тип договора</TableHead>
              <TableHead>Дата заключения</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((contract) => {
              return (
                <TableRow>
                  <TableCell>№ {contract.contractNumber}</TableCell>
                  <TableCell>
                    {`${contract.employee?.lastName} ${contract.employee?.firstName} ${contract.employee?.surname}`}
                  </TableCell>
                  <TableCell>Бессрочный трудовой договор</TableCell>
                  <TableCell>{contract.issueDate}</TableCell>
                  <TableCell>{contract.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableCard>
    </div>
  );
}
