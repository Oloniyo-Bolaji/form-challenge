import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputTooltip from "./InputTooltip";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";

{
  /** */
}
const userSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    organization_name: z.string().min(1, "Organization name is required"),
    country: z.string().min(1, "Country is required"),
    postal_code: z.string().min(1, "Postal code is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const Form = ({ countries }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const password = watch("password", "");

  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isMinLength = password.length >= 8;

  const onSubmit = (data) => {
    console.log(data);

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <div className="flex gap-[10px]">
          <div className="sm:w-[50%] w-full flex-gap">
            <label className="label-style">First name</label>
            <input
              className="input-style"
              placeholder="First name"
              {...register("firstname")}
            />
            <p className="text-[red] text-[12px]">
              {errors.firstname?.message}
            </p>
          </div>
          <div className="sm:w-[50%] w-full flex-gap">
            <label className="label-style">Last name</label>
            <input
              className="input-style"
              placeholder="Last name"
              {...register("lastname")}
            />
            <p className="text-[red] text-[12px]">{errors.lastname?.message}</p>
          </div>
        </div>

        <div className="w-full flex-gap">
          <label className="label-style flex gap-[5px] items-center">
            <span>Email</span>
            <span className="tooltip">
              <InputTooltip title="Your email address" />
            </span>
          </label>
          <input
            className="input-style"
            placeholder="Email address"
            {...register("email")}
          />
          <p className="text-[red] text-[12px]">{errors.email?.message}</p>
        </div>

        <div className="w-full flex-gap">
          <label className="label-style flex gap-[5px]">
            <span>Organization Name </span>
            <span className="tooltip ">
              <InputTooltip title="Organizations name" />
            </span>
          </label>
          <input
            className="input-style"
            placeholder="Organization name"
            {...register("organization_name")}
          />
          <p className="text-[red] text-[12px]">
            {errors.organization_name?.message}
          </p>
        </div>

        <div className="flex gap-[10px]">
          <div className="sm:w-[50%] w-full flex-gap">
            <label className="label-style">Country *</label>
            <select
              {...register("country")}
              required
              className="input-style"
              placeholder="Select"
            >
              <option
                value=""
                disabled
                selected
                className="text-[14px] text-[#ccc]"
              >
                Select
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <p className="text-[red] text-[12px]">{errors.country?.message}</p>
          </div>

          <div className="sm:w-[50%] w-full flex-gap">
            <label className="label-style">Postal Code *</label>
            <input
              className="input-style"
              placeholder="Postal code"
              required
              {...register("postal_code")}
            />
            <p className="text-[red] text-[12px]">
              {errors.postal_code?.message}
            </p>
          </div>
        </div>

        <div className="w-full flex-gap">
          <label className="label-style">Password</label>

          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[14px] p-[8px] pr-10 outline-0"
            />

            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[20px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed /> : <VscEye />}
            </button>
          </div>

          <div className="flex gap-[15px] items-center text-[13px] list-none">
            <li className="flex items-center gap-[5px] ">
              {isMinLength && <span className="text-[green] font-bold">✓</span>}
              <span className={isMinLength ? "text-black" : "text-[#ccc]"}>
                8 characters
              </span>
            </li>

            <li className="flex items-center gap-[5px]">
              {hasNumber && <span className="text-[green] font-bold">✓</span>}
              <span className={hasNumber ? "text-black" : "text-[#ccc]"}>
                number
              </span>
            </li>

            <li className="flex items-center gap-[5px]">
              {hasSymbol && <span className="text-[green] font-bold">✓</span>}
              <span className={hasSymbol ? "text-black" : "text-[#ccc]"}>
                symbol
              </span>
            </li>

            <li className="flex items-center gap-[5px]">
              {hasUppercase && (
                <span className="text-[green] font-bold">✓</span>
              )}
              <span className={hasUppercase ? "text-black" : "text-[#ccc]"}>
                uppercase letter
              </span>
            </li>
          </div>
        </div>

        <div className="w-full flex-gap">
          <label className="label-style">Confirm Password</label>
          <div className="w-full relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirm_password")}
              className="w-full border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[14px] p-[8px] pr-10 outline-0"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] "
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
            </button>
          </div>
          <p className="text-[red] text-[12px]">
            {errors.confirm_password?.message}
          </p>
        </div>
      </form>
      <div className="flex justify-between">
        <button className="flex gap-[5px] text-[13px] justify-center items-center font-semibold bg-[#f7f7f7] px-[15px] py-[5px] rounded-[5px]">
          <span>
            <IoArrowBack />
          </span>
          <span>Back</span>
        </button>
        <button className="flex gap-[5px] text-[13px] text-white justify-center items-center font-semibold bg-[#888] px-[15px] py-[5px] rounded-[5px]">
          <span>Continue</span>
          <span>
            <IoArrowForwardSharp />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Form;
