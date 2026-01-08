import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import LandingPage from './components/LandingPage.jsx';
import RoleSelection from './components/RoleSelection.jsx';
import FedexAdminDashboard from './components/fedex/FedexAdminDashboard.jsx';
import FedexViewSection from './components/fedex/FedexViewSection.jsx';
import FedexUpdateSection from './components/fedex/FedexUpdateSection.jsx';
import FedexDCAStatus from './components/fedex/FedexDCAStatus.jsx';

import DCAManagerDashboard from './components/dca/DCAManagerDashboard.jsx';
import DCAAlerts from './components/dca/DCAAlerts.jsx';
import DCACaseNotes from './components/dca/DCACaseNotes.jsx';

function App() {
  const [customerData, setCustomerData] = useState([]);

  // ✅ NEW: lifted state
  const [uploadedData, setUploadedData] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* FEDEX Admin */}
        <Route
          path="/fedex/dashboard"
          element={
            <FedexAdminDashboard
              customerData={customerData}
              setCustomerData={setCustomerData}
              uploadedData={uploadedData}
              setUploadedData={setUploadedData}
              uploadedFileName={uploadedFileName}
              setUploadedFileName={setUploadedFileName}
            />
          }
        />

        <Route
          path="/fedex/view"
          element={<FedexViewSection customerData={customerData} />}
        />

        <Route
          path="/fedex/update"
          element={
            <FedexUpdateSection
              customerData={customerData}
              setCustomerData={setCustomerData}
            />
          }
        />

        <Route path="/fedex/dca-status" element={<FedexDCAStatus />} />

        {/* DCA Manager */}
        <Route path="/dca/dashboard" element={<DCAManagerDashboard />} />
        <Route path="/dca/alerts" element={<DCAAlerts />} />
        <Route path="/dca/case-notes" element={<DCACaseNotes />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
