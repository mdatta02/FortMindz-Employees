import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const MasterLayout = () => {
  return (
    <>
      <div className="bg-[#e8e8ec] min-h-screen w-full mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MasterLayout;
