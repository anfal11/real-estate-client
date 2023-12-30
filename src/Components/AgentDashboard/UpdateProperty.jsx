// Import necessary libraries and components
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProperty = () => {

    const [property, setProperty] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchProperty();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const title =  form.get('title');
    const location = form.get('location');
    const image = form.get('image');
    const agentName = form.get('agentName');
    const agentEmail = form.get('agentEmail');
    const price = form.get('price');
    const description = form.get('description');
    const status = form.get('status');
    const type = form.get('type');
    
    try {
        let imageURL = null;
  
        if (image) {
            const imgbbResponse = await axios.post(image_hosting_api, form, {
              headers: { "Content-Type": "multipart/form-data" },
            });
    
            imageURL = imgbbResponse.data?.data?.url;
            console.log("Image uploaded to ImgBB:", imgbbResponse?.data);
          }
  
      const updatedData = {
        title,
        location,
        agentName,
        agentEmail,
        price,
        description, 
        status,
        type,
      };
      console.log(updatedData);
      if (imageURL) {
        updatedData.image = imageURL;
      }

 
  
      const res = await axios.put(`http://localhost:5000/api/v1/properties/${id}`, updatedData);
      if (res?.data?.modifiedCount > 0) {
        toast.success('Property updated successfully!');
        navigate('/dashboard/myAddedProperty')
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };
  
  

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold my-10 text-center">Update Property</h1>
      <form onSubmit={handleSubmit}>
        {/* Property Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={property.title}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Property Location */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Location
          </label>
          <input
            type="text"
            name="location"
            defaultValue={property.location}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Property Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Image
          </label>
          <input
  type="file"
  name="image"
  accept="image/*"
  className="border border-gray-300 p-2 w-full"
  required
/>

        </div>

        {/* Agent Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Agent Name
          </label>
          <input
            type="text"
            name="agentName"
            defaultValue={property.agentName}
            className="border border-gray-300 p-2 w-full"
            readOnly
          />
        </div>

        {/* Agent Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Agent Email
          </label>
          <input
            type="email"
            name="agentEmail"
            defaultValue={property.agentEmail}
            className="border border-gray-300 p-2 w-full"
            readOnly
          />
        </div>

        {/* Property Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Description
          </label>
          <textarea
            rows={5}
            type="text"
            name="description"
            defaultValue={property.description}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            defaultValue={property.price}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            name="status"
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="For Sale" selected={property.status === 'For Sale'}>
              For Sale
            </option>
            <option value="For Rent" selected={property.status === 'For Rent'}>
              For Rent
            </option>
          </select>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <select
            name="type"
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Apartment" selected={property.type === 'Apartment'}>
              Apartment
            </option>
            <option value="House" selected={property?.type === 'House'}>
              House
            </option>
            <option value="Duplex" selected={property?.type === 'Duplex'}>
              Duplex
            </option>
            <option value="Room" selected={property?.type === 'Room'}>
              Room
            </option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 mb-10"
          >
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
