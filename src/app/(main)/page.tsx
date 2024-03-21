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
import { responseCode } from "@/apis/config";
import Loading from "@/components/Loading";

interface Animal {
  name: string;
  image_url: string;
  _id: string;
}

interface AnimalData {
  category: string;
  animal: Animal;
}

export default function Home() {
  const [category, setCategory] = React.useState([]);
  const [animals, setAnimals] = React.useState<AnimalData[]>([]);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await CALL_GET_CATEGORIES();
        console.log(categoryData);
        setCategory(categoryData);
      } catch (error) {
        console.log("erorr ");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory(); // Call fetchData when the component mounts
  }, []);

  console.log("query=> ", query);

  React.useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animalData = await CALL_GET_ANIMALS(query);

        if (animalData.status != responseCode.success_status) {
          setError(animalData.message);
          console.log("inside error");
          setAnimals(animalData.data);
          return;
        }
        console.log(animalData.status);
        setAnimals(animalData.data);
        setError("");
      } catch (error) {
        console.error("Error fetching categories:", error);
        console.log("heer");
        // Handle errors, e.g., display error message to the user
        setError("Something went wrong!");
      }
    };

    fetchAnimals(); // Call fetchData when the component mounts
    setLoading(false);
  }, [query]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="auto w-[1250px] bg-red[500] px-5 py-7 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 p-4 flex flex-wrap">
            <Category
              key={""}
              category={"all"}
              id=""
              handleAnimal={(q: string) => {
                setQuery(q);
              }}
              active={query ? false : true}
            />
            {category.map((itm: { category_id: string; name: string }) => (
              <Category
                key={itm.category_id}
                category={itm.name}
                id={itm.category_id}
                handleAnimal={(q: string) => {
                  setLoading(true);
                  setQuery(q);
                }}
                active={itm.category_id == query}
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
                setAnimals={(data: Array<AnimalData>) => {
                  setAnimals([...animals, ...data]);
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
        {/* {error ? <p className="text-red-500 text-center">{error}</p> : <span>dlsdf</span>}
         */}
        <p className="text-red-500 text-center">{error}</p>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap justify-center">
            {animals?.map(({ animal, category }: any) => (
              <ImageBox
                key={animal?._id}
                src={animal?.image_url}
                alt={category}
                caption={animal?.name}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
