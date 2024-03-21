"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CALL_CREATE_CATEGORIES } from "@/apis/category.apis";
import { responseCode } from "@/apis/config";

export default function AddCategory({ setCategoryData }: any) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.name.length > 1) {
      CALL_CREATE_CATEGORIES({ name: formData.name })
        .then((res) => {
          console.log(res);
          setCategoryData([
            {
              _id: res.data._id,
              name: res.data.name,
            },
          ]);
          // categoryData.push()
          setFormData({ name: "" });
          setError("");
          setSuccess("New Category Created!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSuccess("");
      setError("Name is blank!");
    }
  };
  return (
    <DialogContent className="bg-white  sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {error ? <p className="text-red-500 text-center">{error}</p> : null}
        {success ? (
          <p className="text-green-500 text-center">{success}</p>
        ) : null}
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="rounded-xl"
        />
        <Button
          className=" rounded-xl bg-gray-300 hover:bg-gray-200"
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </Button>
      </div>
    </DialogContent>
  );
}
