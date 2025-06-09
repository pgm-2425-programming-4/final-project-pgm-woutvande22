import { createFileRoute } from '@tanstack/react-router'
import { PaginatedBacklog } from "../../../components/PaginatedBacklog/backlog-list";

export const Route = createFileRoute('/projects_/$projectsId/backlog')({
  component: RouteComponent,
})

function RouteComponent() {
 return (
       <PaginatedBacklog />
   );
}
