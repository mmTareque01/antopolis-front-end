"use client";
import React from "react";
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
import { CALL_CREATE_ANIMAL } from "@/apis/animal.apis";

interface animalData {
  categoryId: string;
  name: string;
  image?: any;
}

export default function AddAnimal({ categories, setAnimals }: any) {
  const [animal, setAnimal] = React.useState<animalData>({
    categoryId: "",
    name: "",
    image:""
  });
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleCreateAnimal = async () => {
    CALL_CREATE_ANIMAL(animal)
      .then((res) => {
        setAnimals(res.data);
        setSuccess("Animal created successfully!");
        setError("");
      })
      .catch((error) => {
        setSuccess("");
        setError("Creating animal failed!");
      });
  };
  return (
    <DialogContent className="bg-white  sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Animal</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {error ? <p className="text-red-500 text-center">{error}</p> : null}

        {success ? (
          <p className="text-green-500 text-center">{success}</p>
        ) : null}

        <select
          onChange={(e) => {
            // alert(e.target.value);
            setAnimal({ ...animal, categoryId: e.target.value[0] });
          }}
          className="py-2 rounded-xl px-2"
          name="cars"
          id="cars"
        >
          <option value="volvo">Select a category</option>
          {categories?.map((category: any, idx: number) => (
            <option
              key={idx}
              className="capitalize py-2 my-2"
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <Input
          id="name"
          onChange={(e) => {
            setAnimal({ ...animal, name: e.target.value });
          }}
          placeholder="Name"
          className="rounded-xl"
          defaultValue={animal.name}
        />

        <Input
          type="file"
          onChange={(e) => {
            setAnimal({ ...animal, image: e.target.files });
          }}
          id="name"
          placeholder="Name"
          className="rounded-xl"
        />

        <Button
          onClick={() => {
            // console.log(animal);
            handleCreateAnimal();
          }}
          className=" rounded-xl bg-gray-300"
          type="submit"
        >
          Save
        </Button>
      </div>
    </DialogContent>
  );
}
