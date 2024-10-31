import { useAuthStore } from "@/context/store"

import { Link } from "react-router-dom"
import { LogOut } from "lucide-react"
import { BadgePlus } from 'lucide-react';

const Navbar = () => {

  const profile = useAuthStore(state => state.profile)
  const logout = useAuthStore(state => state.logout)

  return (
    <div className="flex py-2  justify-between items-center border w-4/12 m-auto rounded-full mt-5 bg-zinc-800 text-white">
            <Link to='/registro' className=" ml-3 hover:bg-zinc-700 px-2 rounded-md py-1">
       <BadgePlus/>
       </Link>
      {profile ? <p className="text-center font-bold capitalize">Bienvenido  {profile.username}</p> : null}
      <button onClick={logout} className="mr-3 hover:bg-zinc-700 px-2 rounded-md py-1"><LogOut/></button>
    </div>
  )
}

export default Navbar