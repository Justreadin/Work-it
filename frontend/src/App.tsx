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
import ClientHome from "./pages/client/ClientHome";
import WorkersLayout from "./layouts/WorkersLayout";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import DashBoardHome from "./pages/client/Dashboard";
import YourPost from "./pages/general/YourPost";
import RolesLayout from "./layouts/RolesLayout";
import PostDetails from "./pages/general/PostDetails";
import PostNewRole from "./pages/general/PostNewRole";
import ShuffleModal from "./pages/general/ShuffleModal";
import ShufflePage from "./pages/general/ShufflePage";

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
            <Route path="/gigs" element={<WorkersLayout />}>
              <Route index element={<Overview />} />
              <Route path="/gigs/:id" element={<ApplyForJob />} />
            </Route>
            {/* workers ends here */}

            {/* Not protected yet. This is Engr. Opeyem's section: Twist the layout to sweet your work demand */}
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<ClientHome />} />
            </Route>

            <Route path="/dashboard" element={<ClientDashboardLayout/>}>
              <Route index path="/dashboard/overview" element={<DashBoardHome/>}/>
              <Route path="/dashboard/roles" element={<RolesLayout/>}>
                <Route index element={<YourPost showPostButton={true} />} />
                <Route path="/dashboard/roles/new" element={<PostNewRole />} />
                <Route path="/dashboard/roles/:id" element={<PostDetails />} /> 
                <Route path="/dashboard/roles/shuffling" element={<ShuffleModal/>}/>
                <Route path="/dashboard/roles/shuffle" element={<ShufflePage />} />
              </Route>
            </Route>

            <Route path="/sign-upprofile" element={<FormWrapper />}>
              <Route index element={<PersonalInformation />}/></Route>
              <Route
                path="/sign-upprofile/education"
                element={<EducationForm />}
              ></Route>
              <Route
                path="/sign-upprofile/interest"
                element={<Interest />}
              ></Route>
            <Route path="/personalized" element={<PersonalizedModal />} />
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
