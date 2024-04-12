import React from 'react'
import { useForm } from "react-hook-form";

const UseFormHookDemo = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const handleLogin = () => { };


    return (
        <div>UseFormHookDemo

            <form onSubmit={handleSubmit(handleLogin)}>
                <input defaultValue="test" {...register("example")} />

               
                <input {...register("exampleRequired", { required: true })} />
                
                {errors.exampleRequired && <span>This field is required</span>}


                {/* <input type="email" name="email" {...register("email", { required: true, maxLength })}></input> */}
                <input type='email' name="email" {...register("email")}></input>
                <input type='Password' name="password" {...register("Password")}></input>
                <input type='submit'></input>



            </form>
        </div>
    )
}

export default UseFormHookDemo