import "../tests_result.css";
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector3 from "../assets/images/Vector (3).jpg";
import Vector1 from "../assets/images/Vector (1).jpg";
import ReadinessScore from "../assets/images/Readiness score (1).jpg";
import Scientist from "../assets/images/scientist-4--science-technology-scientist.png";
import PriorityBarChart from "./colored_bar.jsx";
import axiosClient from "../axiosClient";
import React from "react";
import ArrowUp from "../assets/images/arrow-up.png";  
import ArrowDown from "../assets/images/arrow-down.png";

function TestsResult() {
  const [displayData, setDisplayData] = React.useState([]);

  React.useEffect(() => {
    axiosClient.get("/api/analysis-results/last-four").then((response) => {
      console.log(response.data);
      setDisplayData(response.data);
    });
  }, []);

  const safeGetIncreaseInPercent = (data, index, property) => {
    if (data.length <= index + 1) return "N/A";
    const original = data[index + 1][property];
    const newValue = data[index][property];
    if (original === 0) return "0%";
    const increase = newValue - original;
    const percentIncrease = (increase / original) * 100;
    return Math.abs(percentIncrease).toFixed(0) + "%";
  };

  return (
    <div className="tests_reslt_parent_container">
      <div className="tests_reslt_container2">
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
          <img src={Vector1} alt="foto" width="32px" height="37px" />
        </a>
        <br />
        <a href="/AnalysisCentre">
          <img src={ReadinessScore} alt="foto" width="32px" height="37px" />
        </a>
        <br />
      </div>
      <div className="tests_reslt_container">
        <span id="tests_reslt_form_heading">Test results</span>
        <br />
        <br />
        <div className="tests_reslt_main_div">
          <div className="tests_reslt_card4">
            <span id="tests_reslt_card_heading4">Previous Results</span>
            <div className="tests_reslt_span12">Net Carbon Emissions</div>
          </div>
          <div className="tests_reslt_random_main_div2">
            <div className="tests_reslt_card5">
              <span id="tests_reslt_card_heading5">Carbon Emitted</span>
              <br />
              <div className="tests_reslt_card01_content01">
                <span className="tests_reslt_span001">
                  {displayData.length > 0 ? displayData[0].co2Emitted : "N/A"}
                </span>
                <br />
                <span className="tests_reslt_span002">Metric Ton</span>
              </div>
              <br />
              <br />
              <div className="tests_reslt_randomest_div">
                <span>
                  {displayData.length > 1 && (
                    <>
                      {displayData[0].co2Emitted < displayData[1].co2Emitted ? (
                        <>
                          <img src={ArrowDown} alt="arrow down" style={{width: '20px', height: '20px', marginRight: '5px'}} />
                          <span className="percentage-down">
                            {safeGetIncreaseInPercent(displayData, 0, 'co2Emitted')}
                          </span>
                        </>
                      ) : (
                        <>
                          <img src={ArrowUp} alt="arrow up" style={{width: '20px', height: '20px', marginRight: '5px'}} />
                          <span className="percentage-up">
                            {safeGetIncreaseInPercent(displayData, 0, 'co2Emitted')}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="tests_reslt_card5">
              <span id="tests_reslt_card_heading5">Emission Per Capita</span>
              <br />
              <div className="tests_reslt_card01_content01">
                <span className="tests_reslt_span001">
                  {displayData.length > 0 ? displayData[0].emissionPerCapita : "N/A"}
                </span>
                <br />
                <span className="tests_reslt_span002">Metric Ton</span>
              </div>
              <br />
              <br />
              <div className="tests_reslt_randomest_div">
                <span>
                  {displayData.length > 1 && (
                    <>
                      {displayData[0].emissionPerCapita < displayData[1].emissionPerCapita ? (
                        <>
                          <img src={ArrowDown} alt="arrow down" style={{width: '20px', height: '20px', marginRight: '5px'}} />
                          <span className="percentage-down">
                            {safeGetIncreaseInPercent(displayData, 0, 'emissionPerCapita')}
                          </span>
                        </>
                      ) : (
                        <>
                          <img src={ArrowUp} alt="arrow up" style={{width: '20px', height: '20px', marginRight: '5px'}} />
                          <span className="percentage-up">
                            {safeGetIncreaseInPercent(displayData, 0, 'emissionPerCapita')}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="tests_reslt_card5">
              <span id="tests_reslt_card_heading5">Carbon Gap</span>
              <br />
              <div className="tests_reslt_card01_content01">
                <span className="tests_reslt_span001">
                  {displayData.length > 0 ? displayData[0].gap : "N/A"}
                </span>
                <br />
                <span className="tests_reslt_span002">Metric Ton</span>
              </div>
              <br />
              <br />
              <div className="tests_reslt_randomest_div">
                <span>
                  {displayData.length > 1 && (
                    <>
                      {displayData[0].gap < displayData[1].gap ? (
                        <>
                          <img src={ArrowDown} alt="arrow down" style={{width: '20px', height: '20px', marginRight: '5px'}} />
                          <span className="percentage-down">
                            {safeGetIncreaseInPercent(displayData, 0, 'gap')}
                          </span>
                        </>
                      ) : (
                        <>
                          <img src={ArrowUp} alt="arrow up" style={{width: '20px', height: '20px', marginRight: '5px'}} />
                          <span className="percentage-up">
                            {safeGetIncreaseInPercent(displayData, 0, 'gap')}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="tests_reslt_random44">
          <div className="tests_reslt_card3">
            <span id="tests_reslt_card_heading3">Emission Contributors</span>
            <div className="tests_reslt_span7">Last Test Results</div>
            <br />
            
            <div className="tests_reslt_user_bargraph3">
              <PriorityBarChart></PriorityBarChart>
            </div>
          </div>
          <div className="tests_reslt_random55">
            <br />
            <br />
            <img src={Scientist} alt="foto" />
            <span id="tests_reslt_random99">
              See Methods to Become Carbon Neutral
            </span>
            <span className="tests_reslt_treatmentPlanner_main_button">
              <a href="/AnalysisResults">See Solutions</a>
            </span>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default TestsResult;
