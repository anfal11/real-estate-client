import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDownloadDone } from "react-icons/md";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const image = form.get("image");

    try {
      let imageURL = null;

      if (image) {
        const imgbbResponse = await axios.post(image_hosting_api, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageURL = imgbbResponse.data?.data?.url;
        console.log("Image uploaded to ImgBB:", imgbbResponse?.data);
      }

      const updateData = {
        name,
        email,
      };

      if (imageURL) {
        updateData.image = imageURL;
      }

      const res = await axios.put(
        "http://localhost:5000/api/v1/users",
        updateData
      );

      if (res.data.modifiedCount > 0) {
        toast.success("User Profile successfully updated");
        navigate("/dashboard/profile");
      }
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="pt-36">
      {!loading ? (
        <>
          <h1 className="text-center font-bold text-3xl">Update Your Profile Here</h1>

          <section className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-4">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleUpdate}
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Your name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={profile?.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="username"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Current Image
                      </label>
                      {profile && (
                        <img
                          src={profile?.image}
                          alt="Current User Image"
                          className="rounded-full h-40 w-40 object-cover mb-2"
                        />
                      )}
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Choose New Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={profile?.email}
                        readOnly
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="name@company.com"
                      />
                    </div>
                    <div className="flex items-center">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-4  text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Update <MdDownloadDone className="text-xl" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center mt-10">loading</div>
        </>
      )}
    </div>
  );
};

export default EditProfile;
