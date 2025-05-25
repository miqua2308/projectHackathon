import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WalletConfig } from "./config/wallet";
import { WalletProvider } from "./contexts/WalletContext";
import HomePage from "./pages/HomePage";
import BrowseJob from "./pages/BrowseJob";
import CreateContract from "./pages/CreateContract";
import PostWork from "./pages/PostWork";
import ProfilePage from "./pages/ProfilePage";
import "./styles/index.css";
import AboutPage from "./pages/AboutPage";
import DisputeResolutionPage from "./pages/DisputeResolutionPage";

// import "@fortawesome/fontawesome-free/css/all.min.css";

const App: React.FC = () => {
  return (
    <WalletConfig>
      <WalletProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse-job" element={<BrowseJob />} />
              <Route path="/create-contract" element={<CreateContract />} />
              <Route path="/post-work" element={<PostWork />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/dispute-resolution/:jobId"
                element={<DisputeResolutionPage />}
              />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </WalletConfig>
  );
};

export default App;
