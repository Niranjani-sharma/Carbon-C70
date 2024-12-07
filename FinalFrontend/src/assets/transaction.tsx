import React, { useState } from 'react';
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
import Vector4 from "../assets/images/Vector (4).jpg";
import ReadinessScore from "../assets/images/Readiness score.jpg";
import TransactionFilter from './transaction_filter';
// import DynamicDataTable from "./table_wallet";
import TablePage from "./table_transaction";
import "./transaction.css";


function Transaction() {
  const [sortOption, setSortOption] = useState<string>('');

  const handleFilterChange = (filterOption: string) => {
    setSortOption(filterOption);
  };

  return (
  <div className="transaction_parent_container">
    <div className="transaction_container2">
       <br />
       <a href="#"><img src={Logo} alt="foto" width="100px" height="37px" /></a>
       <br /><br />
       <a href="/UserDashboard"><img
         src={ResponsiveLayout}
         alt="foto"
         width="32px"
         height="37px"
       /></a>
 
       <br />
       <a href="/TrackingCentre"><img
         src={Vector3}
         alt="foto"
         width="32px"
         height="37px"
       /></a>
       <br />
       <a href="/EducationCentre"><img
         src={Vector4}
         alt="foto"
         width="32px"
         height="37px"
       /></a>
       <br />
       <a href="/AnalysisCentre"><img
         src={ReadinessScore}
         alt="foto"
         width="32px"
         height="37px"
       /></a>
       <br />
    </div>
    <div className="transaction_container">
       <br />
       <span id="transaction_form_heading">Transactions</span>
       <br /><br /><br />
        <TransactionFilter onFilterChange={handleFilterChange} />
        <br /><br />
        <TablePage sortOption={sortOption} />
        <br /><br />
      </div>
  </div>
  );
}
export default Transaction;