import CreatePost from "@/routes/CreatePost.tsx";
import PostsList from "@/routes/PostsList.tsx";

export default function Home() {
  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <div>
        <PostsList />
      </div>
    </div>
  );
}
