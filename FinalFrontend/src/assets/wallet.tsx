import React, { useState } from 'react'; // Add this import
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector2 from "../assets/images/Vector (2).jpg";
// import Vector4 from "../assets/images/Vector (4).jpg";
// import ReadinessScore from "../assets/images/Readiness score.jpg";
import "./wallet.css";
import { CardWallet } from "./card_wallet";
import DynamicDataTable from "./table_wallet";
import { Graph } from "./graph_table";
import RedeemCreditsCard from "./cardWallet2";
// import BidLandscape from '../assets/images/BidLandscape.jpg';
import { CardWallet2 } from "./card_wallet2";
import BlackBackgroundLogo from './component_UserLater';
import TransactionFilter from './transaction_filter';
import TablePage from "./table_wallet";

function Wallet() {
  const [sortOption, setSortOption] = useState<string>('');

  const handleFilterChange = (filterOption: string) => {
    setSortOption(filterOption);
  };

  return (
    <div className="wallet_parent_container">
      <div className="wallet_container2">
        <br />
        <a href="#">
          <img src={Logo} alt="foto" width="100px" height="37px" />
        </a>
        <br />
        <br />
        <a href="/userLater">
          <img src={ResponsiveLayout} alt="foto" width="32px" height="37px" />
        </a>

        <br />
        <a href="/Wallet">
        <img
         src={Vector2}
         alt="foto"
         width="32px"
         height="37px"
       />
        </a>
        <br />
        <a href="/ActiveBids"><BlackBackgroundLogo></BlackBackgroundLogo></a>
        
        <br />
        <br />
      </div>
      <div className="wallet_container">
        <span className="wallet_overview2">Wallet</span>
        <br />
        <br />
        <div className="wallet_card-container2">
          <CardWallet></CardWallet>
          <CardWallet2></CardWallet2>
          <RedeemCreditsCard></RedeemCreditsCard>
        </div>
        <br />
        <br />
        <span className="wallet_overview">Analysis</span>
        <br />
        <br />
        <div className="wallet_div2">
        <div className="mb-6"> {/* Add this wrapper div with margin-bottom */}
        <TransactionFilter onFilterChange={handleFilterChange} />
        </div>
      
          <TablePage sortOption={sortOption} />
          <br /><br />
          <Graph></Graph>
        </div>
        <br /><br /><br />
      </div>
    </div>
  );
}
export default Wallet;
