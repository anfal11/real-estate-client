

const ImageViewerModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-2xl p-4 bg-white rounded-lg">
        <img src={imageUrl} alt="Property NID" className="w-full h-auto rounded-lg" />
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageViewerModal;
