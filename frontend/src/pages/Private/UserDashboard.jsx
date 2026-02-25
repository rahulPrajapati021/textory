import React, { useEffect, useState } from "react";
import DraftPostList from "../../components/UserDashboard/DraftPostList";
import PublicPostList from "../../components/UserDashboard/PublicPostList";
import { apiService } from "../../service/apiService";
import Navbar from "../../components/App/Navbar";

export default function UserDashboard() {
  const [showPublicPost, setShowPublicPost] = useState(true);
  const [publishedList, setPublishedList] = useState([]);
  const [draftList, setDraftList] = useState([]);

  // only for published posts
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [pageEnd, setPageEnd] = useState(false);

  const fetchPublicPost = async () => {
    const publishedData = await apiService.getUserPosts("PUBLISHED", page, size);
    if(publishedData && publishedData.length > 0) {
      setPublishedList(publishedData);
    }
    else {
      setPageEnd(true);
    }
    setLoading(false);
  };
  const handlePageUpdate = (e) => {
    setPage((prev) => prev + 1);
    setLoading(true);
  };

  const fetchDraftPost = async () => {
    const draftData = await apiService.getUserPosts("DRAFT");
    setDraftList(draftData);
  };

  // fetch publish post
  useEffect(() => {
    fetchPublicPost();
  }, [page]);
  // fetch draft post
  useEffect(() => {
    fetchDraftPost();
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="p-4">
        {/* draft posts & published posts sections different different */}
        <div className="bg-dark text-white min-h-80 max-w-4xl mx-auto rounded-md">
          <div className="flex border-b-2">
            <button
              onClick={() => setShowPublicPost(true)}
              className={`flex-1 cursor-pointer py-2 font-bold rounded-t-md ${showPublicPost ? "bg-stone-700" : ""}`}
            >
              Public
            </button>
            <button
              onClick={() => setShowPublicPost(false)}
              className={`flex-1 cursor-pointer py-2 font-bold rounded-t-md ${!showPublicPost ? "bg-stone-700" : ""}`}
            >
              Drafts
            </button>
          </div>

          {showPublicPost ? (
            <div>
              <PublicPostList list={publishedList} />
              <div className="flex justify-center">
                {loading ? (
                  <div className="w-8 h-8 border-2 border-blue-600 border-b-transparent animate-spin"></div>
                ) : pageEnd ? (
                  <span>No more posts found ! 🤗</span>
                ) : (
                  <button
                    onClick={handlePageUpdate}
                    className="bg-blue-600 text-white rounded-md cursor-pointer px-4 py-2 "
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          ) : (
            <DraftPostList list={draftList} />
          )}
        </div>
      </div>
    </div>
  );
}
