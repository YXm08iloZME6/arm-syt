import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export type TableEmployee = {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  admissionDate: string;
  phoneNumber: string | null;
  email: string | null;
};

export const columns: ColumnDef<TableEmployee>[] = [
  {
    accessorKey: "name",
    header: "ФИО",
    cell: ({ row }) => {
      const id = row.getValue<number>("id");
      const name = row.getValue<string>("name");
      const email = row.original.email;

      return (
        <div>
          <div>
            <Link to={`/app/employee/${id}`}>{name}</Link>
          </div>
          <div className="text-muted-foreground">{email}</div>
        </div>
      );
    },
  },
  { accessorKey: "jobTitle", header: "Должность" },
  { accessorKey: "department", header: "Отдел" },
  { accessorKey: "admissionDate", header: "Дата приёма" },
  { accessorKey: "phoneNumber", header: "Контакты" },
  {
    accessorKey: "id",
    header: "Действия",
    cell: ({ row, table }) => {
      const id = row.getValue<number>("id");
      return (
        <div className="flex justify-center">
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() => table.options.meta?.deleteRow(id)}
          >
            <X />
          </Button>
        </div>
      );
    },
  },
];
