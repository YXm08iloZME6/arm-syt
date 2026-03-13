import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

const data = [
  {
    name: "В процессе",
    count: 2,
    icon: Plane,
  },
  {
    name: "Запланировано",
    count: 1,
    icon: Plane,
  },
  {
    name: "Завершено",
    count: 1,
    icon: Plane,
  },
];

export const Route = createFileRoute("/_auth/app/trips")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Командировки
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление командировками сотрудников
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
