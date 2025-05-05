import React, { createContext, ReactNode, useContext, useState } from "react";

interface ProviderProps{
    children: ReactNode
}

interface StateProp{
    menu: boolean,
    searchShow: boolean
}

interface StateProps{
    headerState: StateProp,
    setHeaderState: React.Dispatch<React.SetStateAction<StateProp>>
}
const HeaderContext = createContext<StateProps | undefined>(undefined)

const HeaderContextProvider:React.FC<ProviderProps>=({children})=>{
    const[headerState, setHeaderState]=useState<StateProp>({menu: false, searchShow: false})

    return(
        <HeaderContext.Provider value={{headerState, setHeaderState}}>
        {children}
    </HeaderContext.Provider>
    )
}

export  default HeaderContextProvider

export const useHeader = ()=>useContext(HeaderContext)