import React from "react";
import { Link } from "react-router-dom";
import { PresentationChartBarIcon, ShoppingBagIcon, InboxIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon, ArrowRightStartOnRectangleIcon, CubeIcon, TruckIcon, ShoppingCartIcon, Square3Stack3DIcon, DocumentDuplicateIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";

function Sidebar() {
  return (
    <div className="bg-[#7D5FFE] text-white w-46 p-4 flex flex-col h-screen fixed" >
      <Link to="/dashboard/customers" className="text-white no-underline mb-4 flex items-center hover:bg-[#6a4edb] p-2 rounded">
        <ShoppingBagIcon className="h-6 w-6 mr-2" /> Add Product
      </Link>
      <Link to="/dashboard/collection" className="text-white no-underline mb-4 flex items-center hover:bg-[#6a4edb] p-2 rounded">
        <DocumentPlusIcon className="h-6 w-6 mr-2" /> Add Collection
      </Link>
      <Link to="/dashboard/prodtocoll" className="text-white no-underline mb-4 flex items-center hover:bg-[#6a4edb] p-2 rounded">
        <Square3Stack3DIcon className="h-6 w-6 mr-2" /> Product To Coll
      </Link>
      <Link to="/dashboard/allproducts" className="text-white no-underline mb-4 flex items-center hover:bg-[#6a4edb] p-2 rounded">
        <CubeIcon className="h-6 w-6 mr-2" /> All Products
      </Link>
      <Link to="/dashboard/myorders" className="text-white no-underline mb-4 flex items-center hover:bg-[#6a4edb] p-2 rounded">
        <ShoppingCartIcon className="h-6 w-6 mr-2" /> My Orders
      </Link>
    </div>
  );
}

export default Sidebar;
