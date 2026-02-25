import { Link, useParams } from "react-router";
import NotFound from "../../components/App/NotFound";
import { useEffect, useState } from "react";
import Navbar from "../../components/App/Navbar";
import { BACKEND_URL } from "../../config/env";
import { apiService } from "../../service/apiService";
import { PostBox } from "../../components/Public/PublicHomePage/PostBox";
import moment from "moment";

export default function UserProfile() {
  const { id } = useParams();
  if (!id) {
    return <NotFound />;
  }

  const [userDetails, setUserDetails] = useState(null);
  const [postsList, setPostsList] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [postEnded, setPostEnded] = useState(false);

  const fetchData = async () => {
    const response = await apiService.getAuthorDetails(id);
    if (response && response?.name) {
      setUserDetails(response);
    }

    const postResponse = await apiService.getPostByAuthor(id, page, size);

    if (postResponse && postResponse.length > 0) {
      setPostsList(postResponse);
    }
    else {
      setPostEnded(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageUpdate = (e) => {
    setPage(prev => prev +1);
    setLoading(true);
  }
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center">
        <div className="flex-1 max-w-3/4">
        {/* User details */}
          <div className="bg-stone-700 rounded-b-md flex space-x-4 items-center px-8 py-4">
            <img
              src={`${BACKEND_URL}/media/profile/${id}`}
              className="w-24 h-24 rounded-lg"
              alt=""
            />

            <span className="text-2xl text-white">{userDetails?.name}</span>
          </div>

          {/* Post LIsts */}
          <div className="space-y-2 px-4 py-2">
            {postsList.map(post => <PostItem Post={post} key={post.id} />)}
          </div>

          <div className="flex justify-center py-4">
            {loading?
            <div className="w-8 h-8 border-2 border-b-transparent border-blue-600 animate-spin"></div>:
            (postEnded?
              <span className="text-white">No more posts found for the user! 🤗</span>:
              <button onClick={handlePageUpdate} className="bg-blue-600 px-4 py-2 text-white rounded-md">Load More</button>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
}


function PostItem({ Post }) {
  return (
    <div className="bg-[#121212] rounded-xl p-5 border border-stone-800 hover:border-stone-600 transition">
      {/* Title */}
      <Link
        to={`/post/${Post.id}`}
        className="block text-xl font-semibold text-white hover:underline mb-2"
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
          <span>{moment(Post.updatedAt).fromNow()}</span>
      </div>
    </div>
  );
}
