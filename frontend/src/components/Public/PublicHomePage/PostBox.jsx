import moment from "moment";
import { BACKEND_URL } from "../../../config/env";
import { Link } from "react-router";

export function PostBox({ Post }) {
  return (
    <div className="bg-[#121212] rounded-xl p-5 border border-stone-800 hover:border-stone-600 transition">
      
      {/* Author */}
      <div className="flex items-center gap-3 mb-3 text-sm text-stone-400">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src={`${BACKEND_URL}/media/profile/${Post.author.id}`}
          alt={Post.author.name}
        />
        <div>
          <p className="text-white font-medium hover:underline"><Link to={`/user/${Post.author.id}`}>{Post.author.name}</Link></p>
          <span>{moment(Post.updatedAt).fromNow()}</span>
        </div>
      </div>

      {/* Title */}
      <Link
        to={`/post/${Post.id}`}
        className="text-xl inline-block font-semibold text-white hover:underline mb-2"
      >
        {Post.title}
      </Link>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-400">
        <span className="px-2 py-1 bg-stone-800 rounded-md">
          {Post.category.name}
        </span>

        <span>{Post.readingTime} min read</span>

        {Post.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag.id}
            className="px-2 py-1 bg-stone-900 border border-stone-700 rounded-md text-xs"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
