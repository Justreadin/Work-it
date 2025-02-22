import Header from "../header/Header"
import Footer from "../home/Footer"
import { Outlet } from "react-router-dom"
 const AFterLogin:React.FC=()=>{
    return(
        <div className="">
            <Header/>
            <div className="">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
 }
 export default AFterLogin