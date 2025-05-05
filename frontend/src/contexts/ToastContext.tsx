import { createContext, useContext, useState, ReactNode} from "react";

type ChildrenProps = {
    children: ReactNode
}

interface StateProp{
    status: boolean,
    message: string,
    success: boolean
}

type StateProps = {
    state: StateProp,
    setState: React.Dispatch<React.SetStateAction<StateProp>>
}


const ToadtContext = createContext<StateProps | StateProp>({status: false,success: false ,message: ""})

export const ToastContextProvider = ({children}: ChildrenProps)=>{
    const[state,setState]=useState<StateProp>({status: false, success: false, message: ""})
    return(
        <ToadtContext.Provider value={{state,setState}}>
            {children}
        </ToadtContext.Provider>
    )
}
export const useToastContext = ()=>useContext(ToadtContext)

