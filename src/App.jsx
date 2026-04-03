import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router";
import HomePage from "./HomePage";
import ListingsPage from "./ListingPage";
import ApartmentDetails from "./ApartmentDetails";
import ContactUs from "./ContactUs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddApartmentPage from "./AddApartmentPage";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import EditApartmentPage from "./EditApartmentPage";
import PrivacyPolicy from "./PrivacyPolicy";
import NotFound from "./NotFound";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Navbar />

        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appartements" element={<ListingsPage />} />
          <Route path="/appartement/:id" element={<ApartmentDetails />} />
          <Route
            path="/modifier-appartement/:id"
            element={<EditApartmentPage />}
          />
          <Route path="/nous-joindre" element={<ContactUs />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/politique-de-confidentialite"
            element={<PrivacyPolicy />}
          />
          <Route
            path="/ajouter-appartement"
            element={
              <ProtectedRoute>
                <AddApartmentPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </QueryClientProvider>
  );
}