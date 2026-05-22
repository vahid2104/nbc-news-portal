export type NewsItem = {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  timeAgo: string;
  readTime: string;
  likes: number;
  shares: number;
  isBookmarked: boolean;
  isTrending: boolean;
  isBreaking: boolean;
  isLive: boolean;
  isEditorsPick: boolean;
};

export const newsData: NewsItem[] = [
  {
    id: 1,
    title:
      "Cake meme reflects coronavirus absurdity in a world where nothing is what it seems",
    description:
      "Earlier this month, viral videos depicting hyper-realistic cakes as everyday items had folks on social media double-guessing every other post.",
    content:
      "The strange rise of hyper-realistic cake videos became an unexpected symbol of internet culture during the coronavirus period. As people spent more time online, surreal memes and visual tricks spread quickly, reflecting a wider feeling that reality itself had become difficult to read.",
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80",
    category: "Trending",
    author: "Lucy Hiddleston",
    timeAgo: "2 hours ago",
    readTime: "4min read",
    likes: 72,
    shares: 41,
    isBookmarked: false,
    isTrending: true,
    isBreaking: false,
    isLive: false,
    isEditorsPick: false,
  },
  {
    id: 2,
    title: "Kanye West says he’s running for president in 2020",
    description:
      "The artist made the announcement online, creating a wave of reaction across social media and political circles.",
    content:
      "Kanye West's announcement that he would run for president in 2020 immediately became one of the most discussed stories online. Supporters, critics, and political observers debated whether the statement represented a serious campaign or a publicity-driven moment.",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
    category: "Politics",
    author: "NBC News",
    timeAgo: "1 hour ago",
    readTime: "3min read",
    likes: 95,
    shares: 120,
    isBookmarked: false,
    isTrending: false,
    isBreaking: true,
    isLive: false,
    isEditorsPick: false,
  },
  {
    id: 3,
    title: "John Lewis to make final journey across Edmund Pettus Bridge in procession",
    description:
      "The body of the U.S. Rep. John Lewis will travel across the bridge where he helped lead a march for voting rights in 1965.",
    content:
      "John Lewis, a towering figure in the civil rights movement, was honored with a final journey across the Edmund Pettus Bridge. The location carries deep historical meaning because Lewis was brutally beaten there during the 1965 voting rights march known as Bloody Sunday.",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80",
    category: "Latest Stories",
    author: "Lucy Hiddleston",
    timeAgo: "2 hours ago",
    readTime: "4min read",
    likes: 28,
    shares: 72,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: false,
  },
  {
    id: 4,
    title: "John Lewis, civil rights giant, crosses infamous Selma bridge one final time",
    description:
      "Solemn crowds watched as Lewis, who died earlier this month at the age of 80, was carried across Edmund Pettus Bridge.",
    content:
      "Crowds gathered to pay tribute as John Lewis crossed the Edmund Pettus Bridge one final time. The ceremony honored his lifelong commitment to justice, voting rights, and equality in the United States.",
    image:
      "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=1200&q=80",
    category: "Latest Stories",
    author: "Caroline Casey",
    timeAgo: "4 hours ago",
    readTime: "4min read",
    likes: 28,
    shares: 72,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: false,
  },
  {
    id: 5,
    title: "Beloved Arizona coach loses battle with coronavirus",
    description:
      "The local sports community is mourning after a longtime coach died following complications connected to coronavirus.",
    content:
      "A beloved coach from Arizona has died after battling coronavirus. Former players, colleagues, and community members shared memories of his leadership, kindness, and lasting influence on young athletes.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    category: "Live",
    author: "NBC News",
    timeAgo: "3 hours ago",
    readTime: "2min read",
    likes: 54,
    shares: 29,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: true,
    isEditorsPick: false,
  },
  {
    id: 6,
    title: "Tornado tide warning as Storm Hanna lashes Texas",
    description:
      "The storm brought dangerous wind and rain conditions as residents prepared for possible flooding.",
    content:
      "Storm Hanna brought heavy rain, strong winds, and dangerous flooding conditions to parts of Texas. Officials warned residents to stay alert as the storm continued to move inland.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    category: "Weather",
    author: "Lucy Hiddleston",
    timeAgo: "5 hours ago",
    readTime: "4min read",
    likes: 38,
    shares: 72,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: false,
  },
  {
    id: 7,
    title: "20 Years Ago, Steve Jobs built the ‘Coolest Computer Ever’. It Bombed",
    description:
      "This month marks the 20th anniversary of the Power Mac G4 Cube, which debuted July 19, 2000.",
    content:
      "The Power Mac G4 Cube was introduced as a bold and futuristic computer design. Although it attracted attention for its appearance, it struggled commercially and became one of Apple's most famous product misfires.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    category: "Business",
    author: "Lucy Hiddleston",
    timeAgo: "12 hours ago",
    readTime: "4min read",
    likes: 38,
    shares: 72,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: false,
  },
  {
    id: 8,
    title:
      "Serological surveys are being conducted to test for coronavirus antibodies. How useful are they?",
    description:
      "The authorities are hoping to find out what proportion of the population has already been infected with the virus.",
    content:
      "Serological surveys can help researchers estimate how widely a virus has spread through a population. However, experts warn that antibody testing must be interpreted carefully because results may vary depending on test quality and timing.",
    image:
      "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=1200&q=80",
    category: "Health",
    author: "NBC Health Desk",
    timeAgo: "6 hours ago",
    readTime: "5min read",
    likes: 36,
    shares: 72,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: true,
  },
  {
    id: 9,
    title:
      "Making a mark in Asia: East Bengal’s 2003 Asean Cup win — a defining moment for Indian club football",
    description:
      "East Bengal became the first Indian club to win an official recognized Asian football tournament.",
    content:
      "East Bengal's 2003 Asean Cup victory remains one of the most important achievements in Indian club football. The win gave Indian football fans a rare international triumph and strengthened the club's legacy.",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    category: "Sports",
    author: "David Johnson",
    timeAgo: "8 hours ago",
    readTime: "6min read",
    likes: 64,
    shares: 58,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: true,
  },
  {
    id: 10,
    title: "New research project explains how plants respond to changing light",
    description:
      "A classroom science project about plant growth has become unexpectedly popular among students and teachers online.",
    content:
      "A classroom science project showing how plants respond to light gained attention online for its simple but creative explanation. Teachers praised the project for making a difficult topic easier to understand.",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
    category: "Think",
    author: "Anna Morris",
    timeAgo: "9 hours ago",
    readTime: "3min read",
    likes: 28,
    shares: 19,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: true,
  },
  {
    id: 11,
    title: "Global travel demand slowly returns as countries ease restrictions",
    description:
      "Airlines and tourism companies are reporting a gradual increase in bookings as travel rules become less strict.",
    content:
      "Travel demand is slowly recovering as several countries reduce restrictions and reopen popular destinations. Industry experts say the recovery remains uneven, but airlines, hotels, and local tourism businesses are seeing signs of renewed activity.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    category: "Travel",
    author: "Emily Carter",
    timeAgo: "9 hours ago",
    readTime: "4min read",
    likes: 46,
    shares: 31,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: false,
  },
  {
    id: 12,
    title: "Podcast listeners turn to daily news shows for quick updates",
    description:
      "Short-form news podcasts are becoming a popular way for busy audiences to follow major stories.",
    content:
      "Daily news podcasts continue to grow as listeners look for quick, focused updates during commutes, workouts, and breaks. Media companies are investing more in audio formats as podcast audiences become an important part of the news ecosystem.",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
    category: "Podcasts",
    author: "Michael Brown",
    timeAgo: "12 hours ago",
    readTime: "3min read",
    likes: 39,
    shares: 22,
    isBookmarked: false,
    isTrending: false,
    isBreaking: false,
    isLive: false,
    isEditorsPick: true,
  },
];

export const categories = [
  "Corona Updates",
  "Politics",
  "Business",
  "Sports",
  "World",
  "Travel",
  "Podcasts",
];

export const latestTabs = ["Latest Stories", "Think", "Health"];

export const heroNews = newsData.find((item) => item.isTrending);

export const breakingNews = newsData.filter((item) => item.isBreaking);

export const liveNews = newsData.find((item) => item.isLive);

export const editorsPicks = newsData.filter((item) => item.isEditorsPick);

export const latestStories = newsData.filter(
  (item) => !item.isTrending && !item.isBreaking && !item.isLive
);