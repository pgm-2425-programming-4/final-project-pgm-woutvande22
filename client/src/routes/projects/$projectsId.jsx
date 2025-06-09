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

function RouteComponent() {
  const { projectsId } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["projects", projectsId],
    queryFn: () => fetchProjectsById(projectsId),
  });

  const project = data?.data?.[0];
  const tasks = project?.tasks || [];
  const todoTasks = tasks.filter((task) => task.state === "todo");
  const todoProgess = tasks.filter((task) => task.state === "progress");
  const todoReview = tasks.filter((task) => task.state === "review");
  const todoDone = tasks.filter((task) => task.state === "done");
  
  return (
    <div>
      <TaskCard title="To do" tasks={todoTasks} emptyText="No todo tasks" />
      <TaskCard title="In progress" tasks={todoProgess} emptyText="No tasks in progress" />
      <TaskCard title="In Review" tasks={todoReview} emptyText="No tasks in review" />
      <TaskCard title="Done" tasks={todoDone} emptyText="No todo tasks" />
    </div>
  );
}