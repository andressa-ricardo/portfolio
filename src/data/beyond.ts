export interface FavoriteSong {
  title: string;
  artist: string;
  spotifyUrl: string;
  cover?: string;
}

export interface ShelfBook {
  title: string;
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

// Conteúdo pessoal a ser preenchido conforme Andressa enviar suas escolhas.
export const booksRead: ShelfBook[] = [];
export const readingList: ShelfBook[] = [];
export const personalInterests: PersonalInterest[] = [];
export const currentMoments: CurrentMoment[] = [];
