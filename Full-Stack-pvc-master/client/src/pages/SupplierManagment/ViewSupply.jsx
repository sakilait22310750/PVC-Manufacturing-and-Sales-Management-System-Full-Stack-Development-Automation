import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [form, setform] = useState([]);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchcat = async () => {
      try {
        const res = await fetch(`/api/supplier/getadd`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setform(data.Items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchcat();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Supplier Management Report", 10, 10);
    doc.autoTable({
      head: [["Type", "Quantity", "Price", "Date", "Description"]],
      body: form.map((cat) => [
        cat.type,
        cat.quantity,
        cat.price,
        cat.wantdate,
        cat.desc,
      ]),
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
        cellWidth: "auto",
      },
    });
    doc.save("SupplierManagementReport.pdf");
  };

  return (
    <div className="">
      <div>
        <div className="flex justify-center items-center mt-6  gap-4">
          <button
            className="w-40 h-10 bg-blue-700 ml-8 text-white rounded-lg hover:opacity-50 text-md font-serif mb-8"
            onClick={(e) => {
              e.preventDefault();
              generatePDF();
            }}
          >
            {" "}
            GenerateReport
          </button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {form && form.length > 0 ? (
              <>
                {form.map((cat) => (
                  <div
                    key={cat._id}
                    className="w-[1000px] h-[400px]  mt-10 mb-10 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">
                      <div className="flex justify-center items-center mt-4 mb-4">
                        <h1 className="text-xl text-slate-700 font-serif whitespace-nowrap">
                          Supply Form
                        </h1>
                      </div>
                      <div className="flex justify-center break-words w-[950px] items-center mt-2">
                        <p className="text-gray-700 break-words w-[950px] text-base text-center">
                          {cat.desc}
                        </p>
                      </div>
                      <div className="flex justify-center items-center mt-6">
                        <div className="text-gray-700 text-xl  max-w-[200px] whitespace-nowrap break-words">
                          Supplier Email:{cat.Email}
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="text-gray-700 whitespace-nowrap mt-3 text-xl max-w-[200px] break-words">
                          Type:{cat.type}
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="text-gray-700 whitespace-nowrap mt-3 text-xl max-w-[200px] break-words">
                          quantity:{cat.quantity}
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="text-gray-700 whitespace-nowrap mt-3 text-xl max-w-[200px] break-words">
                          Price:{cat.price}
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="text-gray-700 whitespace-nowrap mt-3 text-xl max-w-[200px] break-words">
                          Date:{cat.wantdate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
