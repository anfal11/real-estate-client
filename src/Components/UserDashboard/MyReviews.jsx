import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        axios.get("https://real-estate-server-xi.vercel.app/api/v1/review")
            .then((res) => {
                const filteredReviews = res.data?.filter((r) => r?.email === user?.email);
                setReviews(filteredReviews);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, [user?.email]);

    return (
        <div>
              <Helmet>
        <title>Real Estate | My Reviews </title>
      </Helmet>
            <h1 className="text-3xl text-gray-600 font-bold text-center my-16"> My Reviews: {reviews?.length} </h1>

            {
                reviews?.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-5 md:px-10 ">
                        {
                            reviews?.map((review) => (
                                <div key ={review._id } className="bg-gray-100 p-5 rounded-md shadow-md">
                                    <h1 className="text-xl font-bold text-gray-600"> {review?.name} </h1>
                                    <p className="text-lg text-gray-600"> {review?.message} </p>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <h1 className="text-3xl text-gray-600 font-bold text-center my-16"> No Reviews Found </h1>

            }
        </div>
    );
};

export default MyReviews;
