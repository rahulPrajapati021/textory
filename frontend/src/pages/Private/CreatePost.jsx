import { useState } from "react";
import Navbar from "../../components/App/Navbar";
import ReactMarkdown from "react-markdown";
import { MarkdownComponents } from "../../components/App/MarkDownComponent";
import PostForm from "../../components/CreatePost/PostForm";
import PostMetaForm from "../../components/CreatePost/PostMetaForm";
import { apiService } from "../../service/apiService";
import { useNavigate } from "react-router";

/*
{
  "title": "string",
  "content": "stringstri",
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tagIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "status": "DRAFT"
}
*/

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    tagIds: [],
    status: "DRAFT",
  });
  const [contentCollected, setContentCollected] = useState(false);

  const navigate = useNavigate();
  const setTitleContent = (title, content) => {
    setFormData(prev => ({...prev, title, content}));
    setContentCollected(true)
  }
  const handleSubmit = async (metaData) => {
    const postData = {...formData, categoryId:metaData.categoryId, tagIds: metaData.tagIds, status: metaData.status};
    setFormData(postData);
    console.log(postData);
    const response = await apiService.createPost(postData);
    console.log(response);
    if(response?.id) {
      // need to clear data from localstorage 
      localStorage.clear("savedPost");
      navigate(`/post/${response.id}`);
    }
  };
  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      {/* form */}
      {contentCollected?<PostMetaForm next={handleSubmit} />:<PostForm next={setTitleContent} />}
    </div>
  );
}
