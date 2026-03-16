import { createFileRoute } from "@tanstack/react-router";
import { employeesQueryOptions } from "@/lib/functions/employees";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  columns,
  type TableEmployee,
} from "@/components/employeeTable/columns";
import { DataTable } from "@/components/employeeTable/data-table";

export const Route = createFileRoute("/_auth/app/employes")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(employeesQueryOptions());
  },
});

function RouteComponent() {
  const { data, isLoading } = useSuspenseQuery(employeesQueryOptions());
  const tableData: TableEmployee[] = [];

  data.forEach((entry) => {
    tableData.push({
      name: `${entry.lastName} ${entry.firstName} ${entry.surname}`,
      jobTitle: entry.jobTitle.title,
      department: entry.department.title,
      admissionDate: entry.admissionDate,
      phoneNumber: entry.phoneNumber,
      email: entry.email,
    });
  });

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Реестр сотрудников
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление данными о сотрудниках организации
      </p>
      <div>
        <DataTable data={tableData} columns={columns} />
      </div>
    </div>
  );
}
