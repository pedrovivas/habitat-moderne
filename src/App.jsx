import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListingsPage from "./ListingPage";
import Navbar from "./Navbar";

// Initialize the Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      retry: 2,
    },
  },
});

// Root Wrapper
const App = () => (
  <QueryClientProvider client={queryClient}>
    <Navbar />
    <ListingsPage />
  </QueryClientProvider>
);

export default App;
