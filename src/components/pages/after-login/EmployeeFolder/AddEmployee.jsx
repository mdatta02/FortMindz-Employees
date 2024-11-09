import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../../../api/reducers/employeeSlice";
import { toast, ToastContainer } from "react-toastify";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const onAddEmployee = async (data) => {
    let result = await dispatch(addEmployee(data));

    if (!result.error) {
      reset();
      toast.success("Employee added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="add-todo-section my-2 px-2">
      <ToastContainer />
      <form method="post" onSubmit={handleSubmit(onAddEmployee)}>
        <div className="grid grid-flow-col justify-stretch">
          <div className="p-1">
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
              })}
            />
            {formErrors?.image && formErrors?.image?.message && (
              <small className="text-red-500 text-sm mt-1">
                {formErrors?.image?.message}
              </small>
            )}
          </div>

          <div className="p-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              autoComplete="off"
              placeholder="fullName"
              {...register("fullName", {
                required: "Enter full name",
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
                Add
              </button>
            </>
          </div>
        </div>
      </form>

      <br />
    </section>
  );
};

export default AddEmployee;
