import ItemTable from "@/components/items/ItemTable"
import { useAuthStore } from "@/context/store"
import { Link } from "react-router-dom"


const Dashboard = () => {


    const profile = useAuthStore(state => state.profile)

  return (
    <div>
        <p className="text-center font-bold">  Usuario logeado: {profile.username}</p>
       <Link to='/registro' className="absolute top-10 left-10 rounded-md border shadow-xl px-3 py-1 ">
       Registro
       </Link>
        <ItemTable/>
    </div>
  )
}

export default Dashboard