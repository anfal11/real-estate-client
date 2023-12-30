import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSec = () => {
    const {logOut} = useAuth();
    // const navigate = useNavigate();
    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    //intercepts 401 and 403
    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
        //for 401 or 403 logout the user and move the user to the login page
            if(error.response.status === 401 || error.response.status === 403) {
                localStorage.removeItem("access token");
                // window.location.href = "/login";
                logOut();
                // navigate("/login");
            }
        return Promise.reject(error);
      });
    return axiosSecure;
}

export default useAxiosSec;