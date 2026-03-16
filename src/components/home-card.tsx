import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Link } from "@tanstack/react-router";
import { type Order } from "@/lib/functions/orders";

type HomeCardProps = {
  cardTitle: string;
  data: Array<Order>;
  link: string;
  linkName: string;
};

export function HomeCard({ cardTitle, data, link, linkName }: HomeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data.map((i) => (
          <Item key={i.id} variant={"muted"}>
            <ItemContent>
              <ItemTitle>{i.orderType.name}</ItemTitle>
              <ItemDescription>
                {i.employee?.lastName} {i.employee?.firstName}{" "}
                {i.employee?.surname}
              </ItemDescription>
            </ItemContent>
            <ItemContent className="flex-none text-center">
              <ItemDescription>{i.orderDate}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </CardContent>
      <CardFooter>
        <Link className="text-blue-400" to={link}>
          {linkName}
        </Link>
      </CardFooter>
    </Card>
  );
}
