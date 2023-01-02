import Image from "next/image";
import {
  Search,
  Home,
  Flag,
  Play,
  ShoppingCart,
  UserGroup,
  ViewGrid,
  Chat,
  Bell,
  ChevronDown
} from "heroicons-react"
import HeaderIcon from "./HeaderIcon";
import { useSession, signOut } from "next-auth/react";

function Header() {
  const { data } = useSession()
  const { user } = data

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      <div className="left-header flex items-center">
        <Image
          src="https://links.papareact.com/5me" 
          width={40} 
          height={40} 
          alt="Next Facebook"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <Search className="h-6 text-gray-600"/>
          <input 
            className="
            hidden 
            md:inline-flex
            ml-2 
            items-center 
            bg-transparent 
            outline-none 
            placeholder-gray-500 
            flex-shrink" 
            type="text" 
            placeholder="Search Facebook" />
        </div>
      </div>

      <div className="center-header flex flex-grow justify-center">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon Icon={Home} />
          <HeaderIcon Icon={Flag} />
          <HeaderIcon Icon={Play} />
          <HeaderIcon Icon={ShoppingCart} />
          <HeaderIcon Icon={UserGroup} />
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end">
        <Image
            onClick={() => signOut() }
            src={user?.image}
            className="rounded-full cursor-pointer"
            width={40} 
            height={40} 
            alt="profile picture"
          />
        <p className="whitespace-nowrap font-semibold pr-3 hidden lg:inline-block">{user.name}</p>
        <ViewGrid className="icon" />
        <Chat className="icon" />
        <Bell className="icon" />
        <ChevronDown className="icon" />
        
      </div>
    </div>
  )
}

export default Header