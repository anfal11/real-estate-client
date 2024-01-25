import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://real-estate-server-xi.vercel.app/'
})
const useAxios = () => {
    return axiosPublic;
}

export default useAxios;