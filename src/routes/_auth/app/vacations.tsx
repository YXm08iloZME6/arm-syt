import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

const data = [
  {
    name: "В процессе",
    count: 1,
    icon: Calendar,
  },
  {
    name: "Запланировано",
    count: 3,
    icon: Calendar,
  },
  {
    name: "Завершено",
    count: 1,
    icon: Calendar,
  },
];

export const Route = createFileRoute("/_auth/app/vacations")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Отпуска
      </h1>
      <p className="mt-4 leading-7 not-first:mt-6">
        Управление отпусками сотрудников
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
