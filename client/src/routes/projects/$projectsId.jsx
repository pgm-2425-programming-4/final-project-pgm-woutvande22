import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchTasksByProjectId } from '../../data/fetchTaskByProject'
import { TaskCard } from '../../components/TaskCard/TaskCard'
import { useState } from 'react'
import { TaskSearchBar } from '../../components/TaskSearchBar';
import { fetchTags } from '../../data/fetchTags';
import { TagDropdown } from '../../components/TagDropdown';

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

  // Fetch all tags
  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(""); // Tag filter state

  const tasks = data?.data || [];
  const tags = tagsData?.data || [];

  // Filter tasks by search and selected tag
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = search
      ? (task.title || "").toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesTag = selectedTag
      ? task.tags && task.tags.some(tag => String(tag.id) === selectedTag)
      : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div>
      
      <div style={{ margin: "1rem 0" }}>
      <TaskSearchBar value={search} onChange={setSearch} />
      </div>
      <div style={{ margin: "1rem 0" }}>
        <TagDropdown
          tags={tags}
          value={selectedTag}
          onChange={setSelectedTag}
          placeholder="Filter by tag"
        />
      </div>
      <Link to="/projects/$projectsId/backlog" params={{ projectsId }}>
        Backlog
      </Link>
      {renderTaskCards(filteredTasks)}
    </div>
  );
}