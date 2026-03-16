import { db } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

const getEmployees = createServerFn({ method: "GET" }).handler(async () => {
  const employees = db.query.employees.findMany({
    with: {
      department: true,
      jobTitle: true,
    },
  });
  return employees;
});

export const employeesQueryOptions = () =>
  queryOptions({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });

export type Employees = Awaited<ReturnType<typeof getEmployees>>;
export type Employee = Employees[number];
