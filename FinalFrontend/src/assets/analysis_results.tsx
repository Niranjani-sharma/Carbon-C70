import "../analysis_results.css";
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
import Vector1 from "../assets/images/Vector (1).jpg";
import ReadinessScore from "../assets/images/Readiness score (1).jpg";
import Images from "../assets/images/image (2).jpg";
import React from "react";
import axiosClient from "../axiosClient";
import EnvironmentalImpactGrid from "./component_AnalysisResults";

function AnalysisResults() {
  const [displayData, setDisplayData] = React.useState([]);
  const [trackingId, setTrackingId] = React.useState("");

  React.useEffect(() => {
    axiosClient.get("/api/tracking-results/last").then((response) => {
      console.log(response.data);
      setDisplayData(response.data.solutions);
      setTrackingId(response.data._id);
    });
  }, []);

  const trackMethod = async (solutionID) => {
    try {
      const response = await axiosClient.put(
        `/api/tracking-results/${trackingId}`,
        {
          trackingID: trackingId,
          solutionID: solutionID,
          updatedData: { chosen: true },
        }
      );

      // refresh the page
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error tracking method:", error);
    }
  };

  return (
    <div className="analysis_results_parent_container">
      <div className="analysis_results_container2">
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
        <a href="">
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
      <div className="analysis_results_container">
        <span id="analysis_results_form_heading">Recommended Solutions</span>
        <br />
        <br />
        <EnvironmentalImpactGrid ></EnvironmentalImpactGrid>
        <div className="analysis_results_main_div">
          <div className="analysis_results_main_div2">
            <span className="analysis_results_maindiv_heading">Solutions</span>
            <span className="analysis_results_maindiv_para">
              Check the Tracking Screen once you have added these methods.
            </span>
          </div>
          <div
            className="analysis_results_card-container3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "50px",
            }}
          >
            {displayData.map((solution, index) => (
              <div key={index} className="analysis_results_card6">
                <div className="analysis_results_card1_header">
                  <img src={Images} alt="foto" height="36px" width="36px" />
                  <br />
                  <span id="analysis_results_card_heading6">
                    {index + 1}. {solution.name}
                  </span>
                </div>
                <div className="analysis_results_card6_content6">
                  <span className="analysis_results_span20">Goal:</span>
                  <span className="analysis_results_span21">
                    {solution.name}
                  </span>
                </div>
                <div className="analysis_results_card6_content6">
                  <span className="analysis_results_span20">Est. Cost:</span>
                  <span className="analysis_results_span21">
                    {solution.estimatedCost} INR
                  </span>
                </div>
                <div>
                  <span className="analysis_results_span20">
                    Carbon offset:
                  </span>
                  <span className="analysis_results_span21">
                    {solution.carbonOffset} metric ton
                  </span>
                </div>
                <p className="analysis_results_class_end">
                  {solution.description}
                </p>
                <span className="analysis_results_treatmentPlanner_main_button">
                  <a
                    href="#"
                    onClick={() => trackMethod(solution._id)}
                    style={{
                      // backgroundColor: solution.chosen ? "grey" : "",
                      pointerEvents: solution.chosen ? "none" : "",
                    }}
                  >
                    {solution.chosen
                      ? "Method already tracked"
                      : "Track this method"}
                  </a>
                </span>
                <br />
              </div>
            ))}
          </div>
          <br />
          <br />
          <span id="analysis_results_random69">
            *1,2,3,4 denote the ranking of the solutions which we think will
            work best for you.
          </span>
          <br />
        </div>
      </div>
    </div>
  );
}
export default AnalysisResults;
