export interface Animal {
  id: number; // photo id
  postDate: Date;
  url: string;
  description: string;
  allowComments: boolean;
  likes: number; //quantity of likes
  comments: number; //quantity of comments
  userId: number; //owner of the animal photo
}

// export type Animais = Array<Animal>;
export type Animais = Animal[];
