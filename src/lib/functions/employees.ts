import { db } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { employeeInsertSchema } from "@/lib/db/tables/main";
import * as schema from "@/lib/db/tables/main";

const getEmployees = createServerFn({ method: "GET" }).handler(async () => {
  const employees = db.query.employees.findMany({
    with: {
      department: true,
      jobTitle: true,
    },
  });
  return employees;
});

export type Employees = Awaited<ReturnType<typeof getEmployees>>;
export type Employee = Employees[number];

export const addEmployee = createServerFn({ method: "POST" })
  .inputValidator(employeeInsertSchema)
  .handler(async ({ data }) => {
    await db.insert(schema.employees).values(data);
  });

export const employeesQueryOptions = () =>
  queryOptions({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });

const getDepartments = createServerFn({ method: "GET" }).handler(async () => {
  const departments = db.query.departments.findMany();
  return departments;
});

export const departmentsQueryOptions = () =>
  queryOptions({
    queryKey: ["departments"],
    queryFn: () => getDepartments(),
  });

export type Departments = Awaited<ReturnType<typeof getDepartments>>;
export type Department = Departments[number];

const getJobTitles = createServerFn({ method: "GET" }).handler(async () => {
  const jobTitles = db.query.jobTitles.findMany();
  return jobTitles;
});

export const jobTitlesQueryOptions = () =>
  queryOptions({
    queryKey: ["jobTitles"],
    queryFn: () => getJobTitles(),
  });

export type JobTitles = Awaited<ReturnType<typeof getJobTitles>>;
export type JobTitle = JobTitles[number];
