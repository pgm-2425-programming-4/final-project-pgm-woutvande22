import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Backlog } from "./PaginatedBacklog/Backlog/Backlog";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        < Backlog/>
      </QueryClientProvider>
  );
}

export default App;
