import { createFileRoute } from "@tanstack/react-router";
import { employeeQueryOptions } from "@/lib/functions/employees";
import { contractsQueryOptions } from "@/lib/functions/contracts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Phone, Calendar, Building, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableCard } from "@/components/table-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_auth/app/employee/$id")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(
        employeeQueryOptions(Number(params.id)),
      ),
      context.queryClient.ensureQueryData(contractsQueryOptions()),
    ]);
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: user } = useSuspenseQuery(employeeQueryOptions(Number(id)));
  const { data: contracts } = useSuspenseQuery(contractsQueryOptions());
  return (
    <>
      <Card>
        <CardContent className="flex gap-8">
          <div>
            <div className="w-24 h-24 bg-blue-200 rounded-full flex justify-center items-center text-2xl text-blue-700 font-bold">
              {`${user?.lastName[0]}${user?.firstName[0]}`}
            </div>
          </div>
          <div className="w-full">
            <div className="text-lg font-bold">{`${user?.lastName} ${user?.firstName} ${user?.surname} `}</div>
            <div className="grid grid-cols-2 mt-4">
              <div className="flex flex-col gap-4">
                <span className="flex items-center">
                  <Briefcase className="inline-block mr-2" />
                  {user?.jobTitle.title}
                </span>
                <span className="flex items-center">
                  <Phone className="inline-block mr-2" />
                  {user?.phoneNumber}
                </span>
                <span className="flex items-center">
                  <Calendar className="inline-block mr-2" />
                  Принят: {user?.admissionDate}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="flex items-center">
                  <Building className="inline-block mr-2" />
                  {user?.department.title}
                </span>
                <span className="flex items-center">
                  <Mail className="inline-block mr-2" />
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="contracts">Контракты</TabsTrigger>
          <TabsTrigger value="vacations">Отпуска</TabsTrigger>
          <TabsTrigger value="trips">Командировки</TabsTrigger>
          <TabsTrigger value="orders">Приказы</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts">
          <TableCard cardTitle="Договоры сотрудника">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Тип договора</TableHead>
                  <TableHead>Дата заключения</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => {
                  if (contract?.employeeId == user?.id) {
                    return (
                      <TableRow>
                        <TableCell>Бессрочный трудовой договор</TableCell>
                        <TableCell>{contract.issueDate}</TableCell>
                        <TableCell>{contract.status}</TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
