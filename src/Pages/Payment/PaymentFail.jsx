import { ImCross } from "react-icons/im";
import { useParams } from "react-router-dom";

const PaymentFail = () => {
    const {tranId} = useParams();
    return (
        <div className=" h-screen pt-40 max-w-7xl mx-auto">
        <span className="flex gap-4 justify-center items-center">
        <ImCross className="text-3xl bg-red-500 text-white" /> <h1 className="text-4xl font-bold text-center">Payment failed: {tranId} </h1>
        </span>
            
        </div>
    );
};

export default PaymentFail;