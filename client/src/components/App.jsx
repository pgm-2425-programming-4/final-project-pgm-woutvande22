import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { PaginatedBacklog } from "./paginatedbacklog/backlog-list.jsx";
import { Backlog } from "./backlog/backlog.jsx";
import { Pagination } from "./pagination/pagination.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaginatedBacklog />
    </QueryClientProvider>
  );
}

export default App;
