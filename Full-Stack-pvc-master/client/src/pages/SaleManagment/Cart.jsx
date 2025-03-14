import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [Items, setItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsId, setitemsId] = useState("");
  console.log(error);
  const customerId = currentUser ? currentUser._id : null;
  console.log(Items);
  console.log(totalPrice);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Sale/Itemsss/${customerId}`);
        const data = await response.json();

        console.log("data", data);

        if (data.length > 0) {
          setItems(data);

          const totalPrice = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setTotalPrice(totalPrice);
        } else {
          setItems(null);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [customerId]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/Sale/deleteee/${itemsId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("error");
      } else {
        alert("succefull");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithItems = {
        customerId: currentUser._id,
        name: currentUser.Name,
        phoneN: currentUser.phone,
        address: currentUser.Adress,
        Items: Items.map((item) => ({
          name: item.name,
          image: item.image,
          price: item.price,
          desc: item.desc,
          quantity: item.quantity,
        })),
        Length: Items.length,
        totalPrice: totalPrice,
      };

      console.log("dataaa", formDataWithItems);

      const res = await fetch("/api/Sale/orderplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataWithItems),
      });

      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      }

      if (res.ok) {
        console.log(formDataWithItems);
        alert("successful");
        handleDeleteall();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //if submite is success clear the cart details
  const handleDeleteall = async () => {
    try {
      const res = await fetch(`/api/Sale/deleteitem/${customerId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("fail");
      } else {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-start">
      <div>
        <div className="flex justify-center mt-4">
          <div className="flex flex-wrap justify-center gap-4  ">
            {Items && Items.length > 0 ? (
              <>
                <div className="flex  items-center justify-center gap-4">
                  <div className="mt-[-100px]">
                    {Items.map((item) => (
                      <div
                        key={item._id}
                        className="w-[700px] h-[100px]   mb-5 border rounded-2xl shadow-xl   "
                      >
                        <div className="flex   gap-8">
                          <img
                            className="w-[100px] rounded-2xl  h-[100px] "
                            src={item.image}
                          />
                          <div className="font-extralight text-xl text-black mt-8 truncate w-32">
                            {item.name}
                          </div>
                          <p className="font-extralight  text-black mt-8 text-base">
                            Rs.{item.price}
                          </p>
                          <p className="font-extralight  text-black mt-8 text-base">
                            {item.quantity}-Item
                          </p>
                          <p className="font-extralight  text-black mt-8 text-base max-w-20 truncate">
                            {item.desc}
                          </p>
                          <button
                            className="ml-4 bg-blue-700 rounded-full hover:text-black text-white font-extralight h-10 w-20 mt-8"
                            onClick={() => {
                              setitemsId(item._id);
                              handleDeleteUser();
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="ml-40">
                    <div className="w-[300px] h-[350px]  mt-10 mb-20 border rounded-2xl shadow-xl">
                      <div className="flex justify-center items-center mt-14">
                        <h1 className="font-serif text-slate-800 text-3xl">
                          Total Price
                        </h1>
                      </div>
                      {/* <div className="flex justify-center items-center gap-20 mt-4">
                        <h1 className="font-extralight text-black text-md">
                          Number of itmes
                        </h1>
                        <p className="font-extralight text-black text-md">
                          {Items.length}
                        </p>
                      </div> */}

                      <div className="flex justify-center items-center mt-4">
                        <h1 className="font-serif text-slate-800 text-3xl">
                          Rs. {totalPrice}
                        </h1>
                      </div>
                      <div className="flex justify-center items-center mt-2">
                        <button
                          onClick={handleSubmit}
                          className=" bg-blue-700 rounded-full mt-4 hover:text-black text-white font-extralight py-2 px-8"
                        >
                          Place order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center h-[500px] w-screen">
                  <p className="text-6xl font-serif text-slate-700">
                    Your cart is Empty
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
