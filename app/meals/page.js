import Link from "next/link";
import React, { Suspense } from "react";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getAllMeals } from "@/lib/meals";
import LoadingMeals from "./loading-meals";

async function Meals() {
  const meals = await getAllMeals();
  return <MealsGrid meals={meals} />;
}

export const metadata = {
  title: "All meals",
  description: "Browse delicious meals shared by our vibrant community.",
};

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, create{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<LoadingMeals />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
