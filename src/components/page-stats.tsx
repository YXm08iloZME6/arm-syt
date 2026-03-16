import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { type LucideProps } from "lucide-react";

type PageStatsProps = {
  name: string;
  count: number;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export function PageStats({ name, count, ...props }: PageStatsProps) {
  return (
    <Item variant="outline" className="bg-card">
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription className="text-3xl">{count}</ItemDescription>
      </ItemContent>
      <ItemContent>
        <props.icon size={32} />
      </ItemContent>
    </Item>
  );
}
