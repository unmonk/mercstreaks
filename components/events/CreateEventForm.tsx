"use client";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { League } from "@/config/sports";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";

const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
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
    <Card className="p-2">
      <CardTitle className="p-2">Create Event</CardTitle>
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
          <Label htmlFor="league">League</Label>
          <Select>
            <SelectTrigger className="w-[180px]" id="league">
              <SelectValue placeholder="OTHER" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(League).map((key) => {
                return (
                  <SelectItem value={key} key={key}>
                    {key}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {errors.league && <span>This field is required</span>}
          <div className="mt-2 flex flex-row justify-center">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEventForm;