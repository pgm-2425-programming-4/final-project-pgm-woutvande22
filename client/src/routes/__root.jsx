import * as React from "react";
import {
  Outlet,
  createRootRoute,
  Link,
  useRouter,
  useMatchRoute,
} from "@tanstack/react-router";
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
      (m) =>
        m.routeId === "/projects/$projectsId" ||
        m.routeId === "/projects_/$projectsId/backlog",
    )?.params?.projectId ||
    router.state.matches.find(
      (m) =>
        m.routeId === "/projects/$projectsId" ||
        m.routeId === "/projects_/$projectsId/backlog",
    )?.params?.projectsId;

  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="nav__link" to="/">
              About
            </Link>
          </li>
          {data?.data?.map((project) => {
            // Determine if this project link is active
            const isActive = String(project.id) === String(currentProjectId);

            return (
              <li key={project.id} className="nav__item">
                <Link
                  className="nav__link"
                  to="/projects/$projectsId"
                  params={{ projectsId: String(project.id) }}
                >
                  {project.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
