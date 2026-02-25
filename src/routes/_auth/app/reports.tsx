import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/app/reports"!</div>
}
