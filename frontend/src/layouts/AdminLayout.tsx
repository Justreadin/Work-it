import { Outlet } from "react-router-dom"
import Header from "../header/Header"

const AdminLayout = ()=>{
    return(
        <main className="">
            <Header/>
            <Outlet/>
        
        </main>
    )
}

export default AdminLayout