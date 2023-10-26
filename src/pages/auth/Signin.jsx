import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout.jsx";
import { signin } from "../../redux/slices/AuthSlice.js";
import { useDispatch } from "react-redux";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (dispatch(signin(data))) navigate("/");
  };

  return (
    <AuthLayout>
      <p className='mb-4'>
        Please <strong>sign-in</strong> to your account and start the adventure
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

          <div className='mt-2'>
            <button className='btn btn-primary w-full'>Signin</button>
          </div>
        </div>
      </form>

      <p className='my-5 text-center'>
        Don&#39;t have an account?{" "}
        <Link to='/signup' className='text-primary'>
          Signup
        </Link>
      </p>
    </AuthLayout>
  );
}
