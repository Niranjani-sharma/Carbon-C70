import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector2 from "../assets/images/Vector (2).jpg";
import Vector1 from "../assets/images/Vector (1).jpg";
import ReadinessScore from "../assets/images/Readiness score.jpg";
import Ellipse3 from "../assets/images/Ellipse 3.jpg";
import "./companyForm.css";

function companyForm() {
  return (
    <div className="companyForm_parent_container">
      <div className="companyForm_container2">
        <br />
        <a href="#">
          <img src={Logo} alt="foto" width="120px" height="37px" />
        </a>
        <br />
        <br />
        <a href="/UserDashboard">
          <img src={ResponsiveLayout} alt="foto" width="32px" height="37px" />
        </a>

        <br />
        <a href="/TrackingCentre">
          <img src={Vector2} alt="foto" width="32px" height="37px" />
        </a>
        <br />
        <a href="/EducationCentre">
          <img src={Vector1} alt="foto" width="32px" height="37px" />
        </a>
        <br />
        <a href="/AnalysisCentre">
          <img src={ReadinessScore} alt="foto" width="32px" height="37px" />
        </a>
        <br />
      </div>
      <div className="companyForm_main_container">
        <span id="companyForm_form_span">Company Bid Form</span>
        <br />
        <br />
        <div className="companyForm_container">
          <div className="companyForm_parent_div2">
            <div className="companyForm_div2">
              <span className="companyForm_subdiv2">
                Company Name <span id="companyForm_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="10px" width="15px" />
              </span>
              <div className="companyForm_login_subdiv2">
                <input type="text" form="UserId" id="companyForm_login_text" />
              </div>
            </div>
            <div className="companyForm_div2">
              <span className="companyForm_subdiv2">
                Number of Credits Needed{" "}
                <span id="companyForm_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="10px" width="15px" />
              </span>
              <div className="companyForm_login_subdiv2">
                <input
                  type="number"
                  min="0"
                  form="UserId"
                  id="companyForm_login_text"
                />
              </div>
            </div>
            <div className="companyForm_div2">
              <span className="companyForm_subdiv2">
                Company Verification Id{" "}
                <span id="companyForm_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="10px" width="15px" />
              </span>
              <div className="companyForm_login_subdiv2">
                <input type="text" form="UserId" id="companyForm_login_text" />
              </div>
              <br /><br />
              <span
                className="companyForm_treatmentPlanner_main_button"
                // onClick={handleSubmit}
              >
                <a>Submit</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default companyForm;
