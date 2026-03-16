import { createServerFn } from "@tanstack/react-start";
import { db } from "@/lib/db/index";
import { queryOptions } from "@tanstack/react-query";

export const getOrders = createServerFn({ method: "GET" }).handler(async () => {
  const orders = await db.query.orders.findMany({
    with: {
      employee: true,
      orderType: true,
    },
  });
  return orders;
});

export const ordersQueryOptions = () =>
  queryOptions({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

export type Orders = Awaited<ReturnType<typeof getOrders>>;
export type Order = Orders[number];
