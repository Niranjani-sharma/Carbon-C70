import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout.jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
// import Vector4 from "../assets/images/Vector (4).jpg";
// import ReadinessScore from "../assets/images/Readiness score.jpg";
import "./userLater.css";
import { CardUserLater } from "./card_userLater";
import { CardUserLater2 } from "./card_userLater2";
import CardUserLater3 from "./card_userLater3";
import CardUserLater4 from "./card_userLater9";
// import BidLandscape from '../assets/images/BidLandscape.jpg';
import BlackBackgroundLogo from './component_UserLater';

function userLater() {
  return (
    <div className="userLater_parent_container">
      <div className="userLater_container2">
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
          <img src={Vector3} alt="foto" width="32px" height="37px" />
        </a>
        <br />
        <a href="/ActiveBids">
        <BlackBackgroundLogo></BlackBackgroundLogo>
        </a>
        
        <br />
        <br />
      </div>
      <div className="userLater_container">
        <br />
        <span id="userLater_form_heading">User Dashboard</span>
        <br />
        <br />
        <br />
        <div className="userLater_card-container2">
          <CardUserLater2></CardUserLater2>
          <CardUserLater></CardUserLater>
        </div>
        <br />
        <br />
        <div className="userLater_card-container3">
          <CardUserLater3></CardUserLater3>
          <CardUserLater4></CardUserLater4>
        </div>
        
      </div>
    </div>
  );
}
export default userLater;

