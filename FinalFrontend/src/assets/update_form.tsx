import "../update.css";
import Logo from "../assets/images/Logo.jpg";
import ResponsiveLayout from "../assets/images/Responsive layout (1).jpg";
import Vector2 from "../assets/images/Vector (2).jpg";
import Vector1 from "../assets/images/Vector (1).jpg";
import ReadinessScore from "../assets/images/Readiness score.jpg";
import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

function UpdateForm() {
  const [displayData, setDisplayData] = useState([]);
  const [updates, setUpdates] = useState({});
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get("/api/tracking-results/last").then((response) => {
      const solutions = response.data.solutions.filter(
        (solution) => solution.progress < 100 // Filter out solutions whose progress is not 100%
      );
      console.log(solutions);
      setDisplayData(solutions);
      setTrackingId(response.data._id); // Save the tracking ID for the update call
    });
  }, []);

  // Function to handle input changes and store updates in state
  const handleInputChange = (solutionId, value) => {
    setUpdates((prevUpdates) => ({
      ...prevUpdates,
      [solutionId]: value,
    }));
  };

  // Function to submit the form
  const handleSubmit = async () => {
    try {
      const updatePromises = Object.keys(updates).map((solutionID) =>
        axiosClient.put(`/api/tracking-results/${trackingId}`, {
          trackingID: trackingId,
          solutionID,
          updatedData: { progress: updates[solutionID] }, // assuming the "progress" field is being updated
        })
      );

      // Wait for all the update requests to complete
      const results = await Promise.all(updatePromises);
      console.log("Progress updated successfully:", results);

      // Show alert
      alert("Details updated successfully!");

      // Navigate to TrackingCentre
      navigate("/TrackingCentre");
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Error updating progress. Please try again.");
    }
  };

  return (
    <div className="update_parent_container">
      <div className="update_container2">
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
      <div className="update_container">
        <span id="update_form_heading">Update form</span>
        <br />
        <br />
        <div className="update_main_div">
          <div className="update_main_div2">
            <span className="update_maindiv_heading">Progress</span>
          </div>
          <div className="update_card-container3">
            {displayData.map((solution, index) => (
              <div key={index} className="update_card6">
                <div className="update_card6_content6">
                  <span className="update_span21">{solution.name} Update</span>
                  <input
                    type="text"
                    className="update_input1"
                    value={updates[solution._id] || ""}
                    onChange={(e) =>
                      handleInputChange(solution._id, e.target.value)
                    }
                    placeholder={`Update progress for ${solution.name}`}
                  />
                </div>
                <br />
                <br />
              </div>
            ))}
            <br />
            <br />
            <span
              className="update_treatmentPlanner_main_button"
              onClick={handleSubmit}
            >
              <a href="#">Submit</a>
            </span>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateForm;
