import { createFileRoute } from "@tanstack/react-router";
import {
  employeesQueryOptions,
  departmentsQueryOptions,
  jobTitlesQueryOptions,
  addEmployee,
} from "@/lib/functions/employees";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  columns,
  type TableEmployee,
} from "@/components/employeeTable/columns";
import { DataTable } from "@/components/employeeTable/DataTable";
import { EmployeeForm } from "@/components/EmployeeForm";
import { deleteEmployee } from "@/lib/functions/employees";
import { type EmployeeInsert } from "@/lib/db/tables/main";

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
  const context = Route.useRouteContext();

  const { mutate: addEmp } = useMutation({
    mutationFn: (data: EmployeeInsert) => addEmployee({ data }),
    onMutate: async (id) => {
      await context.queryClient.cancelQueries({ queryKey: ["employees"] });
      const previousEmployees = context.queryClient.getQueryData(["employees"]);

      context.queryClient.setQueryData(["employees"], (old: any) =>
        old?.filter((emp: any) => emp.id !== id),
      );

      return { previousEmployees };
    },
    onSettled: () => {
      context.queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const { mutate: deleteEmp } = useMutation({
    mutationFn: (id: number) => deleteEmployee({ data: { id } }),
    onMutate: async (id) => {
      await context.queryClient.cancelQueries({ queryKey: ["employees"] });
      const previousEmployees = context.queryClient.getQueryData(["employees"]);

      context.queryClient.setQueryData(["employees"], (old: any) =>
        old?.filter((emp: any) => emp.id !== id),
      );

      return { previousEmployees };
    },
    onSettled: () => {
      context.queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const { data: employees } = useSuspenseQuery(employeesQueryOptions());
  const { data: departments } = useSuspenseQuery(departmentsQueryOptions());
  const { data: jobTitles } = useSuspenseQuery(jobTitlesQueryOptions());
  const tableData: TableEmployee[] = [];

  employees.forEach((entry) => {
    tableData.push({
      id: entry.id,
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
        <DataTable
          handleDelete={deleteEmp}
          data={tableData}
          columns={columns}
        />
      </div>
      <EmployeeForm
        handleAdd={addEmp}
        jobValues={jobTitles}
        depsValues={departments}
      />
    </div>
  );
}
