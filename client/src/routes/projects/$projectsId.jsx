import { createFileRoute} from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchProjectsById } from '../../data/fetchProjectsById'

export const Route = createFileRoute('/projects/$projectsId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectsId } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["projects", projectsId],
    queryFn: () => fetchProjectsById(projectsId),
  });

  const project = data?.data?.[0];
  const tasks = project?.tasks || [];

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}