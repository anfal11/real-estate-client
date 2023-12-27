import './Searchbar.css'

const Searchbar = () => {
    return (
        <div className="flex flex-col justify-center">
  <div className="relative p-12 w-full sm:max-w-2xl sm:mx-auto">
    <div className="overflow-hidden z-0 rounded-full relative p-3">
      <form role="form" className="relative flex z-50 bg-white rounded-full">
        <input type="text" placeholder="enter your search here" className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none" />
        <button className="bg-blue-600 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">Search</button>
      </form>
      <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
      <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
      <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
      <div className="glow glow-4 z-40 bg-blue-600 absolute"></div>
    </div>
  </div>
</div>
    );
};

export default Searchbar;