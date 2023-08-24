import React from "react";

const Contacts = () => {
  return (
    <div className="mt-[14rem] mb-[5rem] flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <p className="relative text-black text-[1.8rem] text-center font-normal mb-2">Let us know how we can help and we’ll get right back to you.</p>
        <p className="relative text-black text-[1.8rem] text-center font-normal mb-4">You may contact us using the information below:</p>
        <div className="relative text-black text-[1.8rem] text-center font-medium mb-6">
          <p className="relative uppercase">abi coirr</p>
          <p className="relative capitalize">
            4/212,Katturpudur Kattur post, Pongalur via, dt, Tamil Nadu 641667
          </p>
          <p>Telephone No: 7574383956 </p>
          <p>E-Mail ID: support@abicoirr.in</p>
        </div>
      </div>

      {/* Form component */}
      <div>
        <form>
          <div className="w-full mb-6">
            <label
              className="relative block text-[2rem] font-medium mb-1 capitalize w-full"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
              type="text"
              id="name"
            />
          </div>
          <div className="w-full mb-6">
            <label
              className="relative block text-[2rem] font-medium mb-1 capitalize"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
            />
          </div>
          <div className="w-full mb-6">
            <label
              className="relative block text-[2rem] font-medium mb-1 capitalize"
              htmlFor="phone"
            >
              phone no
            </label>
            <input
              type="number"
              id="phone"
              className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
            />
          </div>
          <div className="w-full mb-6">
            <label
              className="relative block text-[2rem] font-medium mb-1 capitalize"
              htmlFor="message"
            >
              How can we help?
            </label>
            <textarea
              rows={4}
              cols={50}
              className="focus:outline-none border border-gray-500 focus:border-[#008000] py-4  px-4 text-[1.5rem] w-full font-medium rounded"
            />
          </div>
          <button className="relative w-full bg-[#008000] text-center py-7 text-white capitalize text-[2rem] rounded">
            Contact us
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
