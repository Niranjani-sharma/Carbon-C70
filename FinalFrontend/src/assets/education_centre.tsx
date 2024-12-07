

import "../education.css";
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
import Vector4 from "../assets/images/Vector (4).jpg";
import ReadinessScore from "../assets/images/Readiness score.jpg";
import Images from "../assets/images/image.jpg";
import Patte1 from "../assets/images/patte1.jpg";
import Patte2 from "../assets/images/patte2.jpg";
import Patte3 from "../assets/images/patte3.jpg";
import Patte4 from "../assets/images/patte4.jpg";
import Patte5 from "../assets/images/patte5.jpg";

function EducationCentre() {
  return (
    <div className="education_centre_parent_container">
      <div className="education_centre_container2">
        <br />
        <a href="#">
          <img src={Logo} alt="foto" width="100px" height="37px" />
        </a>
        <br />
        <br />
        <a href="/UserDashboard">
          <img src={ResponsiveLayout} alt="foto" width="32px" height="37px" />
        </a>

        <br />
        <a href="/TrackingCentre">
          <img src={Vector3} alt="foto" width="32px" height="37px" />
        </a>
        <br />
        <a href="/EducationCentre">
          <img src={Vector4} alt="foto" width="32px" height="37px" />
        </a>
        <br />
        <a href="/AnalysisCentre">
          <img src={ReadinessScore} alt="foto" width="32px" height="37px" />
        </a>
        <br />
      </div>
      <div className="education_centre_container">
        <span id="education_centre_form_heading">Education Centre</span>
        <br />
        <br />
        <div className="education_centre_main_div">
          <div className="education_centre_main_div2">
            <span className="education_centre_maindiv_heading">Blogs</span>
          </div>
          <div className="education_centre_card-container3">
            <div className="education_centre_random_div1">
              <div className="education_centre_card6">
                <a
                  href="https://medium.com/cansbridge-fellowship/plant-trees-thats-all-you-did-c43c30b472c0"
                  target="_blank"
                >
                  <img
                    src={Images}
                    alt="foto"
                    width="304.762px"
                    height="283.915px"
                  />
                </a>
                <div className="education_centre_card6_content6">
                  <span className="education_centre_span20">
                    Plant Trees, That's All You Did?
                  </span>
                  <span className="education_centre_span21">
                    Explore the personal journey of planting trees and the impact it can make.
                  </span>
                </div>
                <span className="education_centre_treatmentPlanner_main_button">
                  Afforestation
                </span>
              </div>
              <div className="education_centre_card6">
                <a
                  href="https://e-amrit.niti.gov.in/benefits-of-electric-vehicles"
                  target="_blank"
                >
                  <img
                    src={Patte1}
                    alt="foto"
                    width="304.762px"
                    height="283.915px"
                  />
                </a>
                <div className="education_centre_card6_content6">
                  <span className="education_centre_span20">
                    Benefits of Electric Vehicles
                  </span>
                  <span className="education_centre_span21">
                    The electric vehicle revolution is here, and you can be part of it.
                  </span>
                </div>
                <span className="education_centre_treatmentPlanner_main_button">
                  Clean Fuels
                </span>
              </div>
              <div className="education_centre_card6">
                <a
                  href="https://www.greenh2world.com/post/methane-capture-technology"
                  target="_blank"
                >
                  <img
                    src={Patte2}
                    alt="foto"
                    width="304.762px"
                    height="283.915px"
                  />
                </a>
                <div className="education_centre_card6_content6">
                  <span className="education_centre_span20">
                    About Methane Capture
                  </span>
                  <span className="education_centre_span21">
                    Know all about the Methane Capture Technology
                  </span>
                </div>
                <span className="education_centre_treatmentPlanner_main_button">
                  Methane Capture
                </span>
              </div>
            </div>
          </div>
          <br />
          
        </div>
        
        <br />
        <div className="education_centre_main_div">
          <div className="education_centre_main_div2">
            <span className="education_centre_maindiv_heading">Videos</span>
          </div>
          
          <div className="education_centre_random_div1">
            <div className="education_centre_card6">
              <a
                href="https://www.youtube.com/watch?v=tpD70a57v10"
                target="_blank"
              >
                <img
                  src={Patte3}
                  alt="foto"
                  width="304.762px"
                  height="283.915px"
                />
              </a>
              <div className="education_centre_card6_content6">
                <span className="education_centre_span20">How to Plant a Tree</span>
                <span className="education_centre_span21">
                A step-by-step video guide on planting a tree properly.
                </span>
              </div>
              <span className="education_centre_treatmentPlanner_main_button">
                Afforestation
              </span>
              <br />
            </div>
            <div className="education_centre_card6">
              <a
                href="https://youtu.be/UetkmReTrkk?si=zNLGl--xYe2xSnoN"
                target="_blank"
              >
                <img
                  src={Patte4}
                  alt="foto"
                  width="304.762px"
                  height="283.915px"
                />
              </a>
              <div className="education_centre_card6_content6">
                <span className="education_centre_span20">Methane Capture</span>
                <span className="education_centre_span21">
                  Know the right way to capture methane
                </span>
              </div>
              <span className="education_centre_treatmentPlanner_main_button">
                Methane Capture
              </span>
              <br />
            </div>
            <div className="education_centre_card6">
              <a
                href="https://youtu.be/rO6S93FKIUM?si=VaikBfjBbPkmaUBG"
                target="_blank"
              >
                <img
                  src={Patte5}
                  alt="foto"
                  width="304.762px"
                  height="283.915px"
                />
              </a>
              <div className="education_centre_card6_content6">
                <span className="education_centre_span20">Sustainable Mining</span>
                <span className="education_centre_span21">
                  Learn how to mine sustainably
                </span>
              </div>
              <span className="education_centre_treatmentPlanner_main_button">
                Sustainable Mining
              </span>
              <br />
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}
export default EducationCentre;
