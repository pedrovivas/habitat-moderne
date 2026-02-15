import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListingsPage from "./ListingPage";
import ApartmentDetails from "./ApartmentDetails";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router"

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
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/apartment/:id" element={<ApartmentDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
