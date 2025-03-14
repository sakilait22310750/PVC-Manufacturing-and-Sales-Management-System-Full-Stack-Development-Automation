import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [Items, setItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/Sale/getallproduct`);
        const data = await res.json();

        if (res.ok) {
          setItems(data.Product);
          const initialQuantities = data.Product.reduce((acc, item) => {
            acc[item._id] = 1;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = async (itemId) => {
    try {
      const selectItem = Items.find((item) => item._id === itemId);
      if (!selectItem) {
        throw new Error("Item not found");
      }

      const response = await fetch(`/api/Sale/addcart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: currentUser._id,
          address: currentUser.Adress,
          phoneN: currentUser.phone,
          name: selectItem.name,
          image: selectItem.image,
          price: selectItem.price,
          quantity: quantities[itemId],
          desc: selectItem.desc,
        }),
      });

      if (!response.ok) {
        console.log("error");
      } else {
        setNotification("Item added to cart successfully!");
        dispatch({ type: "ADD_TO_CART", payload: selectItem });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Items]);
    } else {
      const filteredData = Items.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Items]);

  const handleQuantityChange = (itemId, newQuantity) => {
    // If the new quantity is negative, set it to 1 instead
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <form className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Product List
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filter && filter.length > 0 ? (
            <>
              {filter.slice(0, showMore ? filter.length : 7).map((item) => (
                <div key={item._id} className="border rounded-lg shadow-md">
                  <img
                    className="w-full h-64 object-cover rounded-t-lg"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Price : Rs.{item.price}
                    </p>
                    <p className="text-gray-600 mb-2">
                      Size : {item.quantity} mm
                    </p>
                    <p className="text-gray-600 mb-4">
                      Description : {item.desc}
                    </p>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={quantities[item._id] || ""}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
                        onClick={() => handleAddToCart(item._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!showMore && filter.length > 7 && (
                <div className="flex justify-center mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
                    onClick={() => setShowMore(true)}
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600">You have no items yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
