import { useState } from "react";
import Navbar from "../../components/App/Navbar";
import { Upload } from "lucide-react";
import { apiService } from "../../service/apiService";

export default function UserProfileEdit() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <button
        className="bg-blue-400 px-4 py-2 rounded-md text-white"
        onClick={() => setShowUploadForm((prev) => !prev)}
      >
        Upload Profile Pic
      </button>

      {showUploadForm ? <UploadForm /> : ""}
    </div>
  );
}

function UploadForm() {
    const [file, setFile] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file.length > 0) {
            let data = new FormData();
            data.append("file", file[0]);
            const response = await apiService.uploadProfilePic(data);
            console.log(response);
        }
    }
  return (
    <form
    onSubmit={handleSubmit}
    className="bg-stone-400 flex flex-col"
    >
        <label htmlFor="file" className="flex space-x-2"><Upload /><span>Select a file</span></label>
      <input type="file" name="file" onChange={e => setFile(e.target.files)} id="file" className="hidden" />
      <input type="submit" value="Upload" className="bg-green-600 text-white cursor-pointer rounded-md"/>
    </form>
  );
}
