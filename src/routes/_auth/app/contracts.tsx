import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, CircleCheck, CircleX } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

const data = [
  {
    name: "Всего договоров",
    count: 6,
    icon: Briefcase,
  },
  {
    name: "Активные",
    count: 5,
    icon: CircleCheck,
  },
  {
    name: "Истекшие",
    count: 1,
    icon: CircleX,
  },
];

export const Route = createFileRoute("/_auth/app/contracts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Договоры
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление трудовыми договорами сотрудников
      </p>
      <div className="grid grid-cols-3 gap-6 mt-4">
        {data.map((d) => (
          <Item variant="outline" className="bg-card">
            <ItemContent>
              <ItemTitle>{d.name}</ItemTitle>
              <ItemDescription className="text-3xl">{d.count}</ItemDescription>
            </ItemContent>
            <ItemContent>
              <d.icon />
            </ItemContent>
          </Item>
        ))}
      </div>
    </div>
  );
}
