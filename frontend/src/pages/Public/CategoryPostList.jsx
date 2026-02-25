import { useParams } from "react-router";
import Navbar from "../../components/App/Navbar";
import NotFound from "../../components/App/NotFound";
import { useEffect, useState } from "react";
import { apiService } from "../../service/apiService";
import { PostBox } from "../../components/Public/PublicHomePage/PostBox";

export default function CategoryPostList() {
    const {id} = useParams();
    console.log(id);
    if(!id) {
        return <NotFound />
    }

    const [categoryDetails, setCategoryDetails] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postEnded, setPostEnded] = useState(false);
    
    const fetchData = async () => {
        const categoryDetailsResponse = await apiService.getCategoryDetails(id);
        if(categoryDetailsResponse) {
            setCategoryDetails(categoryDetailsResponse);   
        }
        const response = await apiService.getPostByCategory(id, page, size);
        if(response && response.length > 0) {
            setPostList(response);
        }
        else {
            setPostEnded(true);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [page])
    const handlePageUpdate = (e) => {
        setPage(prev => prev +1);
        setLoading(true);
    }
  return (
    <div className="min-h-screen flex flex-col bg-dark">
        <Navbar />

        <div className="flex-1 flex justify-center">
            <div className="w-11/12">
            {/* Category Name & details */}
            <div className="bg-stone-600 text-white px-8 py-4 space-x-4 flex flex-col">
                <span className="text-2xl">{categoryDetails?.name}</span>
                <span>Post Count: {categoryDetails?.postCount}</span>
            </div>
            {/* Post List */}
            <div className="px-4 py-2 space-y-4">
                {postList.map(post => <PostBox key={post.id} Post={post} />)}
            </div>

            <div className="flex justify-center py-4">
                {loading?
                <div className="w-8 h-8 border-2 border-blue-600 border-b-transparent animate-spin"></div>:
                (postEnded?
                    <span className="text-white">No more posts in this category ! 🤗</span>:
                    <button onClick={handlePageUpdate} className="bg-blue-600 text-white px-4 py-2 rounded-md">Load More</button>
                )
}
            </div>
            </div>
        </div>
    </div>
  )
}
