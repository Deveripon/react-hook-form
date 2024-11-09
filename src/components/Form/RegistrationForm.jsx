import FieldSet from "../FieldSet";
import Field from "../Field";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import cn from "../../utils/cn";
import NumberInput from "./NumberInput";

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
    } = useForm();
    console.log(useForm());

    const { fields, append, remove } = useFieldArray({
        name: "socials",
        control,
    });

    function handleFormSubmit(formData) {
        console.log(formData);
        console.log(formData.photo[0]);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FieldSet label={"Registration Form"}>
                    <Field
                        label='Name'
                        error={errors.name}>
                        <input
                            {...register("name", {
                                required: "Name field id required",
                            })}
                            className={cn(
                                "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
                                errors.name && "border-red-600"
                            )}
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Your Name'
                        />
                    </Field>
                    <Field
                        label='Email'
                        error={errors.email}>
                        <input
                            {...register("email", {
                                required: "Email field is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message:
                                        "Please enter a valid email address",
                                },
                            })}
                            className={cn(
                                "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
                                errors.email && "border-red-600"
                            )}
                            type='text'
                            name='email'
                            id='email'
                            placeholder='Your Email'
                        />
                    </Field>
                    <Field
                        label='Age'
                        error={errors.age}>
                        {/*           //managing custom components */}
                        <Controller
                            name='age'
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <NumberInput
                                    id='age'
                                    className={cn(
                                        "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
                                        errors.age && "border-red-600"
                                    )}
                                    {...field}
                                />
                            )}
                            rules={{
                                max: {
                                    value: 65,
                                    message:
                                        "Age must be less than or equal to 65",
                                },
                                min: {
                                    value: 18,
                                    message:
                                        "Age must be greater than or equal to 18",
                                },
                            }}></Controller>
                        {/*           //managing custom components */}
                    </Field>
                    <Field
                        label='Password'
                        error={errors.password}>
                        <input
                            {...register("password", {
                                required: "Password field is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                                },
                            })}
                            className={cn(
                                "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
                                errors.password && "border-red-600"
                            )}
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Set a Password'
                        />
                    </Field>
                    <Field
                        label='Confirm Password'
                        error={errors.repassword}>
                        <input
                            {...register("repassword", {
                                required: "Confirm Password field is required",
                                validate: (value) =>
                                    watch("password") === value ||
                                    "Passwords do not match",
                            })}
                            className={cn(
                                "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
                                errors.repassword && "border-red-600"
                            )}
                            type='password'
                            name='repassword'
                            id='repassword'
                            placeholder='Re Enter Password'
                        />
                    </Field>
                    <Field
                        label='Upload Photo'
                        error={errors.photo}>
                        <input
                            {...register("photo", {
                                required: "Confirm Password field is required",
                            })}
                            className={cn(
                                "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
                                errors.photo && "border-red-600"
                            )}
                            type='file'
                            name='photo'
                            id='photo'
                            placeholder='Upload Photo'
                        />
                    </Field>
                </FieldSet>
                <FieldSet label={"Enter Social Links"}>
                    {fields.map((field, index) => {
                        return (
                            <div
                                className='flex gap-2 justify-center items-center'
                                key={field.id}>
                                <Field label='Add Social Name'>
                                    <input
                                        className={cn(
                                            "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        )}
                                        type='text'
                                        {...register(`socials.[${index}].name`)}
                                        id={`socials.[${index}].name`}
                                        name={`socials.[${index}].name`}
                                    />
                                </Field>
                                <Field label='Add Social URL'>
                                    <input
                                        className={cn(
                                            "border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        )}
                                        type='text'
                                        {...register(`socials.[${index}].url`)}
                                        id={`socials.[${index}].url`}
                                        name={`socials.[${index}].url`}
                                    />
                                </Field>
                                <button
                                    onClick={() => remove(index)}
                                    className='ml-2 mt-6  font-bold  text-red-500 p-1 rounded-lg'>
                                    x
                                </button>
                            </div>
                        );
                    })}
                    <button
                        onClick={() => append({ name: "", url: "" })}
                        className='ml-2 mt-5 bg-gray-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg'>
                        Add Fields
                    </button>
                </FieldSet>
                <button className=' ml-2 mt-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg'>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
