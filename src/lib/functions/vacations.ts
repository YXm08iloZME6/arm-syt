import { db } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

const getVacations = createServerFn({ method: "GET" }).handler(async () => {
  const vacations = db.query.vacations.findMany({
    with: {
      employee: true,
    },
  });
  return vacations;
});

export const vacationsQueryOptions = () =>
  queryOptions({
    queryKey: ["vacation"],
    queryFn: () => getVacations(),
  });
