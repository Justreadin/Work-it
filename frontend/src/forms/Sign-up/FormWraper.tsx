import React from "react"
import FormContextProvider from "../../contexts/FormContext"
import StageFormLayout from "../StageFormLayout"
const FormWrapper:React.FC= ()=>{
    return(
        <FormContextProvider>
            <StageFormLayout/>
        </FormContextProvider>
    )
}

export default FormWrapper