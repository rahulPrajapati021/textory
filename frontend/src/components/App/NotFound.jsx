import Navbar from "./Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
    <div className="flex-1 bg-dark text-white flex justify-center items-center text-4xl">
      Page Not Found
      </div>
    </div>
  )
}
