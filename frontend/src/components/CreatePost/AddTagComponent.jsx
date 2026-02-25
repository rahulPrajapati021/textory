import { X } from "lucide-react";
import { useState } from "react";

export default function AddTagComponent({ tagList, setTagList }) {
  const handleRemoveTag = (name) => {
    setTagList((prev) => prev.filter((e) => e != name));
  };
  const [tagInput, setTagInput] = useState("");

  const addNewTag = (e) => {
    if (e.key == "Enter" && tagList.length < 10) {
      e.preventDefault();
      setTagList((prev) => [...prev, tagInput]);
      setTagInput("");
    }
  };
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="tagInput">Add Tag</label>
      <input
        type="text"
        name="tagInput"
        className="px-4 py-2 rounded-md border"
        id="tagInput"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={addNewTag}
      />
      {/* list of tags added currently */}
      <div className="flex flex-wrap items-center">
        {tagList.map((tag) => (
          <div key={tag} className="flex m-2 rounded-md bg-orange-400 px-2 py-1">
            {tag} <X onClick={(e) => handleRemoveTag(tag)} />
          </div>
        ))}
      </div>
    </div>
  );
}
