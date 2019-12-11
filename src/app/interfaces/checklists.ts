export interface Post {
  id: string;
  title: string;
  items: PostItem[];
}

export interface PostItem {
  title: string;
  checked: boolean;
}
