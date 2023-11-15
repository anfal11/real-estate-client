
import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Banner from "../Components/Home/Banner";
import Properties from "../Components/Home/Properties";
import Steps from "../Components/Home/Steps";



const Home = () => {


  return (
    <div>
      <Helmet>
        <title>Real Estate | Home </title>
      </Helmet>
     <Navbar />
    {/* <div className="h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"> */}
  
    <Banner />
    <Properties />
    <Steps />

    
      
    </div>
  );
};

export default Home;
