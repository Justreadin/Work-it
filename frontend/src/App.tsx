import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/general/Home";
import Login from "./pages/auth/Login";
import PageLayout from "./pages/PageLayout";
import SignUpOne from "./pages/auth/SignUpOne";
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
import ClientLayout from "./layouts/ClientLayout";
import WorkersLyaout from "./layouts/WorkersLayout";
import ClientHome from "./pages/client/ClientHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContextProvider>
          <Toast />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUpOne />} />

            {/* workers starts here: This route is protected,  it requires loging token and correct role code to access it. Check WorkersLayout componenett for reference*/}
            <Route path="/gigs" element={<WorkersLyaout />}>
              <Route index element={<Overview />} />
              <Route path="/gigs/:id" element={<ApplyForJob />} />
            </Route>
            {/* workers ends here */}

            {/* Not protected yet. This is Engr. Opeyem's section: Twist the layout to sweet your work demand */}
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<ClientHome />} />
            </Route>
            <Route path="/personalized" element={<PersonalizedModal />} />
            <Route path="/sign-upprofile" element={<FormWrapper />}>
              <Route index element={<PersonalInformation />}/>
              <Route path="/sign-upprofile/education" element={<EducationForm />}/>
              <Route path="/sign-upprofile/interest"element={<Interest />}/>
            </Route>
            
            <Route path="/avatarupload" element={<PhotoUpload />} />
            <Route path="/home" element={<PageLayout />}>
              <Route index element={<Home />}></Route>
            </Route>
          </Routes>
        </ToastContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
