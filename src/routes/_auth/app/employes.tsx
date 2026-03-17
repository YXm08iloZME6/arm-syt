import { createFileRoute } from "@tanstack/react-router";
import {
  employeesQueryOptions,
  departmentsQueryOptions,
  jobTitlesQueryOptions,
} from "@/lib/functions/employees";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  columns,
  type TableEmployee,
} from "@/components/employeeTable/columns";
import { DataTable } from "@/components/employeeTable/data-table";
import { EmployeeForm } from "@/components/employee-form";

export const Route = createFileRoute("/_auth/app/employes")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(employeesQueryOptions()),
      context.queryClient.ensureQueryData(departmentsQueryOptions()),
      context.queryClient.ensureQueryData(jobTitlesQueryOptions()),
    ]);
  },
});

function RouteComponent() {
  const { data: employees } = useSuspenseQuery(employeesQueryOptions());
  const { data: departments } = useSuspenseQuery(departmentsQueryOptions());
  const { data: jobTitles } = useSuspenseQuery(jobTitlesQueryOptions());
  const tableData: TableEmployee[] = [];

  employees.forEach((entry) => {
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
      <EmployeeForm jobValues={jobTitles} depsValues={departments} />
    </div>
  );
}
