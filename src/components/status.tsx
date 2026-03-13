import { type LucideProps } from "lucide-react";

type StatusData = {
  name: string;
  count: number;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export default function Status({ data }: { data: StatusData }) {
  return (
    <div className="flex justify-between bg-secondary rounded-lg p-6">
      <div>
        <p>{data.name}</p>
        <p className="text-2xl">{data.count}</p>
      </div>
      <div className="flex items-center">
        <data.icon size={32} />
      </div>
    </div>
  );
}
