import {
  Outlet,
  useLoaderData,
  Params,
  useNavigate,
  useFetcher,
  redirect,
} from "react-router-dom";
import { Post } from "@/routes/PostsList.tsx";

export async function loader({ params }: { params: Params }) {
  const { post } = await fetch(`http://localhost:7070/posts/${params.id}`).then(
    (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    },
  );
  if (!post) {
    throw new Error("Failed to fetch post");
  }
  console.log(post);
  return post;
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const formData = await request.formData();
  if (formData.has("delete")) {
    await fetch(`http://localhost:7070/posts/${params.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return;
      } else {
        throw new Error(res.statusText);
      }
    });
  }
  if (formData.has("edit")) {
    return redirect(`/posts/${params.id}/edit`);
  }
  return redirect("/");
}

export default function Post() {
  const post = useLoaderData() as Post;
  const navigate = useNavigate();
  const fetcher = useFetcher();

  if (!post) {
    throw new Error("Failed to fetch post");
  }

  return (
    <div>
      <button type="button" onClick={() => navigate("/")}>
        X
      </button>
      <div>{post.id}</div>
      <div>{new Date(Number(post.created)).toLocaleString("ru-RU")}</div>
      <div>
        <p>{post.content}</p>
        <div>
          <button
            type="button"
            onClick={() => navigate(`/posts/${post.id}/edit`)}
          >
            Edit
          </button>
          <fetcher.Form method="post" id="delete-post">
            <button type="submit" name="delete">
              Delete
            </button>
          </fetcher.Form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
