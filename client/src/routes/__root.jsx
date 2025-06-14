import * as React from "react";
import { Outlet, createRootRoute, Link, useRouter, useMatchRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { fetchProjects } from "../data/fetchProjects.js";
import { useQuery } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const router = useRouter();
  const matchRoute = useMatchRoute();

  // Get the current projectId from the route params if available
  const currentProjectId =
    router.state.matches.find(
      (m) => m.routeId === "/projects/$projectsId" || m.routeId === "/projects_/$projectsId/backlog"
    )?.params?.projectId ||
    router.state.matches.find(
      (m) => m.routeId === "/projects/$projectsId" || m.routeId === "/projects_/$projectsId/backlog"
    )?.params?.projectsId;

  return (
    <>
      <div className="p-4 navbar">
        <ul>
          <li>
            <Link to="/">About</Link>
          </li>
          {data?.data?.map((project) => {
            // Determine if this project link is active
            const isActive =
              String(project.id) === String(currentProjectId);

            return (
              <li key={project.id}>
                <Link
                  to="/projects/$projectsId"
                  params={{ projectsId: String(project.id) }}
                  style={{
                    color: isActive ? "#3273dc" : undefined, // Bulma primary color
                    fontWeight: isActive ? "bold" : undefined,
                  }}
                >
                  {project.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
