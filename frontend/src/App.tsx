import { Route, Routes } from "react-router-dom";
import {
  Index,
  VotePage,
  Callback,
  BlogsPage,
  SearchPage,
  EventsPage,
  DonatePage,
  NotFoundPage,
  BlogDetailPage,
  EventDetailsPage,
  EventCandidateDetailsPage,
} from "./pages";

import { Footer, ScrollToTop } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search/" element={<SearchPage />} />

        <Route path="/blogs/" element={<BlogsPage />} />
        <Route path="/blogs/:blogSlug/" element={<BlogDetailPage />} />
        {/* events */}
        <Route path="/events/" element={<EventsPage />} />
        <Route path="/events/:eventSlug/" element={<EventDetailsPage />} />
        <Route
          path="/events/:eventSlug/candidates/:candidateSlug/"
          element={<EventCandidateDetailsPage />}
        />

        <Route path="/vote/:eventSlug/:candidateSlug/" element={<VotePage />} />
        <Route path="/donate/" element={<DonatePage />} />
        <Route path="/callback/" element={<Callback />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
