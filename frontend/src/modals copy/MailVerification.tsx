import React,{useState,useRef, useEffect} from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const MailVerification: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[] | null[]>([])
  useEffect(()=>{
    if(inputRefs.current[0]){
        inputRefs.current[0].focus()
    }
  }, [])

  const navigate= useNavigate()
  let isComplete = otp.every((item)=> item !=="")
  const  handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    navigate("/sign-upprofile")
  }

  const handleChange = (e: any, i: any)=>{
    if(isNaN(e.target.value)) return false
    setOtp([...otp.map((data, index)=>index === i? e.target.value: data  )])
    if(e.target.value && e.target.nextSibling){
        e.target.nextSibling.focus()
    }
    if(isComplete){
      handleSubmit(e)
    }
    
  }

  const handleKeyDown = (e:any, index:any)=>{
    if(e.key === "Backspace" && !otp[index] && index >0){
      inputRefs.current[index-1]?.focus()
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden absolute top-0 left-0 flex items-center justify-center transparent_bg z-10">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-[80%] md:w-96 flex flex-col items-center space-y-5">
        <p className="text-center text-dark_gray">
          A verification code has been sent to this email -eben*****@gmail.com.
          Input it here to continue
        </p>
        <div className="flex space-x-2 text-center">
          {otp.map((item, index) => {
            return (
              <input
                key={index}
                value={item}
                maxLength={1}
                ref={(input)=>inputRefs.current[index] = input}
                onKeyDown={(e)=>handleKeyDown(e, index)}
                onChange={(e)=>handleChange(e, index)}
                className="h-12 w-11 border-2 text-center text-dark_purple font-semibold focus:outline-dark_purple"
                type="text"
              />
            );
          })}
        </div>
        <button disabled={!isComplete} className={`bg-dark_purple py-2.5 bg-opacity-100 text-white w-40 rounded-3xl ${isComplete? 'opacity-100': 'opacity-60'}`}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default MailVerification;
{
}
