// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AnalysisCentre from './assets/analysis_centre';
import AnalysisResults from './assets/analysis_results';
import Login from './assets/login';
import EducationCentre from './assets/education_centre';
import TestsResult from './assets/tests_result';
import TrackingCentre from './assets/tracking_centre';
import UpdateForm from './assets/update_form';
import UserDashboard from './assets/user_dashboard';
import Form1 from './assets/form1';
import Marketplace from './assets/Marketplace';
import ActiveBids from './assets/active_bids';
import CompanyForm from './assets/companyForm';
import Transaction from './assets/transaction';
import UserLater from './assets/userLater';
import Wallet from './assets/wallet';
import RedeemPlace from './assets/redeemPlace';
import CompanyLoginPage from './assets/company_loginPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/AnalysisCentre" element={<AnalysisCentre />} />
        <Route path="/AnalysisResults" element={<AnalysisResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/EducationCentre" element={<EducationCentre />} />
        <Route path="/TestsResult" element={<TestsResult />} />
        <Route path="/TrackingCentre" element={<TrackingCentre />} />
        <Route path="/UpdateForm" element={<UpdateForm />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/Form1" element={<Form1 />} />
        <Route path="/Marketplace" element={<Marketplace />} />
        <Route path="/ActiveBids" element={<ActiveBids />} />
        <Route path="/CompanyForm" element={<CompanyForm />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/UserLater" element={<UserLater />} />
        <Route path="/Wallet" element={<Wallet />} />
        <Route path="/RedeemPlace" element={<RedeemPlace />} />
        <Route path="/CompanyLoginPage" element={<CompanyLoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
