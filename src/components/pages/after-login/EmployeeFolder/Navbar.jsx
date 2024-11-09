import { useEffect, useState } from "react";
import logo from "../../../../assets/images/todo.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const currentEmployeeDetails = useSelector(
    (state) => state.employee.currentEmployee
  );
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    if (location?.pathname.includes("edit") && currentEmployeeDetails) {
      setEmployee(currentEmployeeDetails);
    }
  }, [currentEmployeeDetails, location?.pathname]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="w-full mx-auto flex justify-between items-center">
        <Link to={"/"} className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-normal whitespace-nowrap dark:text-white">
            Employees
          </span>
        </Link>
        {employee && (
          <div className="space-x-5 flex flex-row">
            <img src={employee.image} className="w-10 h-10 rounded" />
            <p className="text-white">{employee.fullName}</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
