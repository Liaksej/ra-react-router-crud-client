import { Form, redirect, useNavigate } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await fetch(`http://localhost:7070/posts/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return redirect("/");
}

export default function NewPost() {
  const navigate = useNavigate();

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
        ></textarea>
      </div>
      <button type="submit">Опубликовать</button>
    </Form>
  );
}
