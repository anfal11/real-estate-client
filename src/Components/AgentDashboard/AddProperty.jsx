import axios from "axios";
import toast from "react-hot-toast";
import useUser from "../../Hooks/useUser";
import { MdAddComment } from "react-icons/md";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
  const [verificationStatus, setVerificationStatus] = useState(false);
  const { users } = useUser();

  const handleSubmit = async (e) => {
      try {
          e.preventDefault();
          const form = new FormData(e.target);

      const imgbbResponse = await axios.post(image_hosting_api, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const imageURL = imgbbResponse.data?.data?.url;
      // console.log('image uplaoded to imgbb', imgbbResponse?.data);
      
      const data = {
        title: form.get("title"),
        location: form.get("location"),
        image: imageURL,
        imageNID: form.get("imageNID"),
        agentName: form.get("agentName") || users[0]?.name,
        agentEmail: form.get("agentEmail") || users[0]?.email,
        agentNumber: Number(form.get("agentNumber")),
        price: Number(form.get("price")),
        description: form.get("description"),
        status: form.get("status"),
        type: form.get("type"),
        verified: verificationStatus,
      };

      // console.log(data);

      await axios.post("http://localhost:5000/api/v1/properties", data);

      toast.success("Property added successfully!");
      e.target.reset();
    } 
    catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 mb-10">
      <h1 className="text-3xl font-bold my-10 text-center">Add Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Title
          </label>
          <input
            type="text"
            name="title"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Location
          </label>
          <input
            type="text"
            name="location"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            NID Image
          </label>
          <input
            type="url"
            name="imageNID"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Agent Name
          </label>
          <input
            type="text"
            name="agentName"
            defaultValue={users[0]?.name}
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Agent Email
          </label>
          <input
            type="email"
            name="agentEmail"
            defaultValue={users[0]?.email}
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Agent Phone Number
          </label>
          <input
            type="number"
            name="agentNumber"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Property Description
          </label>
          <textarea
          rows={5}
            type="text"
            name="description"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="flex gap-5">
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            name="status"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          >
            <option value="" disabled selected>
              Select Status
            </option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <select
            name="type"
            className="border outline-none drop-shadow-lg border-gray-300 p-2 w-full"
            required
          >
            <option value="" disabled selected>
              Select Type
            </option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Duplex">Duplex</option>
            <option value="Room">Room</option>
          </select>
        </div>
        </div>

        <div className="mt-6 ">
          <button
            type="submit"
            className="bg-blue-600 outline-none drop-shadow-lg text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
          >
          <span className="flex items-center gap-2">
            Add Property <MdAddComment className="text-xl" /></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
