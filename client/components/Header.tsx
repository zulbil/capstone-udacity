import Image from "next/image";
import {
  Search,
  Home,
  Flag,
  Play,
  ShoppingCart,
  UserGroup
} from "heroicons-react"
import HeaderIcon from "./HeaderIcon";

function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      <div className="left-header flex items-center">
        <Image
          src="https://links.papareact.com/5me" 
          width={40} 
          height={40} 
          layout="fixed"
          alt="Next Facebook"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <Search className="h-6"/>
          <input 
          className="flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink" 
          type="text" 
          placeholder="Search Facebook" />
        </div>
      </div>

      <div className="center-header flex flex-grow justify-center">
        <div className="flex space-x-6 md:space-x-6">
          <HeaderIcon Icon={Home} />
          <HeaderIcon Icon={Flag} />
          <HeaderIcon Icon={Play} />
          <HeaderIcon Icon={ShoppingCart} />
          <HeaderIcon Icon={UserGroup} />
        </div>
      </div>
    </div>
  )
}

export default Header