import React from "react";

export default function MealDetailsPage({ params }) {
  return (
    <div>
      <h1>Meal Detais page</h1>
      <p>{params.slug}</p>
    </div>
  );
}
