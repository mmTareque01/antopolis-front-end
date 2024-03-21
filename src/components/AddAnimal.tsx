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
import Loading from "./Loading";

interface animalData {
  category_id: string;
  name: string;
  image?: any;
}

export default function AddAnimal({ categories, setAnimals }: any) {
  const [animal, setAnimal] = React.useState<animalData>({
    category_id: "",
    name: "",
    image: "",
  });
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleCreateAnimal = async () => {
    setLoading(true);
    if (animal.category_id && animal.name && animal.image) {
      CALL_CREATE_ANIMAL(animal)
        .then((res) => {
          setAnimals([res.data]);
          // console.log(res.data)
          setSuccess("Animal created successfully!");
          setError("");
          setLoading(false);
        })
        .catch((error) => {
          setSuccess("");
          setError("Creating animal failed!");
          setLoading(false);
        });
    }

    if (!animal.category_id) {
      setError("Category is not selected!");
    }
    if (!animal.name) {
      setError("Name is blank.");
    }
    if (!animal.image) {
      setError("Please select an image.");
    }
    
    return;
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
            setAnimal({ ...animal, category_id: e.target.value });
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
              value={category.category_id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <Input
          id="name"
          onChange={(e: any) => {
            setAnimal({ ...animal, name: e.target.value });
          }}
          placeholder="Name"
          className="rounded-xl"
          defaultValue={animal.name}
          required
        />

        <Input
          required
          type="file"
          onChange={(e: any) => {
            setAnimal({ ...animal, image: e.target.files[0] });
          }}
          id="name"
          placeholder="Name"
          className="rounded-xl"
        />

        {loading ? (
          <div className="block inline h-[100px]">
            <Loading />
          </div>
        ) : null}

        <Button
          disabled={loading}
          onClick={() => {
            // console.log(animal);
            setLoading(true)
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
