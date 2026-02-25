import { useEffect, useState } from "react";
import { MarkdownComponents } from "../App/MarkDownComponent";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

export default function PostForm({ next }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const loadSavedPost = () => {
    try {
      const savedPost = JSON.parse(localStorage.getItem("savedPost"));
      if(savedPost && savedPost.title && savedPost.content) {
        setTitle(savedPost.title);
        setContent(savedPost.content);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    loadSavedPost();
  },[]);
  const saveChanges = (e) => {
    localStorage.setItem("savedPost", JSON.stringify({title, content}));
  }
  const nextBtnDisabled = title != "" && content != "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title == "" || content == "") {
      return;
    }
    next(title, content);
  };
  return (
    <div className="bg-dark flex-1 flex flex-col items-center">
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col bg-stone-700 px-4 w-11/12 py-2"
      >
        {/* options & title field */}
        <div className="flex justify-center items-center py-2 border-b">
          {/* title */}
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Post Title"
            className="px-4 flex-1 py-2 text-white outline-none"
            onChange={(e) => setTitle(e.target.value)}
            minLength={3}
            maxLength={200}
          />
          {/* buttons / Options */}
          <div className="space-x-4 mx-4">
            <button className="text-white bg-stone-500 font-bold py-2 cursor-pointer px-4 rounded-md">
              Discard
            </button>
            <button
              className={
                `text-white font-bold py-2 cursor-pointer px-4 rounded-md ` +
                (nextBtnDisabled ? "bg-green-500" : "bg-green-300")
              }
              type="submit"
              disabled={!nextBtnDisabled}
            >
              Next
            </button>
          </div>
        </div>
        {/* Textarea & Preview  */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
          {/* Textarea */}
          <textarea
            name="content"
            className="resize-none outline-none flex-1 w-full px-4 py-2 text-white overflow-y-scroll no-scrollbar"
            id="content"
            placeholder="Content"
            value={content}
            onKeyDown={saveChanges}
            onChange={(e) => setContent(e.target.value)}
            minLength={10}
            maxLength={50000}
          ></textarea>

          {/* Preview */}
          <div className="lg:border-l px-4 py-2 overflow-y-scroll bg-stone-700 no-scrollbar">
            <h1 className="text-3xl font-bold mt-8 mb-4 text-stone-100">{title}</h1>
            <span className="text-stone-100 inline-block mb-8">by author</span>
            <ReactMarkdown components={MarkdownComponents}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </form>
    </div>
  );
}
