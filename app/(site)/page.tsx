import LandingSection from "./landing-section";
import LandingClients from "./landing-clients";
import LandingFeatures from "./landing-feature";
import LandingTestimonials from "./landing-testimonials";
import LandingPricing from "./landing-pricing";

const HomePage = ({}) => {
  return (
    <>
      <LandingSection />
      <LandingClients />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingPricing />
    </>
  );
};

export default HomePage;
