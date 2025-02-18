import "../Boopathi/Login.css";
import { useState } from "react";

const Login = () => {
const [login,setLogin]=useState(true);
const [signup,setSignup]=useState(false);

const [signupData, setSignupData] = useState({
  username: "",
  email: "",
  password: "",
});


const handleLogin = () => {
  setLogin(true);
  setSignup(false);
  var subtitle1=document.getElementById("login_signup_subtitle").textContent="Nice to See You Again!";
   var title1=document.getElementById("login_signup_title").textContent="Welcome Back";
  var Login1 = document.getElementById("login_switch");
  // Login1.style.transition = "all s ease"; // Smooth effect
  Login1.style.background = "linear-gradient(#52057B, #BC6FF1)";
  Login1.style.color = "white";

  var signUp1 = document.getElementById("signup_switch");
  // signUp1.style.transition = "all 1s ease"; // Smooth effect
  signUp1.style.background = "white";
  signUp1.style.color = "black";
};

const handleSignup = () => {
  setSignup(true);
  setLogin(false);
  var subtitle1=document.getElementById("login_signup_subtitle").textContent="Welcome! Let's Get Started.";
  var title1=document.getElementById("login_signup_title").textContent="Welcome Students"
  var Login2 = document.getElementById("login_switch");
  // Login2.style.transition = "all 1s ease-in"; // Smooth effect
  Login2.style.background = "white";
  Login2.style.color = "black";

  var signUp2 = document.getElementById("signup_switch");
  signUp2.style.background = "linear-gradient(#52057B, #BC6FF1)";
  signUp2.style.color = "white";
};
// handle signup logic
const handleSignupSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch("http://localhost:5000/create-account", {  // ✅ Corrected API endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: signupData.username,  // ✅ Fixed key name
        email: signupData.email,
        password: signupData.password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Signup Successful!");
      setSignupData({ username: "", email: "", password: "" });
      setLogin(true);
      setSignup(false);
    } else {
      alert(result.message || "Signup Failed");
    }
  } catch (error) {
    console.error("Error signing up:", error);
    alert("Something went wrong. Try again later.");
  }
};


  return (
    <div className="Login_body">
      <div className="Login_container">
        <div className="Login_left_side">
          <div className="big_circle">
            <div className="big_circle_content">
              <h1 id="login_signup_title">Welcome Back</h1>
              <h4 id="login_signup_subtitle">Nice to See you Again !</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla,
                dolor.
              </p>
            </div>
          </div>
          <div className="semi_circle"></div>
          <div className="small_circle"></div>
        </div>
        <div className="Login_right_side">
          <div className="buttons_login_signup">
            <button className="login_switch" onClick={handleLogin} id="login_switch">Login</button>
            <button className="signup_switch" onClick={handleSignup} id="signup_switch">SignUp</button>
          </div>

          {/* login area */}


          { login && (
            <form action="" className="Login_form" id="login_form" >
            <h1>Login</h1>
            <div className="user_login_input">
              <label htmlFor="username">Username</label>
              <input type="text" className="username inputs_login" required />
            </div>
            <div className="user_login_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="password inputs_login"
                required
              />
            </div>
            <div className="need_login">
              <div className="check_password">
                <input type="checkbox" className="check_input" />
                <p>Show Password</p>
              </div>
              <p>Forget Password</p>
            </div>
            <button type="submit">Login</button>
          </form>




          )}
          
{/* Signup Form */}
{signup && (
            <form className="signup_form" id="signup_form" onSubmit={handleSignupSubmit}>
              <h1>Sign Up</h1>
              <div className="user_signup_input">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="username inputs_signup"
                  required
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                />
              </div>
              <div className="user_signup_input">
                <label htmlFor="email">Email ID</label>
                <input
                  type="email"
                  className="email inputs_signup"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                />
              </div>
              <div className="user_signup_input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="password inputs_signup"
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                />
              </div>
              <div className="check_password_signup">
                <input type="checkbox" className="check_input" />
                <p>Show Password</p>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          )}

          <div className="very_small_circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;