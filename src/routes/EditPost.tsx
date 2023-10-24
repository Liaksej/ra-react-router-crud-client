import {
  Form,
  Params,
  redirect,
  useLoaderData,
  useNavigate,
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
  const data = Object.fromEntries(formData);
  await fetch(`http://localhost:7070/posts/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return redirect("/");
}

export default function NewPost() {
  const navigate = useNavigate();
  const post = useLoaderData() as Post;

  return (
    <Form method="post" id="new-post">
      <button type="button" onClick={() => navigate(-1)}>
        X
      </button>
      <div>
        <textarea
          placeholder="Введите текст"
          aria-label="Пост"
          name="content"
          rows={4}
        >
          {post.content}
        </textarea>
      </div>
      <button type="submit">Изменить</button>
      <button type="button" onClick={() => navigate(-1)}>
        Отменить
      </button>
    </Form>
  );
}
