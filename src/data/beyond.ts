export interface FavoriteSong {
  title: string;
  artist: string;
  spotifyUrl: string;
  cover?: string;
}

export interface ShelfBook {
  title: { pt: string; en: string };
  author: string;
  cover?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface PersonalInterest {
  label: { pt: string; en: string };
  detail?: { pt: string; en: string };
}

export interface CurrentMoment {
  category: { pt: string; en: string };
  value: { pt: string; en: string };
}

export const favoriteSongs: FavoriteSong[] = [
  {
    title: "Forever",
    artist: "Danger Incorporated",
    spotifyUrl: "https://open.spotify.com/track/3e1A8CQxtiK7iLxvjkZAlS",
    cover: "https://i.scdn.co/image/ab67616d0000b273f4319a5ab8de838c3feadbd8",
  },
  {
    title: "World Wide Web",
    artist: "Danger Incorporated",
    spotifyUrl: "https://open.spotify.com/track/00kaNqjUUng9cgRZUe84BU",
    cover: "https://i.scdn.co/image/ab67616d0000b273afb1321fb8faf4da8aa7ce91",
  },
  {
    title: "Total Eclipse of the Heart",
    artist: "Bonnie Tyler",
    spotifyUrl: "https://open.spotify.com/track/7wuJGgpTNzbUyn26IOY6rj",
    cover: "https://i.scdn.co/image/ab67616d0000b2738cefe8e2f2cfd63ce073fa96",
  },
  {
    title: "Atlantis",
    artist: "Bridgit Mendler, Kaiydo",
    spotifyUrl: "https://open.spotify.com/track/3AX8J0HZIhevlTPJXPFs5B",
    cover: "https://i.scdn.co/image/ab67616d0000b27331868b98bc415ae21d7a3b28",
  },
  {
    title: "rock + roll",
    artist: "EDEN",
    spotifyUrl: "https://open.spotify.com/track/0Mf6WhWLfOpzOxacvbcboj",
    cover: "https://i.scdn.co/image/ab67616d0000b273c61b46cf682d7f0183fcb87c",
  },
];

export const booksRead: ShelfBook[] = [
  {
    title: { pt: "A Metamorfose", en: "The Metamorphosis" },
    author: "Franz Kafka",
    cover:
      "https://http2.mlstatic.com/D_NQ_NP_2X_998936-MLA112165455942_062026-F.webp",
    rating: 5,
  },
  {
    title: { pt: "Noites Brancas", en: "White Nights" },
    author: "Fiódor Dostoiévski",
    cover: "https://m.media-amazon.com/images/I/7143D7foVmL._SL1500_.jpg",
    rating: 4,
  },
  {
    title: { pt: "O diário de Anne Frank", en: "The Diary of a Young Girl" },
    author: "Anne Frank",
    cover: "https://m.media-amazon.com/images/I/81yKgdRQqHL._SL1500_.jpg",
    rating: 5,
  },
  {
    title: { pt: "Verity", en: "Verity" },
    author: "Colleen Hoover",
    cover:
      "https://http2.mlstatic.com/D_NQ_NP_2X_909003-MLU50881573316_072022-F.webp",
    rating: 5,
  },
  {
    title: { pt: "Crepúsculo", en: "Twilight" },
    author: "Stephenie Meyer",
    cover: "https://m.media-amazon.com/images/I/618fXbK+OkL._SL1500_.jpg",
    rating: 5,
  },
  {
    title: { pt: "Lua Nova", en: "New Moon" },
    author: "Stephenie Meyer",
    cover: "https://m.media-amazon.com/images/I/7153D5oFumL._SL1500_.jpg",
    rating: 5,
  },
  {
    title: { pt: "Eclipse", en: "Eclipse" },
    author: "Stephenie Meyer",
    cover: "https://m.media-amazon.com/images/I/71PQWYk5YAL._SL1500_.jpg",
    rating: 4,
  },
  {
    title: { pt: "Amanhecer", en: "Breaking Dawn" },
    author: "Stephenie Meyer",
    cover: "https://m.media-amazon.com/images/I/71DW9z3UXkL._SL1500_.jpg",
    rating: 5,
  },
  {
    title: { pt: "Sol da Meia-Noite", en: "Midnight Sun" },
    author: "Stephenie Meyer",
    cover: "https://m.media-amazon.com/images/I/815mbcFisDL._SL1500_.jpg",
    rating: 5,
  },

  {
    title: { pt: "O poder do hábito", en: "The Power of Habit" },
    author: "Charles Duhigg",
    cover: "https://m.media-amazon.com/images/I/815iPX0SgkL._SL1500_.jpg",
    rating: 4,
  },
  {
    title: { pt: "Orgulho e Preconceito", en: "Pride and Prejudice" },
    author: "Jane Austen",
    cover: "https://m.media-amazon.com/images/I/71Xta4Nf7uL._SL1360_.jpg",
    rating: 5,
  },
];

export const readingList: ShelfBook[] = [
  {
    title: { pt: "Memórias do Subsolo", en: "Notes from Underground" },
    author: "Fiódor Dostoiévski",
    cover:
      "https://http2.mlstatic.com/D_NQ_NP_2X_657300-MLA112164460946_062026-F.webp",
  },

  {
    title: { pt: "Meditações", en: "Meditations" },
    author: "Marco Aurélio",
    cover: "https://m.media-amazon.com/images/I/818piLnMRgL._SL1500_.jpg",
  },
  {
    title: { pt: "Ikigai", en: "Ikigai" },
    author: "Ken Mogi",
    cover: "https://m.media-amazon.com/images/I/71Li7BDmzgL._SL1500_.jpg",
  },
  {
    title: { pt: "O Alquimista", en: "The Alchemist" },
    author: "Paulo Coelho",
    cover: "https://m.media-amazon.com/images/I/81slUinjTlS._SL1500_.jpg",
  },
];

// Conteúdo pessoal a ser preenchido conforme Andressa enviar suas escolhas.
export const personalInterests: PersonalInterest[] = [];
export const currentMoments: CurrentMoment[] = [];
