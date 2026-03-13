import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "./ui/button";
import { authClient } from "@/lib/auth/authClient";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Plane,
  ChartBar,
} from "lucide-react";

const navItems = [
  { label: "Главная", to: "/app/home", icon: LayoutDashboard },
  { label: "Сотрудники", to: "/app/employes", icon: Users },
  { label: "Договоры", to: "/app/contracts", icon: Briefcase },
  { label: "Отпуска", to: "/app/vacations", icon: Calendar },
  { label: "Командировки", to: "/app/trips", icon: Plane },
  { label: "Отчеты", to: "/app/reports", icon: ChartBar },
];

export default function Header() {
  const { data } = authClient.useSession();

  return (
    <div className="p-4 flex items-center justify-between border-b-2">
      <div className="flex items-center gap-2">
        <Link to="/app/home" className="font-black">
          АРМ «Отдел кадров»
        </Link>

        {navItems.map((item) => (
          <Button asChild variant="ghost">
            <Link
              to={item.to}
              activeProps={{
                className: buttonVariants({ variant: "secondary" }),
              }}
            >
              <item.icon />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>

      {data?.user ? (
        <div className="flex items-center">
          <div className="mr-2">{data.user.email}</div>
          <Button
            asChild
            onClick={() => {
              authClient.signOut({});
            }}
            variant="outline"
          >
            <Link to="/">Выйти</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-1">
          <Button asChild variant="outline">
            <Link to="/signup">Создать аккаунт</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">Войти</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
