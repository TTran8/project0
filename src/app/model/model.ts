export interface Post {
  title: string;
  author: string;
  desc: string;
  group: string;
  html: string;
  category_name: string;
  _id: string;
  imgUrl: string;
  children: Post[];
}

export interface Category {
  category_name: string;
  category_parent_id: string;
  imgUrl: string;
  _id: string;
  desc: string;
  children: Category[];
}

export interface User {
  username: string;
  password: string;
}
