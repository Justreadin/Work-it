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
        <div className="mt-48 text-center sm:text-left">
            <div>
                <h3 className="text-xl text-customPurple font-bold">Browse talent by category</h3>
                <p className="text-dark_gray text-4xl font-normal mt-6">Looking for work? <span className="text-customPurple underline">Browse jobs</span></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-6 grid-rows-2 mt-6 gap-4">
                {
                    dummyArray().map((item, index)=>{
                        return(
                            <div className="dropshadow bg-white_gray rounded-lg text-left px-4 py-5 space-y-5 sm:space-y-0 justify-between" key={index}>
                                <h3 className="text-3xl sm:text-xl font-normal opacity-80">{item.name}</h3>
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