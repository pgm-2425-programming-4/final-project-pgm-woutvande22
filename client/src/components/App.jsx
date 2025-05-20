import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { PaginatedBacklog } from "./PaginatedBacklog/backlog-list.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaginatedBacklog />
    </QueryClientProvider>
  );
}

export default App;
