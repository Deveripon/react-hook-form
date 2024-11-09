import React from "react";
import FieldSet from "../FieldSet";
import Field from "../Field";

import { useForm } from "react-hook-form";
import cn from "../../utils/cn";
import { root } from "postcss";
const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    console.log(useForm());

    const onFormSubmit = (formData) => {
        const user = {
            email: "devripon.io@gmail.com",
            password: "123456789",
        };
        const found =
            formData.email === user.email &&
            formData.password === user.password;

        if (!found) {
            setError("root.random", {
                message: "Email or password is incorrect",
                type: "error",
            });
        } else {
            console.log("login successful");
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <p className='error text-md text-red-600'>
                    {errors?.root?.random?.message}
                </p>
                <FieldSet label='Enter Login Details'>
                    <Field
                        label={"email"}
                        error={errors.email}>
                        <input
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className={cn(
                                `border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`,
                                errors.email &&
                                    "border-red-600 focus:ring-red-600"
                            )}
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Enter your email'
                        />
                    </Field>
                    <Field
                        label={"password"}
                        error={errors.password}>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                            })}
                            className={cn(
                                "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
                                errors.password &&
                                    "border-red-600 focus:ring-red-600"
                            )}
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Enter your Password'
                        />
                    </Field>
                </FieldSet>
                <Field>
                    <button className='text-md ml-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-[120px] px-5 py-2.5 text-center'>
                        Login
                    </button>
                </Field>
            </form>
        </div>
    );
};

export default LoginForm;

