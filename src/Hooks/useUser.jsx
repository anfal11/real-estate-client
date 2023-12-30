import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `http://localhost:5000/api/v1/users`
                );
                const data = await response.json();
                const filteredData = data.filter((item) => item.email === user?.email);
                setUsers(filteredData);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email]);

    return { users, loading, error };
};

export default useUser;
