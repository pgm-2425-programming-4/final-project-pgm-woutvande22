import * as React from "react";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { fetchProjects } from "../data/fetchProjects.js"; 

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/">
          About
        </Link>{" "}
        <Link to="/projects">
          Projects
        </Link>{" "}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
