// import Login from "../components/Login"
import { Link } from "react-router-dom"; // Import Link for navigation
// import SignUp from "../components/SignUp";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://thumbs.dreamstime.com/b/time-attendance-tracking-system-abstract-concept-vector-illustration-clock-interactive-management-app-employee-monitoring-266952955.jpg")' }}>

      <div className="bg-white bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-lg flex space-x-4"> {/* Glass effect div */}

        <Link to="/login">

          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>

        </Link>

      </div>

    </div>

  );

}


export default Home;
