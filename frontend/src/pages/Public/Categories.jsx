import { useEffect, useState } from "react";
import Navbar from "../../components/App/Navbar";
import { mockCategoryList } from "../../mocks/posts.mocks";
import { X } from "lucide-react";
import { apiService } from "../../service/apiService";
import { Link } from "react-router";

export default function Categories() {
  const [categoryList, setCategoryList] = useState(mockCategoryList);
  const [showAddModal, setShowAddModal] = useState(false);
  const fetchList = async () => {
    const response = await apiService.getCategoryList(0, 20);
    setCategoryList(response);
  }
  useEffect(() => {
    fetchList();
  }, [showAddModal])

  return (
    <div className="bg-dark min-h-screen">
  <Navbar />

  <div className="max-w-6xl mx-auto px-4 py-6">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-white">Browse Categories</h1>
      <p className="text-stone-400 text-sm">
        Explore posts by topic
      </p>
    </div>

    {/* Category Grid */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categoryList.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  </div>
</div>

  );
}

function CategoryCard({ category }) {
  return (
    <Link to={`/categoryPage/${category.id}`}>
      <div className="bg-[#121212] border border-stone-800 rounded-xl p-5 hover:border-stone-600 hover:-translate-y-1 transition-all cursor-pointer">
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">
            {category.name}
          </h3>

          <span className="text-xs bg-stone-800 px-2 py-1 rounded-md text-stone-300">
            {category.postCount} posts
          </span>
        </div>

        <p className="text-sm text-stone-400">
          Articles related to {category.name}
        </p>
      </div>
    </Link>
  );
}


function AddCategoryModal({ closeModal }) {
  const [inputField, setInputField] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = inputField;
    if(name != "") {
      const response = await apiService.createCategory(name);
      console.log(response);
      closeModal();
    }
  }
  return (
    <div className="bg-[#000a] w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col max-w-2xl bg-gray-400 rounded-md px-4 py-2 space-y-4">
        <button type="button" onClick={closeModal} className="cursor-pointer text-2xl flex justify-end">
          <X />
        </button>
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          name="categoryName"
          id="categoryName"
          className="border px-4 py-2 rounded-md"
          value={inputField}
          onChange={e => setInputField(e.target.value)}
        />
        <input type="submit" value="Add" className="rounded-md cursor-pointer bg-yellow-500 text-white px-4 py-2" />
      </form>
    </div>
  );
}
