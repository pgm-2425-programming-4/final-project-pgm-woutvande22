import { createFileRoute} from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchProjectsById } from '../../data/fetchProjectsById'

export const Route = createFileRoute('/projects/$projectsId')({
  component: RouteComponent,
})

function TaskCard({ title, tasks, emptyText }) {
  return (
    <div className='card has-background-primary has-text-primary-00'>
      <h2 className='is-size-3'>{title}</h2>
      <div>
        {tasks.length === 0
          ? <span>{emptyText}</span>
          : tasks.map((task) => (
              <div key={task.id}>{task.title}</div>
            ))}
      </div>
    </div>
  );
}

function renderTaskCards(tasks) {
  const states = [
    { state: "todo", title: "To do", emptyText: "No todo tasks" },
    { state: "progress", title: "In progress", emptyText: "No tasks in progress" },
    { state: "review", title: "In Review", emptyText: "No tasks in review" },
    { state: "done", title: "Done", emptyText: "No done tasks" },
  ];

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
    queryKey: ["projects", projectsId],
    queryFn: () => fetchProjectsById(projectsId),
  });

  const project = data?.data?.[0];
  const tasks = project?.tasks || [];

  return (
    <div>
      {renderTaskCards(tasks)}
    </div>
  );
}