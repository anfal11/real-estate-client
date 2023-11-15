import { TbHomeSearch } from "react-icons/tb";
import { TbHomeHeart } from "react-icons/tb";
import { TbHomeCheck } from "react-icons/tb";

const Steps = () => {
  return (
    <div className="max-w-7xl mx-auto mt-48">
      <h1 className="text-4xl font-bold text-center underline text-gray-600 mb-4">
        Simple Steps
      </h1>
      <p className="text-center font-medium text-xl">
        {" "}
        Unlock the door to your dream home or cozy room with just a few simple
        steps.{" "}
      </p>

      <div className="mt-12 mb-40  px-12 md:px-56 lg:px-2 gap-4 lg:gap-0 grid grid-cols-1 lg:grid-cols-3">
        <div className="w-80 flex flex-col items-center">
          <TbHomeSearch className="text-7xl text-blue-600" />
          <h1 className="text-xl font-medium">Search For Real Estates</h1>
          <p className="text-lg">
            Begin your journey with efficient search tool.
          </p>
        </div>
        <div className="w-80 flex flex-col items-center">
          <TbHomeHeart className="text-7xl text-blue-600" />
          <h1 className="text-xl font-medium">Select Your Favorite</h1>
          <p className="text-lg">Choose your ideal property effortlessly.</p>
        </div>
        <div className="w-80 flex flex-col items-center">
          <TbHomeCheck className="text-7xl text-blue-600" />
          <h1 className="text-xl font-medium">Take Your Key</h1>
          <p className="text-lg">Secure your dream property effortlessly.</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
