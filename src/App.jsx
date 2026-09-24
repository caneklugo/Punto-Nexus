import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";

// Views
import HomeView from "./views/HomeView";
import ExploreView from "./views/ExploreView";
import OpportunityDetail from "./views/OpportunityDetail";
import UserDashboard from "./views/UserDashboard";
import ResourcesView from "./views/ResourcesView";
import AdminCMS from "./views/AdminCMS";

function MainContent() {
  const { currentRoute } = useApp();

  // Route selector
  const renderCurrentRoute = () => {
    if (currentRoute === "/") {
      return <HomeView />;
    }
    if (currentRoute === "/explorar") {
      return <ExploreView />;
    }
    if (currentRoute === "/oportunidad/:id" || currentRoute.startsWith("/oportunidad/")) {
      return <OpportunityDetail />;
    }
    if (currentRoute === "/mi-tablero") {
      return <UserDashboard />;
    }
    if (currentRoute === "/recursos") {
      return <ResourcesView />;
    }
    if (currentRoute === "/admin") {
      return <AdminCMS />;
    }
    return <HomeView />;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {renderCurrentRoute()}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
