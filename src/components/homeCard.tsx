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

type Data = {
  title: string;
  info: string;
  date: string;
};

type HomeCardProps = {
  cardTitle: string;
  data: Array<Data>;
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
        {data.map((d) => (
          <Item variant={"muted"}>
            <ItemContent>
              <ItemTitle>{d.title}</ItemTitle>
              <ItemDescription>{d.info}</ItemDescription>
            </ItemContent>
            <ItemContent className="flex-none text-center">
              <ItemDescription>{d.date}</ItemDescription>
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
