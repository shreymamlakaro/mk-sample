/* eslint-disable @next/next/no-img-element */
const ProfileCard = () => {
  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="relative">
        <img
          src="https://via.placeholder.com/100"
          alt="profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
          ✏️
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold">User</h3>
        <p className="text-gray-500">Delhi, India</p>
      </div>
    </div>
  );
};

export default ProfileCard;
