const ProfileForm = () => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-gray-500 block mb-1">Name</label>
          <input
            type="text"
            placeholder="name"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-blue-500"
          />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Full Name</label>
          <input
            type="text"
            placeholder="surname"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-gray-500 block mb-1">Email Address</label>
          <input
            type="email"
            placeholder="your-email@gmail.com"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-blue-500"
          />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="(+91) 99XXXXXXXX"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-gray-500 block mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. Delhi, India"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-blue-500"
          />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Postal Code</label>
          <input
            type="text"
            placeholder="pincode"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-blue-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
