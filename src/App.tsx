import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { WorkflowApp } from './components/WorkflowApp';
import { SettingsLayout } from './layouts/SettingsLayout';
import { WebflowIntegration } from './pages/WebflowIntegration';
import { UsageBilling } from './pages/UsageBilling';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Pricing } from './pages/Pricing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<WorkflowApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="webflow" element={<WebflowIntegration />} />
          <Route path="usage" element={<UsageBilling />} />
          <Route path="account" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;