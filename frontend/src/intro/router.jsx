import { Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TeamPage from "./pages/TeamPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import ProjectPage from "./pages/ProjectPage";

const IntroRoutes = (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/team" element={<TeamPage />} />
    <Route path="/team/:memberId" element={<TeamMemberPage />} />
    <Route path="/project" element={<ProjectPage />} />
  </>
);

export default IntroRoutes;