import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [quantityInput, setQuantityInput] = useState(""); // State for quantity input

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include the quantity field in formData
      const formDataWithQuantity = { ...formData, quantity: quantityInput };
      const res = await fetch("/api/Sale/productcreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithQuantity), // Use formDataWithQuantity
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("Successful");
        navigate("/manage");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value);
    if (price < 0) {
      setPublishError("Price cannot be negative");
    } else {
      setFormData({ ...formData, price });
      setPublishError(null); // Clear error message if price is valid
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="my-7 flex items-center justify-center">
        <h1 className="text-3xl font-serif text-gray-800">Add Product</h1>
      </div>

      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center justify-between border border-gray-300 rounded-lg p-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-gray-300 shadow-sm bg-white rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="w-40 h-10 rounded-lg bg-blue-500 text-white hover:opacity-90"
              size="sm"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-600 bg-red-300 rounded-lg p-2 text-center">
              {imageUploadError}
            </p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-48 h-20 object-cover"
            />
          )}

          <input
            className="bg-gray-100 shadow-sm p-3 rounded-lg"
            type="text"
            placeholder="Product Name"
            required
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="flex justify-between gap-4">
            <input
              className="flex-1 bg-gray-100 shadow-sm p-3 rounded-lg"
              type="text"
              placeholder="Price"
              required
              id="price"
              onChange={handlePriceChange}
            />
            <input
              className="flex-1 bg-gray-100 shadow-sm p-3 rounded-lg"
              type="number"
              placeholder="Size"
              step="0.01"
              min="0.50"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
            />
          </div>

          <textarea
            type="text"
            placeholder="Description"
            required
            id="desc"
            maxLength={350}
            className="bg-gray-100 shadow-sm p-3 rounded-lg"
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />

          <button
            type="submit"
            className="bg-blue-700 text-white p-3 rounded-lg w-full hover:opacity-90"
          >
            Add
          </button>

          {publishError && (
            <p className="text-red-600 bg-red-300 rounded-lg p-2 text-center">
              {publishError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
