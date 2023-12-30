import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSec from "./useAxiosSec";



const useAgent = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSec();

    const {data: isAgent} = useQuery({
        queryKey: [user?.email, 'isAgent'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/agent/${user.email}`);
            console.log(res.data);
            return res?.data?.agent;
        },
    })
    return [isAgent]
};

export default useAgent;


