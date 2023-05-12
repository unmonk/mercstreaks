"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  //Fields:
  return (
    <Card>
      <CardTitle>Create Event</CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Event Question"
            {...register("description", {
              required: true,
              maxLength: 128,
              minLength: 2,
            })}
          />
          {errors.eventName && <span>This field is required</span>}
          <Input
            type="text"
            placeholder="Left Option"
            {...register("leftOption", { required: true, maxLength: 128 })}
          />
          {errors.leftOption && <span>This field is required</span>}
          <Input
            type="text"
            placeholder="Right Option"
            {...register("rightOption", { required: true, maxLength: 128 })}
          />
          {errors.rightOption && <span>This field is required</span>}
          <Input
            type="datetime-local"
            {...register("startTime", { required: true, valueAsDate: true })}
          />
          {errors.startTime && <span>This field is required</span>}
          <Input
            type="datetime-local"
            {...register("endTime", { required: true, valueAsDate: true })}
          />
          {errors.endTime && <span>This field is required</span>}
          <Button type="submit">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEventForm;
