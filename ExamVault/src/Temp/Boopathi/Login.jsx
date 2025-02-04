import "../Boopathi/Login.css";

const Login = () => {
  return (
    <div className="Login_body">
      <div className="Login_container">
        <div className="Login_left_side">
          <div className="big_circle">
            <div className="big_circle_content">
              <h1>Welcome Back</h1>
              <h4>Nice to See you Again !</h4>
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
            <button className="login_switch">Login</button>
            <button className="signup_switch">SignUp</button>
          </div>
          <form action="" className="Login_form">
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
          <div className="very_small_circle"></div>
        </div>
      </div>
    </div>
  );
};
export default Login;
