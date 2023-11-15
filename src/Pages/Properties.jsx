import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";


const Properties = () => {
    return (
        <div>
        <Helmet>
                <title>Real Estate | Properties </title>
            </Helmet>
        <Navbar />
        {/* <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 h-screen"> */}
            <div>            This is all properties
        </div>
        </div>
    );
};

export default Properties;