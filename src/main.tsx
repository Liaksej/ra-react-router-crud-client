import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/routes/Home";
import NewPost from "@/routes/NewPost.tsx";
import Post from "@/routes/Post.tsx";
import { loader as postsLoader } from "@/routes/PostsList.tsx";
import { action as postsAction } from "@/routes/NewPost.tsx";
import {
  loader as postLoader,
  action as deleteAction,
} from "@/routes/Post.tsx";
import EditPost, {
  action as editAction,
  loader as editLoader,
} from "@/routes/EditPost.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: postsLoader,
  },
  {
    path: "posts/new",
    element: <NewPost />,
    action: postsAction,
  },
  {
    path: "posts/:id",
    element: <Post />,
    loader: postLoader,
    action: deleteAction,
  },
  {
    path: "posts/:id/edit",
    element: <EditPost />,
    action: editAction,
    loader: editLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
