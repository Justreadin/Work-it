import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./forms/Login";
import PageLayout from "./pages/PageLayout";
import SignUpOne from "./forms/SignUpOne";
import PersonalizedModal from "./modals/PersonalizedModal";
// import StageFormLayout from "./forms/StageFormLayout";
import PersonalInformation from "./forms/Sign-up/PersonalInformation";
import EducationForm from "./forms/Sign-up/EducationForm";
import Interest from "./forms/Sign-up/Interest";
import PhotoUpload from "./forms/Sign-up/PhotoUpload";
import Overview from "./pages/Overview";
import ApplyForJob from "./pages/ApplyForJob";
import FormWrapper from "./forms/Sign-up/FormWraper";
import Toast from "./modals/Toast";
import { ToastContextProvider } from "./contexts/ToastContext";

function App() {
  return (
    <>
      <BrowserRouter>
      
        <ToastContextProvider>
        <Toast/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUpOne/>}/>
          <Route path="/sign-upprofile" element={<FormWrapper/>}>
             <Route index element={<PersonalInformation/>}></Route>
             <Route path="/sign-upprofile/education" element={<EducationForm/>}></Route>
             <Route path="/sign-upprofile/interest" element={<Interest/>}></Route>
          </Route>
          <Route path="/personalized" element={<PersonalizedModal/>}/>
          <Route path="/avatarupload"  element={<PhotoUpload/>}/>
          <Route path="/home" element={<PageLayout/>}>
            <Route index element={<Home/>}></Route>
          </Route>

          {/* Protected Route */}
          <Route path="/gigs" element={<PageLayout/>}>
            <Route index element={<Overview/>}></Route>
            <Route path="/gigs/details/:id" element={<ApplyForJob/>}/>
          </Route>
        </Routes>
        </ToastContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
