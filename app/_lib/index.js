import { CiAlarmOn } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa";

export const navSkills = [
  {
    id: 1,
    text: "Home",
    url: "/",
  },
  {
    id: 2,
    text: "About",
    url: "/about",
  },
  {
    id: 3,
    text: (
      <>
        <div className="flex justify-center items-center">
          <span>Recepies</span>
        </div>
      </>
    ),
    url: "/recipes",
    hasDropdown: true,
    dropdownItems: [
      { id: 1, text: "BREAD", url: "/recipes/bread" },
      { id: 2, text: "AP", url: "/recipes/appetizer" },
      { id: 3, text: "BREAKFAST", url: "/recipes/breakfast" },
      { id: 4, text: "MAIN DISHES", url: "/recipes/main-dishes" },
      { id: 5, text: "HEALTHY", url: "/recipes/healthy" },
      { id: 6, text: "VEGETARIAN", url: "/recipes/vegetarian" },
      { id: 7, text: "INSTANT POT", url: "/recipes/instant-pot" },
      { id: 8, text: "DESSERT", url: "/recipes/dessert" },
    ],
  },

  {
    id: 4,
    text: (
      <>
        <div className="flex justify-center items-center">
          <span>Recepies</span>{" "}
        </div>
      </>
    ),
    url: "/books",
    hasDropdown: true,
    dropdownItems: [
      { id: 1, text: "HEALTHY LIVING COOKBOOK", url: "/books/healthy-living" },
      {
        id: 2,
        text: "SWEETS & DESSERTS DELIGHTS",
        url: "/books/sweets-and-desserts",
      },
      {
        id: 3,
        text: "EXPLORING FLAVORS:HOME COOKING",
        url: "/books/exploring-flavors",
      },
    ],
  },
  {
    id: 5,
    text: "Contact ",
    url: "/contact",
  },
];

export const recipeData = [
  {
    id: 1,
    type: "Bread",

    time: "35 MINUTES",
    people: "8-10 PEOPLE",
    level: "EASY",

    title: "Cheddar Jalapeno Cornbread",
    desc: "A savory cornbread with a kick,featuring melted cheddar cheese and...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977426/cheddar_cornbread_wihauj.avif",
  },
  {
    type: "HEALTHY",

    time: "25 MINUTES",
    people: "4 PEOPLE",
    level: "EASY",

    title: "Quinoa and Chickpea Salad",
    desc: "A protein-packed salad with quinoa,chickpeas, and a variety of fresh...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977457/chickpea_bowl_jx6wdu.avif",
  },
  {
    type: "MAIN DISHES ",

    time: "20 MINUTES",
    people: "2 PEOPLE",
    level: "EASY",

    title: "Teriyaki Salmon with Broccoli",
    desc: "Succulent teriyaki-glazed salmon fillets served with streamed broccoli for a...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977519/brocolli_qfravl.avif",
  },
  {
    type: "INSTANT POT",

    time: "35 MINUTES",
    people: "4-6 PEOPLE",
    level: "MEDIUM",

    title: "Beef and Vegetable Stew",
    desc: "Hearty and flavourful stew made with tender beef,assorted vegetables, and...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756985844/beef_stew_y93vsi.avif",
  },
  {
    type: "HEALTHY",

    time: "20 MINUTES",
    people: "2 PEOPLE",
    level: "EASY",

    title: "Greek Chicken Salad",
    desc: "A vibrant and protein-packed salad with grilled chicken,cherry tomatoes...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977610/green_chickpea_salad_ctzvdn.avif",
  },
  {
    type: "VEGETARIAN",

    time: "45 MINUTES",
    people: "3-4 PEOPLE",
    level: "MEDIUM",

    title: "Eggplant Parmesan",
    desc: "Slices of eggplant layered with marinara sauce and melted cheese...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756988790/eggplant_parsmasan_zzlydl.avif",
  },
  {
    type: "BREAKFAST",

    time: "5 MINUTES",
    people: "1 PERSON",
    level: "EASY",

    title: "Caprese Skewers",
    desc: "Elegant and refreshing skewers featuring cherry tomatoes,fresh...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977868/blueberry_overnight_oats_kzu6ne.avif",
  },
  {
    type: "APPETIZER",

    time: "15 MINUTES",
    people: "6 PEOPLE",
    level: "EASY",

    title: "Blueberry Almond Overnight Oats",
    desc: "A delightful and nutritious overnight oats recipe with the sweetness of...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977886/caprese_q0kdkj.avif",
  },
  {
    type: "HEALTHY",

    time: "35 MINUTES",
    people: "8-10 PEOPLE",
    level: "EASY",

    title: "Quinoa and Black Bean Stuffed Sweet Potatoes",
    desc: "Nutrient-packed sweet potatoes filled with a savoury mixture of quinoa,black...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756990425/quinoa_potatoes_imfhaq.avif",
  },
  {
    type: "DESSERT",

    time: "35 MINUTES",
    people: "8-10 PEOPLE",
    level: "EASY",

    title: "Classic Chocolate Chip Cookies",
    desc: "Homemade chocolate chip cookies with a perfect balance of chewy and...",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977908/chocolate_chip_av3sfs.avif",
  },
];

export const recipeImage = [
  {
    title: "BREAD",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318118/bread_wtkt3p.avif",
  },
  {
    title: "APPETIZER",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318143/appetiser_qs63ca.avif",
  },
  {
    title: "BREAKFAST",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318174/breakfast_x36ku2.avif",
  },
  {
    title: "MAIN DISHES",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318206/main_dishes_lp9c24.avif",
  },
  {
    title: "HEALTHY",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318235/healthy_w9we2b.avif",
  },
  {
    title: "VEGETARIAN",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318310/green_vegetables_zfufbb.avif",
  },
  {
    title: "INSTANT POT",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318333/taco_xkqm4a.avif",
  },
  {
    title: "DESSERT",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757318403/dessert_ds9nu0.avif",
  },
];

export const cookBooks = [
  {
    title: "HEALTHY LIVING COOKBOOK",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757424936/healthy_living_sfmsi0.avif",
    desc: "Indulge in balanced and nourishing meals.",
  },
  {
    title: "SWEETS & TREATS DELIGHTS",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757424905/sweets_uubkgp.avif",
    desc: "Saviour irresistibly sweet delighs.",
  },
  {
    title: "EXPLORING FLAVORS:HOME COOKING",
    imgSrc:
      "https://res.cloudinary.com/dxcmuocjm/image/upload/v1757424853/exploring_o9crk8.avif",
    desc: "Exploring an array of recipes crafted for home kitchens.",
  },
];

export const popularRecipes = [
  {
    title: "MAIN DISHES",
    desc: "Shrimp Scampi Pasta",
    imgSrc: (
      <div className="h-[100px] w-[120px] rounded-2xl border-2 border-[#BCA067] bg-white">
        <img
          src="https://res.cloudinary.com/dxcmuocjm/image/upload/v1757508995/shrimp_rx2oed.avif"
          alt=""
          className="object-center object-cover rounded-2xl  h-full w-full"
        />
      </div>
    ),
  },

  {
    title: "APPETIZER",
    desc: "Caprese Skewers with Balsamic Glaze",
    imgSrc: (
      <div className="h-[100px] w-[215px]  ">
        <img
          src="https://res.cloudinary.com/dxcmuocjm/image/upload/v1757509026/caprese_skewers_vm7g3w.avif"
          alt=""
          className="w-full h-full object-cover object-center rounded-2xl border-2 border-[#BCA067]"
        />
      </div>
    ),
  },
  {
    title: "BREAKFAST",
    desc: "Overnight Oats with Berries",
    imgSrc: (
      <div className="h-[100px] w-[160px]  ">
        <img
          src="https://res.cloudinary.com/dxcmuocjm/image/upload/v1757509096/overnight_oats_ctbdox.avif"
          alt=""
          className="w-full h-full object-cover object-center rounded-2xl border-2 border-[#BCA067]"
        />
      </div>
    ),
  },
  {
    title: "DESSERT",
    desc: "Chocolate Avocado Mousse",
    imgSrc: (
      <div className="h-[100px] w-[160px]">
        <img
          src="https://res.cloudinary.com/dxcmuocjm/image/upload/v1757509128/chocolate_avacado_jzycmr.avif"
          alt=""
          className="object-cover object-center h-full w-full rounded-2xl border-2 border-[#BCA067]"
        />
      </div>
    ),
  },
];

export const categories = [
  "BREAD",
  "APPETIZER",
  "BREAKFAST",
  "MAIN DISHES",
  "HEALTHY",
  "VEGETARIAN",
  "INSTANT POT",
  "DESSERT",
];
