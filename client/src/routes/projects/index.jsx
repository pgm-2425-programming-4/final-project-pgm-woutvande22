import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../../data/fetchProjects.js';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
})

function RouteComponent() {

  const {data} = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  })

  return <div>
    <ul>
      {data?.data?.map((project) => (
        <li key={project.id}>
          <Link to="/projects/$projectId" params={{ projectId: String(project.id)}}>{project.name}</Link>
        </li>
      ))}
    </ul>
  </div>
}
