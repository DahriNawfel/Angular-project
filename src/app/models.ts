export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  [key: string]: any;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
  [key: string]: any;
}

export interface Comment {
  id: number;
  body: string;
  postId?: number;
  userId?: number;
  [key: string]: any;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  price?: number;
  [key: string]: any;
}
