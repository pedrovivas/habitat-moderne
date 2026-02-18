import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./HomePage";
import ListingsPage from "./ListingPage";
import ApartmentDetails from "./ApartmentDetails";
import ContactUs from "./ContactUs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/appartements" element={<ListingsPage />} />
          <Route path="/appartement/:id" element={<ApartmentDetails />} />
          <Route path="/nous-rejoindre" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
