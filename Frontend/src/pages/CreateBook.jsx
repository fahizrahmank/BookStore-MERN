import { useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import BackButton from "../Components/BackButton";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.post("http://localhost:5555/books", data).then(setLoading(false));
    nav("/").catch((err) => {
      setLoading(false);
      alert("an error happened pls check console");
      console.log(err);
    });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flec-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx=auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500"> Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-grey-500px py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500"> Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-grey-500px py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500"> PublishYear</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-grey-500px py-2 w-full"
          />
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
