import { useEffect, useState } from "react";
import useAxiosSec from "../../Hooks/useAxiosSec";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

const ManageReviews = () => {
    const [review, setReview] = useState([]);
    const axiosSec = useAxiosSec();

    useEffect(()=> {
        axiosSec
        .get("/api/v1/review")
        .then((res) => {
            console.log(res.data);
            setReview(res.data);
        })
        .catch((err) => console.log(err.message));
    }, [axiosSec])

    const handleDeleteUser = (id) => {
        // Display a confirmation dialog using SweetAlert
        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this user!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            // If the user confirms, proceed with the deletion
            axios.delete(`http://localhost:5000/api/v1/review/${id}`)
              .then(() => {
                // Display a success message
               toast.success("Review deleted successfully");
                
        
              })
              .catch((error) => {
                console.error('Error deleting user:', error);
                // Display an error message
                Swal.fire(
                  'Error!',
                  'An error occurred while deleting the user.',
                  'error'
                );
              });
          }
        });

        const indexToDelete = review.findIndex(item => item._id === id);

        // If the review is found in the state
        if (indexToDelete !== -1) {
          // Create a copy of the current state
          const updatedReview = [...review];
      
          // Remove the review at the found index
          updatedReview.splice(indexToDelete, 1);
      
          // Optimistically update the state
          setReview(updatedReview);
        }
      
      };
    return (
        <div className="max-w-7xl mx-auto mt-10 px-2">
             <h1 className="text-4xl font-bold my-16 text-center text-gray-500">Review Management</h1> 

               <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
            <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                review.map((item, index) => (
                    <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td><img className="w-32 rounded-full" src={item.photoURL} alt="" /></td>
                    <td><button onClick={() => handleDeleteUser(item?._id)} ><MdDelete className="text-4xl text-red-500" /></button></td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>          
        </div>
    );
};

export default ManageReviews;