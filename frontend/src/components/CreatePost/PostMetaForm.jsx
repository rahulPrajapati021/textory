import { useEffect, useState } from "react";
import { mockCategoryList } from "../../mocks/posts.mocks";
import { Cross, TriangleAlert, X } from "lucide-react";
import { apiService } from "../../service/apiService";

export default function PostMetaForm({ next }) {
  const [categoryList, setCategoryList] = useState(mockCategoryList);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState("DRAFT");

  const fetchList = async () => {
    const response = await apiService.getCategoryList();
    setCategoryList(response);
  };
  useEffect(() => {
    fetchList();
  }, []);

  const handleTagInput = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      console.log(e.target.value);
      if (tagList.includes(tagInput) || tagInput == "" || tagList.length >= 10) {
        return;
      }
      setTagList((prev) => [...prev, e.target.value]);
      setTagInput("");
    }
  };
  const handleRemoveTag = (tagName) => {
    setTagList((prev) => prev.filter((tag) => tag != tagName));
  };
  const handleFormSubmit = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    try {
      if (selectedCategory == "" || tagList.length <= 0) {
        setError("Select a category & add atleast one tag");
        return;
      }
      const tags = await apiService.createTags(tagList);
      next({
        categoryId: selectedCategory,
        tagIds: tags.map((e) => e.id),
        status: status,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-4xl mx-auto my-4 p-4 rounded-md flex flex-col justify-evenly bg-slate-400"
      >
        {error ? (
          <div className="bg-red-500 flex space-x-2 text-white px-4 py-2 rounded-md">
            <TriangleAlert />
            <div>{error}</div>
          </div>
        ) : (
          ""
        )}
        <label htmlFor="categoryId">Category : </label>
        <select
          name="categoryId"
          className="border rounded-md px-4 py-2"
          id="categoryId"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">---Category Names---</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="tagInput">Tags : </label>
        <input
          type="text"
          className="border rounded-md px-4 py-2"
          name="tagInput"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInput}
          placeholder="Input tag and enter"
        />
        <div className="flex space-x-4 flex-wrap my-2">
          {tagList.map((tag) => (
            <div
              key={tag}
              className="bg-red-200 rounded-md px-2 py-1 flex items-center space-x-2"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-black cursor-pointer"
              >
                <X />
              </button>
            </div>
          ))}
        </div>

        <select
          name="status"
          id="status"
          className="border rounded-md px-4 py-2 mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>

        <button
          disabled={loading}
          className="border rounded-md inline-block my-2 py-2 px-4 bg-blue-500 text-white cursor-pointer"
          type="submit"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
            </div>
          ) : (
            "Finish"
          )}
        </button>
      </form>
    </div>
  );
}
