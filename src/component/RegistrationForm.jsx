import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import "../component/RegistrationForm.css";

function RegistrationForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCheckboxChange = () => {
    setIsChecked(prevState => {
      const newState = !prevState;
      if (newState) {
        setShippingAddress(billingAddress);
      } else {
        setShippingAddress('');
      }
      return newState;
    });
  };

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted successfully!");
      console.log(data);
      reset();
      setBillingAddress('');
      setShippingAddress('');
      setIsChecked(false);
    }, 3000);
  };

  return (
  <div className=' h-screen border flex justify-center w-full content-center bg-[rgb(154,194,61)] py-20'>
    <form className="rounded-3xl p-6 max-w-lg mx-auto" id="form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-4xl text-center mb-8" id='heading1'>Shipping Address Form</h1>

      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="w-full md:w-[48%]">
          <label className="text-xl flex" id='userlable'>First Name</label>
          <input
            {...register("firstName", { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })}
            placeholder='First Name'
            className='w-full p-2 border rounded-lg mt-1'
          />
          {errors?.firstName?.type === "required" && (<p className="text-red-500">This field is required</p>)}
          {errors?.firstName?.type === "maxLength" && (<p className="text-red-500">First name cannot exceed 20 characters</p>)}
          {errors?.firstName?.type === "pattern" && (<p className="text-red-500">Alphabetical characters only</p>)}
        </div>
        <div className="w-full md:w-[48%]">
          <label className="text-xl" id='userlable'>Last Name</label>
          <input
            {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })}
            placeholder='Last Name'
            className='w-full p-2 border rounded-lg mt-1'
          />
          {errors?.lastName?.type === "required" && (<p className="text-red-500">This field is required</p>)}
          {errors?.lastName?.type === "pattern" && (<p className="text-red-500">Alphabetical characters only</p>)}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="w-full md:w-[48%]">
          <label className="text-xl" id='userlable'>Email</label>
          <input
            {...register("emailAddress", { required: true, maxLength: 20, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, })}
            placeholder='Email@example.com'
            className='w-full p-2 border rounded-lg mt-1'
          />
          {errors?.emailAddress?.type === "required" && (<p className="text-red-500">This field is required</p>)}
          {errors?.emailAddress?.type === "pattern" && (<p className="text-red-500">Please enter a valid email address</p>)}
        </div>
        <div className="w-full md:w-[48%]">
          <label className="text-xl">Phone No.</label>
          <input
            {...register("phoneNo", { required: true, maxLength: 10, pattern: /^[0-9]{10}$/ })}
            placeholder='Phone No.'
            className='w-full p-2 border rounded-lg mt-1'
          />
          {errors?.phoneNo?.type === "required" && (<p className="text-red-500">This field is required</p>)}
          {errors?.phoneNo?.type === "maxLength" && (<p className="text-red-500">Phone number cannot exceed 10 digits</p>)}
          {errors?.phoneNo?.type === "pattern" && (<p className="text-red-500">Please enter a valid 10-digit phone number</p>)}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xl">Billing Address</label>
        <textarea
          {...register("billingAddress", {
            required: "This field is required",
            maxLength: { value: 100, message: "Address is too long (max 100 characters)" },
            pattern: { value: /^[a-zA-Z0-9\s,.'-]{5,100}$/, message: "Please enter a valid address" }
          })}
          placeholder="123 sector, City, Country"
          className="w-full p-2 border rounded-lg mt-1"
          value={billingAddress}
          onChange={(e) => {
            setBillingAddress(e.target.value);
            if (isChecked) {
              setShippingAddress(e.target.value);
            }
          }}
        />
        {errors?.billingAddress && <p className="text-red-500">{errors?.billingAddress.message}</p>}
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2 w-5 h-5"
        />
        <label className="text-base">Shipping address is the same as billing address</label>
      </div>

      <div className="mb-6">
        <label className="text-xl">Shipping Address</label>
        <textarea
          {...register("shippingAddress", {
            maxLength: { value: 100, message: "Address is too long (max 100 characters)" },
            pattern: { value: /^[a-zA-Z0-9\s,.'-]{5,100}$/, message: "Please enter a valid address" }
          })}
          placeholder="123 sector, City, Country"
          className="w-full p-2 border rounded-lg mt-1"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        {errors?.shippingAddress && <p className="text-red-500">{errors?.shippingAddress.message}</p>}
      </div>
       <div className="flex justify-center">
         <button
           type="submit"
           className="w-full text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300" id="submit_button"
           disabled={loading}
          >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
    </div>);
}

export default RegistrationForm;
