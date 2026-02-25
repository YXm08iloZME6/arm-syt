import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto mt-4">
      <Outlet />
    </div>
  );
}
