import { useEffect, useState } from "react";
import { mockSinglePost } from "../../mocks/posts.mocks";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { MarkdownComponents } from "../../components/App/MarkDownComponent";
import { apiService } from "../../service/apiService";
import NotFound from "../../components/App/NotFound";
import Navbar from "../../components/App/Navbar";

export default function ReadPost() {
  const [post, setPost] = useState(mockSinglePost);
  const { id } = useParams();

  if (!id) return <NotFound />;

  const fetchPost = async (id) => {
    const response = await apiService.getPost(id);
    setPost(response);
  };

  useEffect(() => {
    fetchPost(id);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-stone-100">
      <Navbar />

      <div className="flex justify-center px-4 py-8">
        <article className="w-full max-w-4xl bg-stone-700 border border-stone-700 rounded-xl shadow-lg p-6 md:p-10">
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-stone-400 mb-6">
            <span>By <span className="text-stone-200 font-medium">{post.author.name}</span></span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>

          <hr className="border-stone-700 mb-6" />

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown components={MarkdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>

          <hr className="border-stone-700 my-8" />

          {/* Footer */}
          <div className="space-y-4">
            {/* Category */}
            <div className="text-sm text-stone-400">
              Category:{" "}
              <span className="text-stone-200 font-medium">
                {post.category.name}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm rounded-full bg-stone-600 text-stone-200 hover:bg-stone-500 transition"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

// {
//   id: "f3551e4f-e912-4128-a3eb-0b0eddcb9786",
//   title: "My Second post let's see how it works",
//   content: "<p>this is my new post please help !!!</p>",
//   author: {
//     id: "a97f0b33-09c6-4840-8754-98c74b3a9a88",
//     name: "test user",
//   },
//   category: {
//     id: "9ca7a15e-d271-4c85-a5b4-0c34fcd62461",
//     name: "category",
//     postCount: 0,
//   },
//   tags: [
//     {
//       id: "9d7b344c-421a-4ffb-bcfd-0d96cf2282f3",
//       name: "add",
//       postCount: 0,
//     },
//   ],
//   readingTime: 1,
//   createdAt: "2025-12-30T16:54:56.342246",
//   updatedAt: "2025-12-30T16:54:56.342246",
//   status: "PUBLISHED",
// };
