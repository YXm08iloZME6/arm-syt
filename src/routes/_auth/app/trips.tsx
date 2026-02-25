import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/trips')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/app/trips"!</div>
}
