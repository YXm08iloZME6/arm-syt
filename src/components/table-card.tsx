import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";
import { Button } from "./ui/button";

interface TableCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cardTitle: string;
}

export function TableCard({
  className,
  children,
  cardTitle,
  ...props
}: TableCardProps) {
  return (
    <div className={cn("rounded-md border bg-card p-4", className)} {...props}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="leading-none font-medium">{cardTitle}</h4>
        <Button>+ Добавить</Button>
      </div>
      {children}
    </div>
  );
}
