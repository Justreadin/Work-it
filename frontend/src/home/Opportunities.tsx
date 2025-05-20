import React from "react"
import "../index.css"
const Opportunities:React.FC=()=>{
    interface Prop{
        name: string;
        quantity: string
    }
    // const[opportunities, setOpportunites]= React.useState<Prop[]>([])

    const dummyArray = ():Prop[]=>{
        let arr = []
        for(let i=0; i<12; i++){
            arr.push({name: "Linkedin Assistant", quantity: `${Math.floor(Math.random()*2500)} opportunities`})
        }
        return arr
    }
    console.log(dummyArray())
    
    // setOpportunites(dummyArray())
    

    return(
        <div className="mt-6 text-center sm:text-left">
            <div>
                <h3 className="text-xl font-bold text-customPurple">Browse talent by category</h3>
                <p className="mt-6 text-4xl font-normal text-dark_gray">Looking for work? <span className="text-customPurple underline">Browse jobs</span></p>
            </div>
            <div className="mt-6 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-6">
                {
                    dummyArray().map((item, index)=>{
                        return(
                            <div className="dropshadow justify-between space-y-5 rounded-lg bg-white_gray px-4 py-5 text-left sm:space-y-0" key={index}>
                                <h3 className="text-3xl font-normal opacity-80 sm:text-xl">{item.name}</h3>
                                <p className="text-base text-dark_gray opacity-80">{item.quantity}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Opportunities