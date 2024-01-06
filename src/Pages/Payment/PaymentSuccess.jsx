import { useParams } from "react-router-dom";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const PaymentSuccess = () => {
    const {tranId} = useParams();
    return (
        <div className=" h-screen pt-40 max-w-7xl mx-auto">
        <span className="flex gap-4 justify-center items-center">
        <IoCheckmarkDoneCircleOutline className="text-3xl bg-green-500 text-white" /> <h1 className="text-4xl font-bold text-center">Payment Successful: {tranId} </h1>
        </span>
            
        </div>
    );
};

export default PaymentSuccess;