import { Link, useLoaderData } from "react-router-dom";

export interface Post {
  id: number;
  content: string;
  created: number;
}

export async function loader() {
  const posts: Post[] | undefined = await fetch(
    "http://localhost:7070/posts",
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
  if (!posts) {
    throw new Error("Failed to fetch posts");
  }
  return posts;
}

export default function PostsList() {
  const posts = useLoaderData() as Post[];
  return (
    <div>
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} className="post" key={post.id}>
          <div>{new Date(post.created).toLocaleString("ru-RU")}</div>
          <p>{post.content}</p>
        </Link>
      ))}
    </div>
  );
}
