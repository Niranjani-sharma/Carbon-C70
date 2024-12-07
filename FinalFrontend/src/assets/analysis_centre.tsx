import "../analysis.css";
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
import Vector1 from "../assets/images/Vector (1).jpg";
import ReadinessScore from "../assets/images/Readiness score (1).jpg";
import LabEquipment from "../assets/images/lab-equipment--science-technology-lab-equipment.jpg";
import React from "react";
import axiosClient from "../axiosClient";

function AnalysisCentre() {
  const [displayData, setDisplayData] = React.useState([]);

  React.useEffect(() => {
    axiosClient.get("/api/analysis-results/last-four").then((response) => {
      console.log(response.data);
      setDisplayData(response.data);
    });
  }, []);

  return (
    <div className="analysis_centre_parent_container">
      <div className="analysis_centre_container2">
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
          <img src={Vector3} alt="foto" width="32px" height="37px" />
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
      <div className="analysis_centre_container">
        <span id="analysis_centre_form_heading">Analysis Centre</span>
        <br />
        <br />
        <div className="analysis_centre_main_div">
          <div className="analysis_centre_card4">
            <span id="analysis_centre_card_heading4">Previous Results</span>
            <div className="analysis_centre_span12">Net Carbon Emissions</div>
          </div>
          <div className="analysis_centre_random_main_div2">
            <div className="analysis_centre_card5">
              <span id="analysis_centre_card_heading5">Carbon Emitted</span>
              <br />
              <div className="analysis_centre_card01_content01">
                <span className="analysis_centre_span001">
                  {displayData.length !== 0 && displayData[0].co2Emitted}
                </span>
                <br />
                <span className="analysis_centre_span002">Metric Tons</span>
              </div>
              <br />
              <br />
              <div className="analysis_centre_randomest_div">
                <span>12/08/2023</span>
              </div>
            </div>
            <div className="analysis_centre_card5">
              <span id="analysis_centre_card_heading5">Carbon Emitted</span>
              <br />
              <div className="analysis_centre_card01_content01">
                <span className="analysis_centre_span001">
                  {displayData.length !== 0 && displayData[1].co2Emitted}
                </span>
                <br />
                <span className="analysis_centre_span002">Metric Tons</span>
              </div>
              <br />
              <br />
              <div className="analysis_centre_randomest_div">
                <span>12/08/2023</span>
              </div>
            </div>
            <div className="analysis_centre_card5">
              <span id="analysis_centre_card_heading5">Carbon Emitted</span>
              <br />
              <div className="analysis_centre_card01_content01">
                <span className="analysis_centre_span001">
                  {displayData.length !== 0 && displayData[2].co2Emitted}
                </span>
                <br />
                <span className="analysis_centre_span002">Metric Tons</span>
              </div>
              <br />
              <br />
              <div className="analysis_centre_randomest_div">
                <span>12/08/2023</span>
              </div>
            </div>
            <div className="analysis_centre_card5">
              <span id="analysis_centre_card_heading5">Carbon Emitted</span>
              <br />
              <div className="analysis_centre_card01_content01">
                <span className="analysis_centre_span001">
                  {displayData.length !== 0 && displayData[3].co2Emitted}
                </span>
                <br />
                <span className="analysis_centre_span002">Metric Tons</span>
              </div>
              <br />
              <br />
              <div className="analysis_centre_randomest_div">
                <span>12/08/2023</span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="analysis_centre_duplicate_main_div">
          <br />
          <br />
          <img src={LabEquipment} alt="foto" />
          <span id="analysis_centre_random_span1">
            Carbon Footprint Analysis Test
          </span>
          <span id="analysis_centre_random_span2">
            Run a Carbon Emission Analysis Test
          </span>
          <span className="analysis_centre_treatmentPlanner_main_button">
            <a href="/Form1">Run Test</a>
          </span>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default AnalysisCentre;
