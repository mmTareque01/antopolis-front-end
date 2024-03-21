"use client";
import Category from "@/components/Category";
import ImageBox from "@/components/ImageBox";

import { Button } from "@/components/ui/button";
import Image from "next/image";

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
import AddCategory from "@/components/AddCategory";
import AddAnimal from "@/components/AddAnimal";
import { CALL_GET_CATEGORIES } from "@/apis/category.apis";
import React from "react";
import { CALL_GET_ANIMALS } from "@/apis/animal.apis";
import { it } from "node:test";
import { responseCode } from "@/apis/config";

export default function Home() {
  const [category, setCategory] = React.useState([]);
  const [animals, setAnimals] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await CALL_GET_CATEGORIES();
        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle errors, e.g., display error message to the user
      }
    };

    fetchCategory(); // Call fetchData when the component mounts
  }, []);

  React.useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animalData = await CALL_GET_ANIMALS(query);

        if (animalData.status !== responseCode.success_status) {
          setError(animalData.message);
          console.log(animalData);
        }

        setAnimals(animalData.data);
        setError("");
      } catch (error) {
        console.error("Error fetching categories:", error);
        console.log("heer");
        // Handle errors, e.g., display error message to the user
      }
    };

    fetchAnimals(); // Call fetchData when the component mounts
  }, [query]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="auto max-w-[1250px] bg-red[500] px-5 py-7 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 p-4 flex flex-wrap">
            <Category
              key={""}
              category={"all"}
              id=""
              handleAnimal={(q: string) => {
                setQuery(q);
              }}
            />
            {category.map((itm: { _id: string; name: string }) => (
              <Category
                key={itm._id}
                category={itm.name}
                id={itm._id}
                handleAnimal={(q: string) => {
                  setQuery(q);
                }}
              />
            ))}
          </div>
          <div className="col-span-4  p-4 flex-auto flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mx-2 border-custom" variant="outline">
                  Add Animal
                </Button>
              </DialogTrigger>
              <AddAnimal
                categories={category}
                setAnimals={(data: any) => {
                  setAnimals({ ...animals, ...data });
                }}
              />
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mx-2 border-custom" variant="outline">
                  Add Category
                </Button>
              </DialogTrigger>
              <AddCategory
                setCategoryData={(data: []) => {
                  // category.push(data);
                  console.log(data);
                  setCategory([...category, ...data]);
                }}
              />
            </Dialog>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {error ? <p className="text-red-500 text-center">{error}</p> : null}
          {animals?.map(({ animal, category }: any) => (
            <ImageBox
              key={animal?._id}
              src={animal?.image_url}
              alt={category}
              caption={animal?.name}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
