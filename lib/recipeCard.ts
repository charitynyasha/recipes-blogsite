import connectDB from "@/db";
import recipeCardModel from "@/models/recipeCard";

export type RecipeCardItem = {
  _id: string;
  title: string;
  imgSrc: string;
};

export async function getRecipeCards(): Promise<RecipeCardItem[]> {
  await connectDB();
  const docs = await recipeCardModel.find({}).lean().exec();
  return docs.map((d: any) => ({
    _id: String(d._id),
    title: String(d.title ?? ""),
    imgSrc: String(d.imgSrc ?? ""),
  }));
}
