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

  // .lean() returns plain JavaScript objects, which is faster for read-only queries.
  const foodItems = await foodItemModel.find({}).lean();

  // Ensure data is serializable by converting Mongoose documents (including ObjectIds) to plain JSON.
  // This is crucial for passing data from Server Components to Client Components.
  return JSON.parse(JSON.stringify(foodItems));
}
