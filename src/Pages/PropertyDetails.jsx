
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const PropertyDetails = () => {
  const [property, setProperty] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/properties/${id}`);
        const data = await response.json();
        setProperty(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='pt-28'>

      <section className='max-w-7xl mx-auto'>

      <div>
      <h3 className="text-4xl my-10 font-semibold text-gray-600">
            {property?.title}
          </h3>
        <div className="mb-20 group flex flex-col h-full bg-white rounded-xl ">
        
      <div className="flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
      
        <img className="object-cover w-full" src={property?.image} alt={property?.title}  />
      </div>

      <div className="p-4 md:p-6">
      {
              property?.status === 'For Sale' ? <p className="mt-3 text-gray-600 font-extrabold bg-yellow-400 w-24 p-4 text-center rounded-e-full">
            {property?.status}
          </p> : <p className="mt-3 text-white font-bold bg-blue-600 w-24 p-4 text-center rounded-e-full">
              {property?.status}
              </p>
          }
          
          <span className="block mb-1 mt-3 text-3xl font-semibold uppercase text-blue-600">
            {property?.location}
          </span>
          <p className="mt-3 text-gray-600 text-xl font-bold">
           <span className='underline'>About this {property?.type}:</span> {property?.description}
          </p>
          <p className="mt-3 text-gray-600 text-xl font-bold">
            Type: {property?.type}
          </p>
          <p className="mt-3 text-gray-600 text-xl font-semibold">
            ${property?.price}
          </p>

          
         
         <button onClick={()=> window.history.back()} className='btn mt-10 bg-blue-600 text-white hover:bg-blue-400'> Go Back </button>
        </div>

      </div>
          </div>

      </section>
      
   


    </div>
  );
};

export default PropertyDetails;
