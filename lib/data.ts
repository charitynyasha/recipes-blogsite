import connectDB from "@/db";
import foodItemModel from "@/models/foodItem";
import { FoodItem } from "@/types/food";

/**
 * Fetches all food items from the database.
 * This function is designed to be used directly in Server Components.
 * @returns A promise that resolves to an array of FoodItem objects.
 */
export async function getFoodItems(): Promise<FoodItem[]> {
  await connectDB();

  // Using .lean() for performance is great.
  // The data is fetched as plain JavaScript objects.
  const foodItems = await foodItemModel.find({}).lean().exec();

  // JSON.parse(JSON.stringify(...)) is a robust way to ensure deep serialization,
  // especially for converting complex Mongoose types like ObjectIds to strings.
  // This is a safe and correct approach for Server-to-Client Component boundaries.
  return JSON.parse(JSON.stringify(foodItems));
}
