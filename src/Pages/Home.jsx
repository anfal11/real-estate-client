
import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";


const Home = () => {


  return (
    <div>
      <Helmet>
        <title>Real Estate | Home </title>
      </Helmet>

      <Navbar />

      <p>This is homepage</p>
    </div>
  );
};

export default Home;
