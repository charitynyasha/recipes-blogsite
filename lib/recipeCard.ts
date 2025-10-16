import connectDB from "@/db";
import recipeCardModel from "@/models/recipeCard";

export type RecipeCardItem = {
  _id: string;
  title: string;
  imgSrc: string;
};

export async function getRecipeCards(): Promise<RecipeCardItem[]> {
  await connectDB();
  const docs = (await recipeCardModel.find({}).lean().exec()) as Array<{
    _id: unknown;
    title?: unknown;
    imgSrc?: unknown;
  }>;

  return docs.map((d) => ({
    _id: String(d._id),
    title: typeof d.title === "string" ? d.title : "",
    imgSrc: typeof d.imgSrc === "string" ? d.imgSrc : "",
  }));
}
