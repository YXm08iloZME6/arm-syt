import { type ColumnDef } from "@tanstack/react-table";

export type TableEmployee = {
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
      const name = row.getValue<string>("name");
      const email = row.original.email;

      return (
        <div>
          <div>{name}</div>
          <div className="text-muted-foreground">{email}</div>
        </div>
      );
    },
  },
  { accessorKey: "jobTitle", header: "Должность" },
  { accessorKey: "department", header: "Отдел" },
  { accessorKey: "admissionDate", header: "Дата приёма" },
  { accessorKey: "phoneNumber", header: "Контакты" },
];
