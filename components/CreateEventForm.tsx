"use client";
import { FieldValues, useForm } from "react-hook-form";

const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FieldValues) => console.log(data);
  //Fields:
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Event Question"
        {...register("description", { required: true, maxLength: 128 })}
      />
      {errors.eventName && <span>This field is required</span>}
      <input
        type="text"
        placeholder="Left Option"
        {...register("leftOption", { required: true, maxLength: 128 })}
      />
      {errors.leftOption && <span>This field is required</span>}
      <input
        type="text"
        placeholder="Right Option"
        {...register("rightOption", { required: true, maxLength: 128 })}
      />
      {errors.rightOption && <span>This field is required</span>}
      <input
        type="datetime-local"
        {...register("startTime", { required: true, valueAsDate: true })}
      />
      {errors.startTime && <span>This field is required</span>}
      <input
        type="datetime-local"
        {...register("endTime", { required: true, valueAsDate: true })}
      />
      {errors.endTime && <span>This field is required</span>}
      <input type="submit" value="Create Event" />
    </form>
  );
};

export default CreateEventForm;
