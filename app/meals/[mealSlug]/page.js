import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug); // Ensure this is awaited if getMeal is asynchronous

  if (!meal) {
    return notFound(); // Return the result of notFound correctly
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.mealSlug); // Await the function call if it's asynchronous

  if (!meal) {
    notFound();
  }

  // Ensure safety when modifying meal instructions
  const formattedInstructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill priority /> {/* Added priority for optimization */}
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: formattedInstructions, // Use the formatted string
          }}
        ></p>
      </main>
    </>
  );
}
