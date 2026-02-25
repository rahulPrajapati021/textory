import { useEffect, useState } from "react";
import { apiService } from "../../../service/apiService";
import { Link } from "react-router";

export default function Sidebar() {
    const [topCategories, setTopCategories] = useState([]);
    const fetchData = async () => {
        const response = await apiService.getCategoryList(0, 20);
        if(response) {
            const data = response.sort((a, b) => b.postCount - a.postCount).slice(0,5);
            setTopCategories(data);
        }  
    }
    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div className="space-y-6">
      
      <div className="bg-[#121212] border border-stone-800 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">Top Categories</h3>

        <ul className="space-y-3">
          {topCategories.map((category) => (
            <li key={category.id} className="flex items-center gap-3">
              <div>
                <p className="text-white text-sm hover:underline">
                    <Link to={`/categoryPage/${category.id}`}>{category.name}</Link>
                </p>
                <span className="text-xs text-stone-400">
                  {category.postCount} posts
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
