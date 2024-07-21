export type Topic = {
  _id: string;
  name: string;
  category: string;
  rating: number;
  votes: number;
  socials?: {
    name: string;
    link: string;
  }[];
  overallRank?: number;
  categoryRank?: number;
  about?: string;
};

export type TUserPayload = {
  id: string;
  username: string;
};
