import PostsList from "@/routes/PostsList.tsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>
        <Link to="posts/new">New Post</Link>
      </div>
      <div>
        <PostsList />
      </div>
    </div>
  );
}
