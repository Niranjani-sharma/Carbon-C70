import "../tracking_centre.css";
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector2 from "../assets/images/Vector (2).jpg";
import Vector1 from "../assets/images/Vector (1).jpg";
import ReadinessScore from "../assets/images/Readiness score.jpg";
import React from "react";
import axiosClient from "../axiosClient";

function TrackingCentre() {
  const [displayData, setDisplayData] = React.useState([]);
  const [trackingId, setTrackingId] = React.useState("");
  const [completed, setCompleted] = React.useState([]);

  React.useEffect(() => {
    axiosClient.get("/api/tracking-results/last").then((response) => {
      console.log(response.data);
      const solutions = response.data.solutions;
      const solutionsWithChosenTrue = solutions.filter(
        (solution) => solution.chosen === true
      );

      const solutionsWithProgressCompleted = solutionsWithChosenTrue.filter(
        (solution) => solution.progress === 100
      );

      setCompleted(solutionsWithProgressCompleted);

      setDisplayData(solutionsWithChosenTrue);
      setTrackingId(response.data._id);
    });
  }, []);

  return (
    <div className="tracking_centre_parent_container">
      <div className="tracking_centre_container2">
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
      <div className="tracking_centre_container">
        <span id="tracking_centre_form_heading">Tracking Centre</span>
        <br />
        <br />
        <div className="tracking_centre_main_div">
          <div className="tracking_centre_main_div2">
            <span className="tracking_centre_maindiv_heading">Progress</span>
          </div>
          <div className="tracking_centre_card-container3">
            {displayData.map((solution, index) => (
              <div key={index} className="tracking_centre_card6">
                <div className="tracking_centre_card1_header">
                  <span id="tracking_centre_card_heading6">
                    {solution.name}
                  </span>
                </div>
                <div className="tracking_centre_card6_content6">
                  <span className="tracking_centre_span20">
                    {solution.progress}%
                  </span>
                  <span className="tracking_centre_span21">
                    {solution.unit}
                  </span>
                </div>
                <div className="tracking_centre_subdiv12">
                  <span className="tracking_centre_disease">Progress</span>
                  <div className="tracking_centre_create_div1">
                    <div
                      className="tracking_centre_create_div2"
                      style={{ width: `${solution.percentage}%` }} // Dynamic progress bar
                    ></div>
                  </div>
                  <span className="tracking_centre_percentage">
                    {solution.percentage}
                  </span>
                </div>
                <p className="tracking_centre_className_end">
                  {solution.description}
                </p>
                <br />
              </div>
            ))}
          </div>
          <br />
          <br />
          <span className="tracking_centre_treatmentPlanner_main_button">
            <a href="/UpdateForm">Update Progress</a>
          </span>
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className="tracking_centre_main_div">
          <div className="tracking_centre_main_div2">
            <span className="tracking_centre_maindiv_heading">
              Hall of Fame
            </span>
          </div>
          <br />
          <div className="tracking_centre_random_main_div2">
            <div className="tracking_centre_card5">
              <span id="tracking_centre_card_heading5">Analysis Centre</span>
              <br />
              <br />
              <div className="tracking_centre_card01_content01">
                <span className="tracking_centre_span001">
                  {completed.length}
                  <span className="tracking_centre_in_span">+</span>
                </span>
                <br />
                <span className="tracking_centre_span002">
                  steps taken to reduce carbon emission.
                </span>
              </div>
            </div>
            <div className="tracking_centre_card5">
              <span id="tracking_centre_card_heading5">
                Carbon Credits Earned
              </span>
              <br />
              <div className="tracking_centre_card01_content01">
                <span className="tracking_centre_span001">
                  {
                    // sum the carbonCredits of all completed solutions
                    completed.reduce(
                      (acc, solution) => acc + (solution.carbonCredits || 0),
                      0
                    )
                  }
                  <span className="tracking_centre_in_span"></span>
                </span>
                <br />
                <span className="tracking_centre_span002">
                  credits earned till date
                </span>
                <br />
                <br />
                <span className="tracking_centre_treatmentPlanner_main_button">
                  <a href="/MarketPlace">Redeem Now</a>
                </span>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingCentre;
