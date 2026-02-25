import { useEffect, useState } from "react";
import Navbar from "../../components/App/Navbar";
import { apiService } from "../../service/apiService";
import { useNavigate, useParams } from "react-router";
import NotFound from "../../components/App/NotFound";
import AddTagComponent from "../../components/CreatePost/AddTagComponent";

export default function EditPost() {
  // different states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("DRAFT");
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);

  const { id } = useParams();
  if (!id) {
    return <NotFound />;
  }

  const fetchData = async () => {
    const categoryList = await apiService.getCategoryList();
    setCategoryList(categoryList);
    const response = await apiService.getPost(id);
    if (response) {
      setTitle(response.title);
      setContent(response.content);
      setCategoryId(response.category.id);
      setTags(response.tags.map((e) => e.name));
      setStatus(response.status);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagResponse = await apiService.createTags(tags);
    if (tagResponse) {
      const tagIds = tagResponse.map((e) => e.id);
      const data = {
        id: id,
        title,
        content,
        categoryId,
        tagIds,
        status,
      };
      const response = await apiService.updatePost(id, data);
      if (response) {
        navigate("/post/" + response.id);
      }
    }
  };
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="py-2">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-400 flex flex-col p-2 space-y-2 rounded-md max-w-4xl mx-auto"
        >
          <input
            type="text"
            name="title"
            id="title"
            disabled
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md px-4 py-2"
            placeholder="Title of the Post"
          />
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none border rounded-md h-72 px-4 py-2"
            id="content"
          ></textarea>
          <label htmlFor="category">Category</label>
          <select
            className="px-4 py-2 border rounded-md"
            name="category"
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categoryList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>

          <div>
            <AddTagComponent tagList={tags} setTagList={setTags} />
          </div>

          <select
            name="status"
            className="border rounded-md px-4 py-2"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>

          <div className="flex justify-end space-x-4">
            <button className="border rounded-md bg-red-400 text-white px-4 py-2">
              Discard
            </button>
            <input
              type="submit"
              className="border rounded-md bg-red-400 text-white px-4 py-2"
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
