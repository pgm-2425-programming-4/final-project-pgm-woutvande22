import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="about">
      <h1 className="about__title">Wout's React Kanban board</h1>
      <p className="about__text">Welcome to my kanban board. </p>
      <p className="about__author">"Author Vanderbauwhede Wout"</p>
    </div>
  );
}
