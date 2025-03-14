export default function FooterCom() {
  return (
    <div className=" flex flex-col items-center border border-t-8  bg-gradient-to-b from-blue-800 to-blue-300">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="flex gap-40 ml-20 justify-center items-center">
            <div className="mt-11">
              <h1 className="text-yellow-300 text-lg font-serif">ABOUT US</h1>
              <hr className="text-black" />
              <p className="text-slate-800">ABOUT US</p>
              <p className="text-slate-800">OUR SERVICES</p>
              <p className="text-slate-800">PRIVACY POLICY</p>
            </div>

            <div className="">
              <h1 className="text-yellow-300 text-lg font-serif">
                ADVERTISE:{" "}
              </h1>
              <hr className="text-black" />
              <p className="text-slate-800 whitespace-nowrap">
                ADVERTISE WITH US
              </p>
              <p className="text-slate-800">RATE CARD (WEB)</p>
            </div>

            <div>
              <h1 className="text-yellow-300 text-lg font-serif whitespace-nowrap">
                OTHER DIRECTORIES:{" "}
              </h1>
              <hr className="text-black" />
              <p className="text-slate-800 whitespace-nowrap">
                Weddingdirectory.lk
              </p>
              <p className="text-slate-800 whitespace-nowrap">
                Touristdirectory.lk
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-4 text-black">
          <p>@mordernpvc.com</p>
        </div>
      </div>
    </div>
  );
}
