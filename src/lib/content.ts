export const benefitStrip = [
  { label: "Vegan", icon: "leaf" },
  { label: "Gluten-Free", icon: "grain" },
  { label: "Grain-Free", icon: "seed" },
  { label: "No Refined Carbs", icon: "spark" },
  { label: "Organic", icon: "certified" },
  { label: "Paleo-Friendly", icon: "stone" },
] as const;

export const whyPlantraw = [
  {
    n: "01",
    title: "Whole Ingredients",
    body: "Ingredients selected for nutrition, flavor and integrity — whole organic dates instead of sugar, unprocessed cocoa paste instead of chocolate compound.",
    image: "/images/lifestyle/dates.jpg",
  },
  {
    n: "02",
    title: "Minimally Processed",
    body: "We use gentle methods such as dehydration to preserve the qualities we value. Nothing is baked, Dutch-processed or otherwise denatured.",
    image: "/images/founder-workshop.jpg",
  },
  {
    n: "03",
    title: "No Unnecessary Additives",
    body: "Simple ingredients. Thoughtful formulations. Nothing added just because it's conventional — no preservatives, no additives, no anti-caking agents in our salt.",
    image: "/images/lifestyle/seeds-spoons.jpg",
  },
  {
    n: "04",
    title: "Flavor First",
    body: "Healthy food should still be something you genuinely crave. We reformulate until it tastes like a treat, not like a compromise.",
    image: "/images/chocolith-editorial.jpg",
  },
] as const;

export const ingredients = [
  {
    id: "dates",
    name: "Whole Organic Dates",
    role: "The only sweetener in most of our products",
    why: "We use whole organic dates — never date syrup — so the fruit's dietary fiber stays in the snack. That fiber slows digestion, which is why dates have a gentler glycemic load than refined sugar, honey or maple syrup.",
    products: ["Chocolith® — Dark", "Granola — Original", "Coconut-Date Rolls"],
    image: "/images/lifestyle/dates-close.jpg",
    tone: "#8A5A33",
  },
  {
    id: "cocoa-paste",
    name: "Unprocessed Cocoa Paste",
    role: "100% chocolate, never Dutched",
    why: "Our cocoa paste comes from Peru and is lab-tested for heavy metals, with a certificate of analysis on each delivery. We never Dutch-process it, so its flavanols and micronutrients remain intact and bioavailable.",
    products: ["Chocolith® — Almonds", "Granola — Chocolate", "Coconut Keto Cookies"],
    image: "/images/chocolith-editorial.jpg",
    tone: "#3A241A",
  },
  {
    id: "cocoa-nibs",
    name: "Cocoa Nibs",
    role: "Crunch, bitterness, character",
    why: "Cracked raw cacao beans give Chocolith® Nibs their bite and bring the same flavanols and theobromine that occur naturally in raw cacao.",
    products: ["Chocolith® — Nibs"],
    image: "/images/ingredients-hero.jpg",
    tone: "#4A2E20",
  },
  {
    id: "almonds",
    name: "Sprouted Almonds",
    role: "Protein, minerals and structure",
    why: "We soak our almonds and seeds to deactivate phytates and other naturally occurring anti-nutrients. Also known as sprouting, this enhances mineral absorption so the nutrients in our products are as bioavailable as possible.",
    products: ["Chocolith® — Almonds", "Complete Crackers", "Granola"],
    image: "/images/lifestyle/almonds.jpg",
    tone: "#A0764A",
  },
  {
    id: "pecans",
    name: "Pecans",
    role: "Buttery richness",
    why: "Pecans carry the flavor in Chocolith® Keto and our granolas, and contribute fiber and minerals to the base.",
    products: ["Chocolith® — Keto", "Granola — Original", "Granola — Coconut"],
    image: "/images/lifestyle/mixed-nuts.jpg",
    tone: "#7A4E2B",
  },
  {
    id: "seeds",
    name: "Sunflower & Pumpkin Seeds",
    role: "Minerals and texture",
    why: "Seed-heavy bases let us build crackers and granola without grains, while keeping zinc, magnesium and phosphorus in the finished snack.",
    products: ["Complete Crackers", "Ginger Snaps", "Granola"],
    image: "/images/lifestyle/seeds-spoons-2.jpg",
    tone: "#6E6A44",
  },
  {
    id: "flax-chia",
    name: "Flaxseed & Chia",
    role: "Omega-3 (ALA) and fiber",
    why: "Golden flaxseed and chia give our crackers their structure and make them a good source of ALA Omega-3 and dietary fiber — without a single grain.",
    products: ["Complete Crackers", "Ginger Snaps", "Chocolith® — Dubai"],
    image: "/images/lifestyle/chia.jpg",
    tone: "#5C5A46",
  },
  {
    id: "kale",
    name: "Organic Kale",
    role: "Quietly nutrient-dense",
    why: "Kale appears across our granolas, crackers and even our keto truffles. It is mild in these quantities and brings vitamins, minerals and antioxidants that a conventional snack would never carry.",
    products: ["Granola", "Complete Crackers", "Chocolith® — Keto"],
    image: "/images/ingredients-hero.jpg",
    tone: "#4C5F3C",
  },
  {
    id: "blueberries",
    name: "Blueberries",
    role: "Fruit and polyphenols",
    why: "Whole organic blueberries give Chocolith® Keto its fruit character, alongside the pecans and cocoa paste.",
    products: ["Chocolith® — Keto"],
    image: "/images/lifestyle/berries.jpg",
    tone: "#4A4A63",
  },
  {
    id: "tomatoes",
    name: "Sun-Dried Tomatoes",
    role: "Umami in a sweet aisle snack",
    why: "Organic tomatoes are the savory backbone of our crackers and ginger snaps, and they appear in our keto cookies too — part of how we build flavor without sugar.",
    products: ["Complete Crackers", "Ginger Snaps", "Coconut Keto Cookies"],
    image: "/images/crackers-editorial.jpg",
    tone: "#96412C",
  },
  {
    id: "acerola",
    name: "Acerola Cherry",
    role: "A natural source of vitamin C",
    why: "Acerola cherry is one of the richest plant sources of vitamin C. It appears in small amounts across the range, including our granolas and crackers.",
    products: ["Granola", "Complete Crackers", "Chocolith® — Almonds"],
    image: "/images/ingredients-hero.jpg",
    tone: "#A33E45",
  },
] as const;

export const testimonials = [
  {
    quote:
      "So glad I ordered the almond chocoliths. Literally like a healthy candy bar. Serving size should be changed to half the bag because I cannot stop eating them! Everything Plantraw makes is amazing!!",
    name: "S.P.",
    location: "via email",
    topic: "Chocolith® — Almonds",
  },
  {
    quote:
      "I'm spoiled now! Never start a single day without your products. Even travel with them — like on my trip last week to London!",
    name: "K.S.",
    location: "New York, NY",
    topic: "Everyday snacking",
  },
  {
    quote:
      "Perfect little chocolate balls of joy. Clean ingredients, sweet taste but not overwhelming, and texture like cake. I've spent well over $100 in about a month on 3 different orders and I plan to order again soon.",
    name: "B.Y.",
    location: "via email",
    topic: "Chocolith® — Dark",
  },
  {
    quote:
      "We have a problem — how to stop eating the granola. It was so fresh and made both my wife and I perk up at the end of a very long day. The freshness and wholesomeness of the product is incredible.",
    name: "R.R.",
    location: "Alexandria, VA",
    topic: "Granola — Original",
  },
  {
    quote:
      "I have never in my life loved a snack like I love your ginger snaps!!! I look forward to them every night and even my husband knows they're my happy thing. I won't even travel without them!!!",
    name: "K.H.",
    location: "Hoboken, NJ",
    topic: "Ginger Snaps",
  },
  {
    quote:
      "HUGE fan!! I'm very conscientious of what I put in my body so to find products that taste amazing while also being super healthy is awesome.",
    name: "Mabel C.",
    location: "Nashville, TN",
    topic: "The whole range",
  },
  {
    quote: "I am blown away by how delicious it is, satisfying, nourishing and not overly sweet.",
    name: "P.G.",
    location: "Lakewood, NJ",
    topic: "Chocolith®",
  },
  {
    quote:
      "My wife and I absolutely love the Za'atar & Onion Dehydrated Crackers.",
    name: "H.B., DDS",
    location: "FL",
    topic: "Complete Crackers",
  },
  {
    quote:
      "This is the best granola I have ever tasted in my whole life.",
    name: "Two ShopRite staff members",
    location: "at separate demos",
    topic: "Granola",
  },
  {
    quote:
      "I found you guys over the weekend and I'm OBSESSED with your ingredients and the flavors.",
    name: "E.S.",
    location: "Somerville, NJ",
    topic: "Ingredients",
  },
  {
    quote:
      "I have a background in nutrition and I appreciate finding this company.",
    name: "A.E.",
    location: "via social media",
    topic: "Nutrition",
  },
  {
    quote:
      "If you are looking for healthy and minimally processed foods that taste amazing, you've got to check out the products that Plantraw offers. We've tried their truffles, chips, and granola so far. And are loving them!!!!",
    name: "Paula S.",
    location: "via social media",
    topic: "The whole range",
  },
] as const;

export type Article = {
  slug: string;
  title: string;
  category: "Nutrition" | "Ingredients" | "Healthy Snacking" | "Recipes" | "Wellness" | "Behind the Brand";
  standfirst: string;
  minutes: number;
  image: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "why-we-dont-use-refined-sugar",
    title: "Why We Don't Use Refined Sugar",
    category: "Ingredients",
    standfirst:
      "We also avoided honey, coconut nectar and maple syrup. Here's the reasoning — and what we use instead.",
    minutes: 4,
    image: "/images/lifestyle/dates-close.jpg",
    body: [
      {
        heading: "Sugar by any other name",
        paragraphs: [
          "In crafting our snacks we avoided refined sugar, honey, coconut nectar, maple syrup, or any other substance that may spike blood glucose. Sweetness is not the problem on its own; the speed at which it hits your bloodstream is.",
          "Liquid sweeteners are often marketed as natural, and they are. That does not change how they behave once eaten.",
        ],
      },
      {
        heading: "So we use the whole fruit",
        paragraphs: [
          "Our products are sweetened with whole organic dates, whose dietary fiber slows digestion for a healthy glycemic load. Because the date is still intact, its fiber comes along with its sugar.",
          "In our keto products we use organic allulose alongside dates. Both help keep blood glucose level, and stevia leaf has no impact.",
        ],
      },
      {
        heading: "What that means on the label",
        paragraphs: [
          "Every Plantraw product carries 0g refined carbs. Where a product is keto, we publish the net-carb arithmetic on the product page — total carbs, minus fiber, minus allulose.",
        ],
      },
    ],
  },
  {
    slug: "what-minimally-processed-means",
    title: "What \"Minimally Processed\" Actually Means",
    category: "Nutrition",
    standfirst: "It's a claim a lot of brands make. Here is precisely what we do — and don't do — to our ingredients.",
    minutes: 5,
    image: "/images/founder-workshop.jpg",
    body: [
      {
        heading: "The word \"processed\" is doing too much work",
        paragraphs: [
          "Cutting a date is processing. So is dehydrating it. The meaningful question is whether a method strips nutrients out or denatures the food.",
        ],
      },
      {
        heading: "What we do",
        paragraphs: [
          "We soak our almonds and seeds to deactivate the phytate and other anti-nutrients that naturally occur in them. This process, also known as sprouting, enhances mineral absorption so the nutrients in our products are as bioavailable as possible.",
          "We dehydrate our granolas, crackers and chips instead of baking them, to preserve their vitamins and enzymes.",
          "We don't heat treat our Chocolith® or our cookies, and we don't denature them in any other way. We simply mix raw plant ingredients together.",
        ],
      },
      {
        heading: "What we don't do",
        paragraphs: [
          "No Dutch processing of our cocoa paste. No heat treatment of our truffles. No anti-caking agents in our iodized salt. No preservatives, no additives, and no added sugar.",
        ],
      },
    ],
  },
  {
    slug: "why-we-dehydrate",
    title: "Why We Dehydrate Instead of Bake",
    category: "Behind the Brand",
    standfirst: "Baking is faster. Dehydration preserves more. That trade is the whole company.",
    minutes: 4,
    image: "/images/crackers-editorial.jpg",
    body: [
      {
        heading: "Heat is the enemy of micronutrients",
        paragraphs: [
          "Vitamins, enzymes and certain phytonutrients are heat-sensitive. Bake a seed cracker at a conventional temperature and you trade crunch for nutritional value.",
        ],
      },
      {
        heading: "Our approach",
        paragraphs: [
          "We spread our granolas and crackers onto trays and hold them at low temperature for hours, until they are crisp and shelf-stable. It takes far longer than baking. It keeps far more.",
          "The result is a cracker that is a good source of Omega-3 (ALA), dietary fiber, plant-based protein, minerals and antioxidants — because none of that was cooked out of it.",
        ],
      },
    ],
  },
  {
    slug: "understanding-grain-free-snacking",
    title: "Understanding Grain-Free Snacking",
    category: "Healthy Snacking",
    standfirst: "Grain-free is not the same as gluten-free, and neither is the same as low-carb.",
    minutes: 5,
    image: "/images/granola-editorial.jpg",
    body: [
      {
        heading: "Three different ideas",
        paragraphs: [
          "Gluten-free removes specific proteins found in wheat, barley and rye. Grain-free removes all grains, including rice, corn and oats. Low-carb restricts total carbohydrates regardless of their source.",
          "A snack can be gluten-free and still be a grain snack. Ours are grain-free and gluten-free, and several are also keto.",
        ],
      },
      {
        heading: "How we build structure without grains",
        paragraphs: [
          "Almonds, flaxseed and chia do the structural work that oats would normally do in a granola, and that flour would do in a cracker. Seeds bind when dehydrated; nuts provide the body.",
        ],
      },
      {
        heading: "Our facility",
        paragraphs: [
          "Everything we make is produced in a dedicated gluten-free, grain-free, peanut-free and dairy-free facility. There is no cross-contact to manage, because the allergens aren't in the building.",
        ],
      },
    ],
  },
  {
    slug: "how-we-choose-ingredients",
    title: "How We Choose Ingredients",
    category: "Ingredients",
    standfirst: "Sourcing decisions, spelled out — including the paperwork behind our cocoa paste.",
    minutes: 4,
    image: "/images/lifestyle/mixed-nuts.jpg",
    body: [
      {
        heading: "Cocoa paste, from Peru",
        paragraphs: [
          "We source the highest-quality cocoa paste we can find, from Peru. Part of the quality is the flavor, mouthfeel and aroma. The other part is the paucity of heavy metals — our cocoa paste is particularly low in those.",
          "Each batch is lab-tested for heavy metals and other impurities, and we receive a certificate of analysis to that effect with each delivery.",
        ],
      },
      {
        heading: "Organic wherever it exists",
        paragraphs: [
          "Our products are certified organic and kosher. Organic is not a flavor claim; it is a way of keeping synthetic pesticides and fertilizers out of the finished food.",
        ],
      },
      {
        heading: "And what we reject",
        paragraphs: [
          "Refined sugar, honey, coconut nectar, maple syrup, preservatives, additives, anti-caking agents in salt, and any ingredient added simply because it's conventional.",
        ],
      },
    ],
  },
  {
    slug: "the-plantraw-approach-to-nutrition",
    title: "The Plantraw Approach to Nutrition",
    category: "Wellness",
    standfirst: "Delivering nutrition is a concept that barely exists in commercial snacks. We think it should.",
    minutes: 6,
    image: "/images/ingredients-hero.jpg",
    body: [
      {
        heading: "Snacks as food",
        paragraphs: [
          "Commercial snacks constitute, at best, nicely packaged bits of empty calories, and at worst, delivery mechanisms for glucose spikers like sugar, honey and maple syrup.",
          "With ingredients like kale and flaxseed, our granola is far from a mere snack. It is real food — good sources of fiber, protein and essential nutrients that fill, satiate and satisfy.",
        ],
      },
      {
        heading: "What's inside",
        paragraphs: [
          "Our truffles contain 32 vitamins and minerals that occur naturally in their ingredients — from Vitamin A, C, E and K, through the B vitamins, choline and betaine, to calcium, iron, magnesium, phosphorus, potassium, zinc, copper, manganese and selenium.",
          "We don't fortify anything. These are the micronutrients that were already in the plants.",
        ],
      },
      {
        heading: "A note on glycemic load",
        paragraphs: [
          "If you allow yourself dates, mangos and blueberries, you can enjoy our non-keto products. Their fiber slows down carb absorption so you can avoid a blood-sugar spike. For stricter targets, our keto range runs 1.5g to 3.2g net carbs.",
        ],
      },
    ],
  },
];

export const educationCards = articles.map((a) => ({
  slug: a.slug,
  title: a.title,
  category: a.category,
  standfirst: a.standfirst,
  minutes: a.minutes,
  image: a.image,
}));

export const faqs = [
  {
    q: "What sweetens your products?",
    a: "Whole organic dates, and in our keto range, organic allulose (with a small amount of stevia leaf in some flavors). We never use refined sugar, honey, coconut nectar or maple syrup.",
  },
  {
    q: "Is everything gluten-free?",
    a: "Yes. Everything we make is produced in a dedicated gluten-free, grain-free, peanut-free and dairy-free facility, so there is no cross-contact to manage.",
  },
  {
    q: "Are your products keto-friendly?",
    a: "Our keto range — Chocolith® Keto, Mango-Matcha-Keto, Dubai, Salted Almond Crunch and Coconut Keto Cookies — runs from 1.5g to 3.2g net carbs per serving, with 0g refined carbs. Our date-sweetened products, such as Coconut-Date Rolls, are not keto-friendly.",
  },
  {
    q: "Where is your cocoa paste sourced?",
    a: "From Peru. Each batch is lab-tested for heavy metals and other impurities, and we receive a certificate of analysis with each delivery. We never Dutch-process or otherwise denature it.",
  },
  {
    q: "Why dehydrate instead of bake?",
    a: "Dehydration at low temperature preserves vitamins, enzymes and heat-sensitive micronutrients. It takes longer than baking, which is why most snack manufacturers don't do it.",
  },
  {
    q: "How should I store Coconut-Date Rolls?",
    a: "Store refrigerated or frozen, and enjoy at room temperature. They are best within a month of opening.",
  },
  {
    q: "What does kosher certification cover?",
    a: "Our products are certified organic and kosher. One exception: the current batch of Chocolith® Keto is temporarily excluded from our kosher certification because our team washed its blueberries without the supervision of our mashgiach.",
  },
  {
    q: "Do you ship?",
    a: "Yes — free shipping east of the Mississippi on orders of $39 or more.",
  },
];

export const nav = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Chocolith®", href: "/shop/chocolith" },
    { label: "Granola", href: "/shop/granola" },
    { label: "Crackers", href: "/shop/crackers" },
    { label: "Keto", href: "/shop/keto" },
    { label: "Cookies", href: "/shop/cookies" },
    { label: "Date Snacks", href: "/shop/date-snacks" },
    { label: "Ginger Snaps", href: "/shop/ginger-snacks" },
  ],
  learn: [
    { label: "Our Story", href: "/about" },
    { label: "Nutrition", href: "/wellness/the-plantraw-approach-to-nutrition" },
    { label: "Wellness", href: "/wellness" },
    { label: "Ingredients", href: "/#ingredients" },
    { label: "FAQs", href: "/contact#faq" },
  ],
  help: [
    { label: "Contact", href: "/contact" },
    { label: "Shipping", href: "/contact#shipping" },
    { label: "Returns", href: "/contact#returns" },
    { label: "Privacy", href: "/contact#privacy" },
    { label: "Terms", href: "/contact#terms" },
  ],
};
