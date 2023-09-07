import { useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import BackButton from "../Components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        nav("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("an error happened pls check console");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600] p-8 mx-auto">
        <h1 className="text-2x1">Are u sure you want to delete this book</h1>
        <button
          className="'p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes,| delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
