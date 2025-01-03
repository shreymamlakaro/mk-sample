import { FaRegBell, FaRegHeart, FaRegStar, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen p-6">
      <h2 className="text-lg font-bold mb-8">User Profile</h2>
      <ul className="space-y-6 text-gray-600">
        <li className="flex items-center gap-2 font-semibold text-blue-500">
          <FaRegBell /> User info
        </li>
        <li className="flex items-center gap-2 hover:text-gray-800 cursor-pointer">
          <FaRegHeart /> Favorites
        </li>
        <li className="flex items-center gap-2 hover:text-gray-800 cursor-pointer">
          <FaRegStar /> Watchlist
        </li>
        <li className="flex items-center gap-2 hover:text-gray-800 cursor-pointer">
          <FaCog /> Setting
        </li>
        <li className="flex items-center gap-2 hover:text-gray-800 cursor-pointer">
          <FaRegBell /> Notifications
        </li>
      </ul>
      <div className="mt-24">
        <button className="flex items-center gap-2 text-blue-500 font-semibold">
          <FaSignOutAlt /> Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
