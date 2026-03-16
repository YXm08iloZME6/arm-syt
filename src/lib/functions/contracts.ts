import { db } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

export const getContracts = createServerFn({ method: "GET" }).handler(
  async () => {
    const contracts = db.query.contracts.findMany({
      with: {
        employee: true,
      },
    });
    return contracts;
  },
);

export const contractsQueryOptions = () =>
  queryOptions({
    queryKey: ["contracts"],
    queryFn: () => getContracts(),
  });
