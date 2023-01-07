import "./App.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signup");
    
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <div className="links">
        <Link to={"signup"}>
          <button>Sign Up</button>
        </Link>
        <Link to={"login"}>
          <button>Login</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
