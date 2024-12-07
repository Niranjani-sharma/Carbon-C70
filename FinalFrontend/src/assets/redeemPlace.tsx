import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector2 from "../assets/images/Vector (2).jpg";
import BlackBackgroundLogo from './component_UserLater';
// import CustomCard from './card_marketplace';
import "./redeem_place.css";
import CardRedeemPlace from './card_redeemPlace';

function Redeemplace() {
  return (
    <div className="Redeemplace_parent_container">
      <div className="Redeemplace_container2">
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
      <div className="Redeemplace_container">
      <div className="Redeemplace_card-container2">
      {/* <CustomCard></CustomCard> */}
      <CardRedeemPlace></CardRedeemPlace>
      </div>
      </div>
      
    </div>
  )
}
export default Redeemplace;