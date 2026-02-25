import moment from "moment";
import { Link } from "react-router";

export default function DraftPostList({ list }) {
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <Link to="/createPost" className="bg-blue-600 border cursor-pointer text-white px-4 py-2 rounded-md">Add Post</Link>
      </div>
      <div className="my-2 space-y-2">
        {list.map((e) => (
          <div
            key={e.id}
            className="bg-[#121212] hover:bg-stone-800 rounded-md px-4 py-2"
          >
            <Link className="text-xl" to={"/post/" + e.id}>
              {e.title}
            </Link>

            <div className="flex space-x-4">
              <div>{e.category.name}</div>
              <div className="italic">
                last updated {moment(e.updatedAt).calendar()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
