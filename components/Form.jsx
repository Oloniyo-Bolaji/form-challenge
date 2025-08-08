import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <div className="flex gap-[10px]">
          <div className="sm:w-[50%] w-full flex flex-col gap-[10px]">
            <label className="text-[13px] font-bold">First name</label>
            <input
              className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
              placeholder="First name"
              {...register("firstname")}
            />
            <p className="text-[red] text-[12px]">
              {errors.firstname?.message}
            </p>
          </div>
          <div className="sm:w-[50%] w-full flex flex-col gap-[10px]">
            <label className="text-[13px] font-bold">Last name</label>
            <input
              className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
              placeholder="Last name"
              {...register("lastname")}
            />
            <p className="text-[red] text-[12px]">{errors.lastname?.message}</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px]">
          <label className="text-[13px] font-bold">Email</label>
          <input
            className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
            placeholder="Email address"
            {...register("email")}
          />
          <p className="text-[red] text-[12px]">{errors.email?.message}</p>
        </div>

        <div className="w-full flex flex-col gap-[10px]">
          <label className="text-[13px] font-bold">Organization Name</label>
          <input
            className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
            placeholder="Organization name"
            {...register("organization_name")}
          />
          <p className="text-[red] text-[12px]">
            {errors.organization_name?.message}
          </p>
        </div>

        <div className="flex gap-[10px]">
          <div className="sm:w-[50%] w-full flex flex-col gap-[10px]">
            <label className="text-[13px] font-bold">Category</label>
            <select
              {...register("country")}
              className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
              placeholder="Select"
            >
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <p className="text-[red] text-[12px]">{errors.country?.message}</p>
          </div>

          <div className="sm:w-[50%] w-full flex flex-col gap-[10px]">
            <label className="text-[13px] font-bold">Postal Code</label>
            <input
              className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
              placeholder="Postal code"
              {...register("postal_code")}
            />
            <p className="text-[red] text-[12px]">
              {errors.postal_code?.message}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px]">
          <label className="text-[13px] font-bold">Password </label>
          <input
            className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <p className="text-[red] text-[12px]">{errors.password?.message}</p>
        </div>
        <div className="w-full flex flex-col gap-[10px]">
          <label className="text-[13px] font-bold">Confirm Password</label>
          <input
          type="password"
            className="border-[1.5px] border-[#ccc] rounded-[8px] placeholder:text-[15px] p-[8px] outline-0"
            placeholder="Confirm Password"
            {...register("confirm_password")}
          />
          <p className="text-[red] text-[12px]">
            {errors.confirm_password?.message}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
