/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  editEmployee,
  updateEmployee,
} from "../../../../api/reducers/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return navigate("");
    } else {
      dispatch(editEmployee(id));
    }
  }, []);

  const [currentEmployee, setCurrentEmployee] = useState({});

  const currentEmployeeDetails = useSelector(
    (state) => state.employee.currentEmployee
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  useEffect(() => {
    if (currentEmployeeDetails) {
      setCurrentEmployee(currentEmployeeDetails);
      reset({ ...currentEmployee });
    }
  }, [currentEmployeeDetails]);

  const onEditEmployee = async (data) => {
    let result = await dispatch(updateEmployee({ data: data, id: id }));

    if (!result.error) {
      toast.success("Employee updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-100">
        <section className="update-employee-section my-2 px-2">
          <ToastContainer />
          <form method="post" onSubmit={handleSubmit(onEditEmployee)}>
            <div className="grid grid-flow-col justify-stretch">
              <div className="p-1 flex flex-row">
                {currentEmployee.image && (
                  <img
                    src={currentEmployee.image}
                    className="w-12 h-12 rounded mx-3"
                  />
                )}
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Image URL
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="image"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter default https://avatar.iran.liara.run/public"
                    {...register("image", {
                      required: "Enter image",
                      value: currentEmployee?.image || "",
                    })}
                  />
                  {formErrors?.image && formErrors?.image?.message && (
                    <small className="text-red-500 text-sm mt-1">
                      {formErrors?.image?.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="p-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullName"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullName"
                  type="text"
                  autoComplete="off"
                  placeholder="Name"
                  {...register("fullName", {
                    required: "Enter name",
                    value: currentEmployee?.fullName || "",
                  })}
                />
                {formErrors?.fullName && formErrors?.fullName?.message && (
                  <small className="text-red-500 text-sm mt-1">
                    {formErrors?.fullName?.message}
                  </small>
                )}
              </div>

              <div className="p-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="age"
                  type="text"
                  autoComplete="off"
                  placeholder="Age"
                  {...register("age", {
                    required: "Enter age",
                    value: currentEmployee?.age || "",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Age must be a number",
                    },
                    min: {
                      value: 1,
                      message: "Age must be at least 1",
                    },
                    max: {
                      value: 120,
                      message: "Age must be less than 120",
                    },
                  })}
                />
                {formErrors?.age && formErrors?.age?.message && (
                  <small className="text-red-500 text-sm mt-1">
                    {formErrors?.age?.message}
                  </small>
                )}
              </div>

              <div className="p-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  {...register("email", {
                    required: "Enter email",
                    value: currentEmployee?.email || "",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {formErrors?.email && formErrors?.email?.message && (
                  <small className="text-red-500 text-sm mt-1">
                    {formErrors?.email?.message}
                  </small>
                )}
              </div>

              <div className="p-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Mobile Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  autoComplete="off"
                  placeholder="Mobile Number"
                  {...register("phone", {
                    required: "Enter mobile number",
                    value: currentEmployee?.phone || "",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit mobile number",
                    },
                  })}
                />
                {formErrors?.phone && formErrors?.phone?.message && (
                  <small className="text-red-500 text-sm mt-1">
                    {formErrors?.phone?.message}
                  </small>
                )}
              </div>

              <div className="p-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="salary"
                >
                  Salary
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="salary"
                  type="text"
                  autoComplete="off"
                  placeholder="Salary"
                  {...register("salary", {
                    required: "Enter salary",
                    value: currentEmployee?.salary || "",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]{1,2})?$/,
                      message: "Salary must be a valid number",
                    },
                    min: {
                      value: 0,
                      message: "Salary cannot be negative",
                    },
                    max: {
                      value: 1000000,
                      message: "Salary must be less than 1,000,000",
                    },
                  })}
                />
                {formErrors?.salary && formErrors?.salary?.message && (
                  <small className="text-red-500 text-sm mt-1">
                    {formErrors?.salary?.message}
                  </small>
                )}
              </div>

              <div className="p-1">
                <>
                  <label className="w-full text-gray-700 text-sm font-bold mb-2"></label>
                  <button
                    type="submit"
                    className="text-center cursor-pointer mt-7 w-full py-2 px-3 text-sm text-white rounded-r-md bg-[#D63691]"
                  >
                    Update
                  </button>
                </>
              </div>
            </div>
          </form>

          <br />
        </section>
      </div>
    </>
  );
};

export default EditEmployee;
