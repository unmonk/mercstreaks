"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
import CreateEventForm from "./CreateEventForm";

interface EventModalProps {
  modalType: "create" | "edit";
}

export default function EventModal({ modalType }: EventModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    if (modalType === "create") {
      console.log(data);
      await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (modalType === "edit") {
      console.log(data);
    }
  };
  return (
    <Dialog modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger>
          <Button>{modalType === "edit" ? "Edit" : "Create"}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event</DialogTitle>
            <DialogDescription>
              <div className="flex flex-row">
                <div className="w-1/2">
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
                    {...register("leftOption", {
                      required: true,
                      maxLength: 128,
                    })}
                  />
                  {errors.leftOption && <span>This field is required</span>}
                  <Input
                    type="text"
                    placeholder="Right Option"
                    {...register("rightOption", {
                      required: true,
                      maxLength: 128,
                    })}
                  />
                  {errors.rightOption && <span>This field is required</span>}
                </div>

                <div className="w-1/2">
                  <Input
                    type="datetime-local"
                    {...register("startTime", {
                      required: true,
                      valueAsDate: true,
                    })}
                  />
                  {errors.startTime && <span>This field is required</span>}
                  <Input
                    type="datetime-local"
                    {...register("endTime", {
                      required: true,
                      valueAsDate: true,
                    })}
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
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={() => console.log("here")}>
              {modalType === "edit" ? "Edit" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
