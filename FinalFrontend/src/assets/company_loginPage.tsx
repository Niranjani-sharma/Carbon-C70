import "../login.css";
import emailIcon from "../assets/images/icon _email outline_.jpg";
import lockIcon from "../assets/images/icon _lock outline_.jpg";
import image12 from "../assets/images/image 12.jpg";
import { useState } from "react";
import axiosClient from "../axiosClient";
import { jwtDecode } from "jwt-decode";




function CompanyLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError(""); // Clear any previous errors
  
      try {
        const response = await axiosClient.post("/api/auth/signIn", {
          email,
          password,
        });
  
        console.log("Response:", response); // Log the entire response
  
        if (response.data && response.data.token) {
          const { token } = response.data;
  
          // Decode the token to get the user ID
          try {
            const decodedToken = jwtDecode(token);
            const Id = decodedToken.id;
  
            localStorage.setItem("authToken", token); // This matches the key in axiosClient.jsx
            localStorage.setItem("userId", Id);
            console.log("UserId:", Id);
  
            // Refresh the axiosClient with the new token
            axiosClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
  
            window.location.href = "/UserLater";
          } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            setError("Invalid token received from server");
          }
        } else {
          console.error("No token received in response");
          setError("No token received from server");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        if (error.response) {
          setError(
            `Server error: ${
              error.response.data.message || error.response.statusText
            }`
          );
        } else if (error.request) {
          setError("No response received from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    };
    return (
        <form onSubmit={handleLogin}>
      <div className="login_login_parent_container">
        <div className="login_container">
          <div className="login_div1">
            <div className="login_subdiv1">
              <span id="login_heading">Log in to your Company Account</span>
              <br />
              <span className="login_subdiv1_para">
                Fill in the credentials provied to your company
              </span>
              <br />
              <br />
            </div>
            <div className="login_subdiv2">
              <input
                type="image"
                id="login_image"
                alt="Login"
                src={emailIcon}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                form="UserId"
                id="login_text"
                placeholder="Email"
              />
            </div>
            <div className="login_subdiv3">
              <input type="image" id="login_image" alt="Login" src={lockIcon} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                form="UserId"
                id="login_text"
                placeholder="Password"
              />
            </div>
            <div className="login_subdiv4">
              <a href="#" className="login_pass">
                <span>Forgot Password ?</span>
              </a>
            </div>
            <br />
            <br />
            <a className="login_button" onClick={handleLogin}>
              <span>Log In</span>
            </a>
            <div className="login_lastpara">
              <p id="login_lastpara">
                Coal Mine Owner?
                <a href="/login" id="login_lastpara_a">
                  Click Here to go to User Login Page
                </a>
              </p>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
          <img src={image12} alt="foto" className="login_div2" />
        </div>
      </div>
    </form>
    );
}

export default CompanyLoginPage;