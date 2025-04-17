import {
  Navbar,
  Hero,
  AboutUs,
  BlogPosts,
  EventPosts,
  ContactUs,
} from "@/components";
import Header from "@/components/Header";

import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Home | PCN</title>
        <meta
          name="description"
          content="Read impactful stories and updates from Prosfygas Christian Network."
        />
        <link rel="canonical" href="https://yourdomain.com/blog" />
      </Helmet>

      <Navbar />
      <Hero />

      <Header />

      <AboutUs />

      <BlogPosts />
      <EventPosts />
      <ContactUs />
    </>
  );
};

export default Index;
