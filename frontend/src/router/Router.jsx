import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import TeamPage from "../pages/TeamPage";
import TeamMemberPage from "../pages/TeamMemberPage";
import ProjectPage from "../pages/ProjectPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/team/:memberId" element={<TeamMemberPage />} />
      <Route path="/project" element={<ProjectPage />} />
    </Routes>
  );
}

export default Router;