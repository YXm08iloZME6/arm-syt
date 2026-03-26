import { db } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

const getTrips = createServerFn({ method: "GET" }).handler(async () => {
  const trips = db.query.businessTrips.findMany({
    with: {
      employee: true,
    },
  });
  return trips;
});

export const tripsQueryOptions = () =>
  queryOptions({
    queryKey: ["businessTrips"],
    queryFn: () => getTrips(),
  });
