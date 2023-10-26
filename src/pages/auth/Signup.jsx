import { signup } from "../../redux/slices/authSlice";
import AuthLayout from "../../layout/AuthLayout";

import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data = {
      ...data,
      userStatus: data.userType === "customer" ? "approved" : "suspended",
    };
    if (dispatch(signup(data))) navigate("/signin");
  };

  const userTypeOpt = [
    { label: "Customer", value: "customer" },
    { label: "Engineer", value: "engineer" },
    { label: "Admin", value: "admin" },
  ];

  return (
    <AuthLayout>
      <p className='mb-4'>
        Please <strong>sign-up</strong> to your account and start the adventure
      </p>
      <form className='w-full mt-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-center gap-4'>
          <div>
            <input
              type='text'
              placeholder='Enter email'
              className='input input-bordered w-full'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email",
                },
              })}
            />
            <p className='mt-1 text-error'>{errors?.email?.message}</p>
          </div>

          <div>
            <input
              type='password'
              placeholder='Enter password'
              className='input input-bordered w-full'
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Invalid password",
                },
              })}
            />
            <p className='mt-1 text-error'>{errors?.password?.message}</p>
          </div>

          <div>
            <input
              type='text'
              placeholder='Enter first name'
              className='input input-bordered w-full'
              {...register("name", {
                required: "Name is required",
              })}
            />
            <p className='mt-1 text-error'>{errors?.name?.message}</p>
          </div>

          <div>
            <select
              {...register("userType", { required: "Usertype is required" })}
              className='select select-bordered w-full max-w-xs'
              defaultValue={""}
            >
              <option value={""} disabled>
                Pick One
              </option>
              {userTypeOpt.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <p className='mt-1 text-error'>{errors?.userType?.message}</p>
          </div>

          <div>
            <input
              type='text'
              placeholder='Enter client name'
              className='input input-bordered w-full'
              {...register("clientName", {
                required: "Client name is required",
              })}
            />
            <p className='mt-1 text-error'>{errors?.clientName?.message}</p>
          </div>

          <div>
            <button className='btn btn-primary w-full'>Signup</button>
          </div>
        </div>
      </form>

      <p className='my-5 text-center'>
        Already have an account?{" "}
        <Link to='/signin' className='text-primary'>
          Signin
        </Link>
      </p>
    </AuthLayout>
  );
}
