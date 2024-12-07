import React, { useState } from 'react';
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
import "./active_bids.css";
import BidDetailsPage from "./table_activeBids";
import CarbonCreditCard from "./component_ActiveBids";
import GreenBackgroundLogo from './logo_activeBids';

interface Applicant {
  date: string;
  contractorName: string;
  status: boolean;
  id: string;
  credits: number;
  city: string;
}

interface Bid {
  _id: string;
  name: string;
  carbonCredits: number;
  price?: number;
  applicants: Applicant[];
}

const mockBids: Bid[] = [
  {
    _id: "mock123",
    name: "Sample Carbon Credit Bid",
    carbonCredits: 500,
    price: 10000,
    applicants: [
      { date: "2024-03-01", contractorName: "Green Corp", status: true, id: "app1", credits: 200, city: "Mumbai" },
      { date: "2024-03-02", contractorName: "Eco Solutions", status: false, id: "app2", credits: 150, city: "Delhi" },
      { date: "2024-03-03", contractorName: "Sustainable Future", status: true, id: "app3", credits: 150, city: "Bangalore" },
    ]
  },
  {
    _id: "bid123",
    name: "Green Energy Project",
    carbonCredits: 1000,
    applicants: [
      { date: "2024-03-01", contractorName: "Rajesh Kumar", status: true, id: "RK001", credits: 200, city: "Mumbai" },
      { date: "2024-03-02", contractorName: "Priya Patel", status: false, id: "PP002", credits: 150, city: "Delhi" },
      { date: "2024-03-03", contractorName: "Amit Singh", status: true, id: "AS003", credits: 300, city: "Bangalore" },
      { date: "2024-03-04", contractorName: "Sunita Sharma", status: true, id: "SS004", credits: 250, city: "Chennai" },
      { date: "2024-03-05", contractorName: "Vikram Mehta", status: false, id: "VM005", credits: 100, city: "Kolkata" },
    ]
  }
];

function ActiveBids() {
  const [bids, setBids] = useState<Bid[]>(mockBids);

  const addNewBid = (newBid: Omit<Bid, '_id' | 'applicants'>) => {
    const bidWithId: Bid = {
      ...newBid,
      _id: Date.now().toString(),
      applicants: []
    };
    setBids(prevBids => [...prevBids, bidWithId]);
  };

  const removeBid = (bidId: string) => {
    setBids(prevBids => prevBids.filter(bid => bid._id !== bidId));
  };

  const removeApplicant = (bidId: string, applicantId: string) => {
    setBids(prevBids => prevBids.map(bid => {
      if (bid._id === bidId) {
        return {
          ...bid,
          applicants: bid.applicants.filter(applicant => applicant.id !== applicantId)
        };
      }
      return bid;
    }));
  };

  return (
    <div className="activeBids_parent_container">
      <div className="activeBids_container2">
        <br />
        <a href="#">
          <img src={Logo} alt="foto" width="100px" height="37px" />
        </a>
        <br />
        <br />
        <a href="/UserLater">
          <img src={ResponsiveLayout} alt="foto" width="32px" height="37px" />
        </a>

        <br />
        <a href="/Wallet">
          <img src={Vector3} alt="foto" width="32px" height="37px" />
        </a>
        <br />
        <a href="/ActiveBids">
        <GreenBackgroundLogo></GreenBackgroundLogo>
        </a>
        <br />
        
        <br />
      </div>
      <div className="activeBids_container">
        <span className="activeBids_overview2">Active Bids</span>
        <br />
        <br />
        <BidDetailsPage 
          bids={bids} 
          onBidRemove={removeBid} 
          onApplicantRemove={removeApplicant}
        />
        <br />
        <br />
        <CarbonCreditCard onNewBid={addNewBid} />
      </div>
      <br /><br />
    </div>
  );
}

export default ActiveBids;