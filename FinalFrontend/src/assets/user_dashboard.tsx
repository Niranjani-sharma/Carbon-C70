import "../user.css";
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout.jpg";
import Vector from "../assets/images/Vector.jpg";
import Vector1 from "../assets/images/Vector (1).jpg";
import ReadinessScore from "../assets/images/Readiness score.jpg";
// import Images from "../assets/images/Rectangle.jpg";
import Images1 from "../assets/images/Vector.png";
import Images2 from "../assets/images/Ellipse 2.jpg";
import Images3 from "../assets/images/calendar.jpg";
import GradientBarChart from "./bar_graph.jsx";
import GradientBarChart1 from "./bar_graph1.jsx";
import PriorityBarChart from "./colored_bar.jsx";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";

function UserDashboard() {
  const [user, setUser] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [trackingId, setTrackingId] = useState("");
  const [completed, setCompleted] = useState([]);

  const [analysisDisplayData, setAnalysisDisplayData] = useState([]);
  const [incompleteSolutions, setIncompleteSolutions] = useState([]);

  useEffect(() => {
    axiosClient.get("/api/analysis-results/last-four").then((response) => {
      console.log("WWWW", response.data);

      setAnalysisDisplayData(response.data);
    });
  }, []);
  useEffect(() => {
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

  useEffect(() => {
    const fetchUser = async () => {
      axiosClient.get("/api/auth/me").then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Fetch last three incomplete solutions
    axiosClient
      .get("/api/tracking-results/last-three-incomplete")
      .then((response) => {
        console.log("Received incomplete solutions:", response.data);
        setIncompleteSolutions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching incomplete solutions:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getIncreaseInPercent = (original, newValue) => {
    if (original === 0) return 0;
    const increase = newValue - original;
    const percentIncrease = (increase / original) * 100;
    return percentIncrease.toFixed(0);
  };
  const getIncreaseFromAvg = () => {
    if (!analysisDisplayData.length) return 0;
    console.log(analysisDisplayData);
    const avgOfLast =
      analysisDisplayData.reduce((acc, solution) => {
        return acc + solution.co2Emitted;
      }, 0) / analysisDisplayData.length;

    console.log(analysisDisplayData[analysisDisplayData.length - 1]);
    const valueOfLast =
      analysisDisplayData[analysisDisplayData.length - 1].co2Emitted;

    return getIncreaseInPercent(avgOfLast, valueOfLast);
  };

  // write a function to get the sum of net co2 emitted from the last 4 results
  // const getSumOfNetCo2Emitted = () => {
  //   return analysisDisplayData.reduce((acc, solution) => {
  //     return acc + solution.co2Emitted;
  //   }, 0);

  const profilePicture = `https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=128`;

  // Function to extract number and text from goal string
  const parseGoal = (goalString) => {
    if (!goalString) return { number: "", text: goalString };
    const match = goalString.match(/(\d+)\s*(.*)/);
    if (match) {
      return { number: match[1], text: match[2] };
    }
    return { number: "", text: goalString };
  };

  return (
    <div className="user_parent_container">
      <div className="user_container2">
        <br />
        <a href="#">
          <img src={Logo} alt="foto" width="100px" height="37px"></img>
        </a>
        <br />
        <br />
        <a href="/UserDashboard">
          <img src={ResponsiveLayout} alt="foto" width="32px" height="37px" />
        </a>

        <br />
        <a href="/TrackingCentre">
          <img src={Vector} alt="foto" width="32px" height="37px" />
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
      <div className="user_container">
        <div className="user_header">
          <div className="user_welcome">
            <div className="user_avatar">
              <img
                src={profilePicture}
                alt="foto"
                width="100px"
                height="100px"
              />
            </div>
            <div className="user_form_heading">
              <span>Welcome, {user.name}</span>
              <p>This is your CNeutral Dashboard</p>
            </div>
          </div>
          <div className="user_welcome2">
            <div className="user_image2">
              <a href="#">
                <img src={Images1} alt="foto" />
              </a>
            </div>
            <div className="user_image3">
              <a href="#">
                <img src={Images2} alt="foto" />
              </a>
            </div>
          </div>
        </div>
        <br />
        <span className="user_overview2">Carbon Stats</span>
        <br />
        <br />
        <div className="user_card-container2">
          <div className="user_card4">
            <span id="user_card_heading4">Carbon Emitted</span>
            <div className="user_card4_content4">
              <span className="user_span17">4200</span>
              <span className="user_span18">metric ton</span>
            </div>
            <div className="user_span12">in the past 5 tests</div>
            <div className="user_bargraph1">
              <GradientBarChart></GradientBarChart>
            </div>
          </div>
          <div className="user_card5">
            <span id="user_card_heading5">Carbon Saved</span>
            <div className="user_card4_content4">
              <span className="user_span17">100</span>
              <span className="user_span18">metric ton</span>
            </div>
            <div className="user_span15">using the last 5 tests</div>
            <div className="user_bargraph2">
              <GradientBarChart1></GradientBarChart1>
            </div>
          </div>
        </div>
        <br />
        <br />
        <span className="user_overview">Analysis</span>
        <br />
        <br />
        <div className="user_card-container">
          <div className="user_card1">
            <div className="user_card1_header">
              <span id="user_card_heading1">Analysis</span>
            </div>
            <div className="user_parent_content">
              <div className="user_card1_content1">
                <span className="user_span1">{analysisDisplayData.length}</span>
                <span className="user_span2">analysis done </span>
              </div>
            </div>
            <div className="user_span3">in past 5 months</div>
            <br />
            <br />
            {analysisDisplayData.map((analysis, index) => (
              <div className="user_div0" key={index}>
                <img src={Images3} alt="foto" className="user_vector" />
                <span className="user_name">Analysis Test {index} </span>
                <span className="user_date">
                  {
                    // parse analysis.date properly from 2024-09-09T10:07:27.084Z to 09/09/2024
                    new Date(analysis.date).toLocaleDateString()
                  }
                </span>
              </div>
            ))}
          </div>
          <div className="user_card5">
            <span id="user_card_heading5">Analysis Centre</span>
            <div className="user_span15">Results of Last Test Run</div>
            <br />
            <br />
            <div className="user_card01_content01">
              <span className="user_span001">
                {getIncreaseFromAvg()}
                <span className="user_in_span">
                  {getIncreaseFromAvg() >= 0 ? "%" : "% "}
                </span>
              </span>
              <br />
              <br />
              <span className="user_span002">
                {getIncreaseFromAvg() >= 0
                  ? "more carbon emission than average"
                  : "less carbon emission than average"}
              </span>
            </div>
          </div>
          <div className="user_card3">
            <span id="user_card_heading3">Emission Contributors</span>
            <div className="user_span7">Last Test Results</div>
            <div className="user_bargraph3">
              <PriorityBarChart></PriorityBarChart>
            </div>
          </div>
        </div>
        <br />
        <br />
        <span className="user_overview3">Progress</span>
        <br />
        <br />
        <div className="user_card-container3">
          {incompleteSolutions.map((solution, index) => {
            const { number, text } = parseGoal(solution.goal);
            return (
              <div className="user_card6" key={index}>
                <div className="user_card1_header">
                  <span id="user_card_heading6">{solution.name}</span>
                </div>
                <div className="user_card6_content6">
                  <span className="user_span20">{number}</span>
                  <span className="user_span21 overflow-">{text}</span>
                </div>

                <div className="user_subdiv12">
                  <span className="user_disease">progress</span>

                  <div className="user_create_div1">
                    <div
                      className="user_create_div2"
                      style={{ width: `${solution.progress}%` }}
                    ></div>
                  </div>
                  <span className="user_percentage">{solution.progress}%</span>
                </div>
                <p className="user_class_end">{solution.description}</p>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default UserDashboard;
