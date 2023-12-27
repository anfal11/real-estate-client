import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Cards from "../Components/AllProperty.jsx/Cards";
import Searchbar from "../Components/AllProperty.jsx/Searchbar";

const Properties = () => {
  const axios = useAxios();

  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axios.get("api/v1/properties");
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Real Estate | Properties </title>
      </Helmet>
      <Navbar />
      {/* <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 h-screen"> */}
      <div className="py-32">
        
        <Searchbar />
        <section className="max-w-7xl mx-auto gap-4 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {properties?.map((property) => (
            <Cards key={property.id} property={property} />
          )
          )
          }
        </section>
      </div>
    </div>
  );
};

export default Properties;
