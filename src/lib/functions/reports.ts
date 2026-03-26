import { db } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

const getReports = createServerFn({ method: "GET" }).handler(async () => {
  const reports = db.query.reports.findMany({
    with: {
      employee: true,
    },
  });
  return reports;
});

export const vacationsQueryOptions = () =>
  queryOptions({
    queryKey: ["vacation"],
    queryFn: () => getReports(),
  });
