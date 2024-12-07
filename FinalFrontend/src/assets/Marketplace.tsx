import React, { useState, useEffect } from 'react';
import './Marketplace.css'
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
import Vector4 from "../assets/images/Vector (4).jpg";
import ReadinessScore from "../assets/images/Readiness score.jpg";
import UiFilter from './filter';
import CustomCard from './card_marketplace';
import Group146 from '../assets/images/Group 146.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import logo images
import NikeLogo from '../assets/images/nike.png';
import PumaLogo from '../assets/images/puma.png';
import AdidasLogo from '../assets/images/adidas.png';

interface CardData {
  id: number;
  title: string;
  credits: number;
  image: string;
}

function Marketplace(){
  const [cards, setCards] = useState<CardData[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  useEffect(() => {
    const mockData: CardData[] = [
      { id: 1, title: "Nike", credits: 100, image: NikeLogo },
      { id: 2, title: "Puma", credits: 200, image: PumaLogo },
      { id: 3, title: "Adidas", credits: 150, image: AdidasLogo },
      // Add more mock data as needed
    ];
    setCards(mockData);
    setFilteredCards(mockData);
  }, []);

  const handleFilterChange = (filterOption: string) => {
    let filtered = [...cards];
    switch (filterOption) {
      case 'ascending':
        filtered.sort((a, b) => a.credits - b.credits);
        break;
      case 'descending':
        filtered.sort((a, b) => b.credits - a.credits);
        break;
      case 'required_credits':
        filtered = filtered.filter(card => card.credits <= 100);
        break;
      default:
        // No filtering, reset to original cards
        filtered = [...cards];
        break;
    }
    setFilteredCards(filtered);
  };

  return (
   <div className="marketplace_parent_container">
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
     <div className="marketplace_container2">
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
     <div className="marketplace_container">
       <br />
       <span id="marketplace_form_heading">Marketplace</span>
       <br /><br /><br />
       <UiFilter onFilterChange={handleFilterChange}></UiFilter>
       <br /><br />
       <div className="marketplace_card-container2">
         {filteredCards.map(card => (
           <CustomCard
             key={card.id}
             title={card.title}
             credits={card.credits}
             image={card.image}
           />
         ))}
       </div>
       <br /><br />
       <div className="marketplace_link">
         <a href="/Transaction"><span>View Past Applications</span></a>
         <a href="/Transaction"><img src={Group146} alt="foto" width="18px" height="18px" /></a>
       </div>
     </div>
   </div>
  )
}

export default Marketplace;
