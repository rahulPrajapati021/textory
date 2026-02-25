import { useEffect, useState } from "react";
import Navbar from "../../components/App/Navbar";
import { PostBox } from "../../components/Public/PublicHomePage/PostBox";
import Sidebar from "../../components/Public/PublicHomePage/Sidebar";
import { apiService } from "../../service/apiService";

export default function PublicHomePage() {
  const [postsData, setPostsData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  const loadMorePosts = (e) => {
    setPage((prev) => prev + 1);
    setLoading(true);
  };
  const fetchData = async () => {
    const response = await apiService.getPublishedList(page, size);
    console.log(response);
    if (response?.length == 0) {
      setLoadMoreVisible(false);
    } else {
      setPostsData([...postsData, ...response]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div className="bg-dark min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Posts */}
        <div className="flex-1 space-y-6">
          {postsData.map((e) => (
            <PostBox key={e.id} Post={e} />
          ))}
          <div className="flex justify-center text-white">
            {loadMoreVisible ? (
              loading ? (
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <button
                  onClick={loadMorePosts}
                  className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md"
                >
                  Load More
                </button>
              )
            ) : (
              "There are no more posts! 🤗"
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-80">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
