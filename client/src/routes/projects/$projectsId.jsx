import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchTasksByProjectId } from '../../data/fetchTaskByProject'
import { TaskCard } from '../../components/TaskCard/TaskCard'

export const Route = createFileRoute('/projects/$projectsId')({
  component: RouteComponent,
})

function renderTaskCards(tasks) {
  const states = [
    { state: "todo", title: "To do", emptyText: "No todo tasks" },
    { state: "progress", title: "In progress", emptyText: "No tasks in progress" },
    { state: "review", title: "In Review", emptyText: "No tasks in review" },
    { state: "done", title: "Done", emptyText: "No done tasks" },
  ];
  console.log("Fetched tasks:", tasks);

  return states.map(({ state, title, emptyText }) => (
    <TaskCard
      key={state}
      title={title}
      tasks={tasks.filter((task) => task.state === state)}
      emptyText={emptyText}
    />
  ));
}

function RouteComponent() {
  const { projectsId } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["tasks", projectsId],
    queryFn: () => fetchTasksByProjectId(projectsId),
  });

  const tasks = data?.data || [];
  

  return (
    <div>
      <Link to="/projects/$projectsId/backlog" params={{ projectsId }}>
        Backlog
      </Link>
      {renderTaskCards(tasks)}
    </div>
  );
}