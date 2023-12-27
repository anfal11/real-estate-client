import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const WriteReview = () => {

    const {user} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        const email = form.get('email');
        const message = form.get('message');
    
        const review = { name, email, message, photoURL: user?.photoURL };
    
        
        fetch('http://localhost:5000/api/v1/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(review),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              toast.success('Review added successfully');
              e.target.reset();
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      };

    return (
        <div className="max-w-7xl mx-auto mt-48">
            <h1 className='text-4xl font-bold text-gray-600 text-center underline'>Write an honest review</h1>
            <p className='text-center font-medium text-xl text-gray-500 my-6'>We value your feedback because it helps people a positive intension about our website.</p>

            <div className='flex flex-col md:flex-row gap-10 justify-center items-center'>
            <form onSubmit={handleSubmit} className="mt-10 mx-auto max-w-2xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="py-3 px-4 block w-full border rounded-lg text-sm outline-none font-bold"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="py-3 px-4 block w-full border rounded-lg text-sm outline-none font-bold"
              defaultValue={user?.email}
              readOnly
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            className="max-h-36 min-h-max py-3 px-4 block w-full border rounded-lg text-sm outline-none"
            rows="5"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-8 mt-3 rounded-lg bg-gray-600 text-white font-medium text-sm hover:bg-gray-500 transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>

            </div>
        </div>
    );
};

export default WriteReview;