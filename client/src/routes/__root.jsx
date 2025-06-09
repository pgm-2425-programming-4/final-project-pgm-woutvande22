import * as React from "react";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
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

  return (
    <>
      <div className="p-4 navbar">
       
        {/* Project links in a list */}
        <ul>
          <li>
          <Link to="/">About</Link>
          </li>
          {data?.data?.map((project) => (
            <li key={project.id}>
              <Link
                to="/projects/$projectId"
                params={{ projectId: String(project.id) }}
              >
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
