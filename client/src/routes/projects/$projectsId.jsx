import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTasksByProjectId } from "../../data/fetchTaskByProject";
import { fetchProjectsById } from "../../data/fetchProjectsById";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import { useState } from "react";
import { TaskSearchBar } from "../../components/TaskSearchBar";
import { fetchTags } from "../../data/fetchTags";
import { TagDropdown } from "../../components/TagDropdown";
import { AddTask } from "../../components/AddTask";

export const Route = createFileRoute("/projects/$projectsId")({
  component: RouteComponent,
});

function renderTaskCards(tasks) {
  const states = [
    {
      state: "todo",
      title: "To do",
      emptyText: "No todo tasks",
      className: "todo",
    },
    {
      state: "progress",
      title: "In progress",
      emptyText: "No tasks in progress",
      className: "progress",
    },
    {
      state: "review",
      title: "In Review",
      emptyText: "No tasks in review",
      className: "review",
    },
    {
      state: "done",
      title: "Done",
      emptyText: "No done tasks",
      className: "done",
    },
  ];

  return states.map(({ state, title, emptyText, className }) => (
    <TaskCard
      key={state}
      title={title}
      tasks={tasks.filter((task) => task.state === state)}
      emptyText={emptyText}
      className={className}
    />
  ));
}

function RouteComponent() {
  const { projectsId } = Route.useParams();

  // Fetch project by id
  const { data: projectData, isLoading: projectLoading } = useQuery({
    queryKey: ["project", projectsId],
    queryFn: () => fetchProjectsById(projectsId),
  });

  // Fetch tasks by project id
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
  const [selectedTag, setSelectedTag] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const tasks = data?.data || [];
  const tags = tagsData?.data || [];

  // Filter tasks based on search and selected tag
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = search
      ? (task.title || "").toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesTag = selectedTag
      ? task.tags && task.tags.some((tag) => String(tag.id) === selectedTag)
      : true;
    return matchesSearch && matchesTag;
  });

  // Get project title
  const projectTitle = projectData?.data?.[0]?.name;

  return (
    <div className="container">
      <div className="container__flex">
        {projectLoading ? (
          <h1 className="title is-2">Loading project...</h1>
        ) : (
          <h1 className="title is-2">{projectTitle}</h1>
        )}

        <TaskSearchBar value={search} onChange={setSearch} />

        <TagDropdown
          tags={tags}
          value={selectedTag}
          onChange={setSelectedTag}
          placeholder="All"
        />

        <Link
          className="button button--link"
          to="/projects/$projectsId/backlog"
          params={{ projectsId }}
        >
          Backlog
        </Link>
        <button
          className="button is-primary"
          style={{ marginBottom: "1rem" }}
          onClick={() => setShowAddModal(true)}
        >
          + Add Task
        </button>
      </div>
      {showAddModal && (
        <AddTask
          projectId={projectsId}
          tags={tags}
          onClose={() => setShowAddModal(false)}
        />
      )}
      <section className="task__card">{renderTaskCards(filteredTasks)}</section>
    </div>
  );
}
