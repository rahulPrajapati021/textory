import Navbar from "../../components/App/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-[#121212] border border-stone-800 rounded-2xl p-8 text-white">
          
          {/* Header */}
          <h1 className="text-3xl font-bold mb-4">
            About <span className="text-yellow-400">Textory</span>
          </h1>

          <p className="text-stone-400 mb-8 text-lg">
            A personal space for stories, tutorials, and ideas around technology.
          </p>

          {/* Sections */}
          <AboutSection title="What is Textory?">
            Textory is my personal project where I write stories and tutorials
            based on the technologies I work with.
          </AboutSection>

          <AboutSection title="What can you do here?">
            Anyone can write on Textory. If you have something to share —
            a tutorial, a story, or useful public information — this is the place.
          </AboutSection>

          <AboutSection title="Writing experience">
            Posts on Textory are written in <span className="text-white">Markdown</span>.
            You can publish your content or save it as a draft — drafts are visible only to you.
          </AboutSection>

          <AboutSection title="Built with love ❤️">
            Textory is built with care and curiosity. A lot of features are planned,
            and more will be added as the platform grows.
          </AboutSection>

          {/* Contact */}
          <div className="mt-10 pt-6 border-t border-stone-800">
            <h3 className="text-xl font-semibold mb-3">Get in touch</h3>

            <p className="text-stone-400">
              📧 Email:{" "}
              <a
                className="text-blue-400 hover:underline"
                href="mailto:rahulprajapati.pranton@gmail.com"
                target="_blank"
              >
                rahulprajapati.pranton@gmail.com
              </a>
            </p>

            <p className="text-stone-400 mt-2">
              🌐 Portfolio:{" "}
              <a
                className="text-blue-400 hover:underline"
                href="https://pranton.netlify.app"
                target="_blank"
              >
                pranton.netlify.app
              </a>
            </p>
            <p className="text-stone-400 mt-2">
                📂 Github Repo:{" "}
                <a target="_blank" className="text-blue-400 hover:underline" href="https://github.com/rahulPrajapati021/textory.git">
                    https://github.com/rahulPrajapati021/textory.git
                    </a> 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-stone-300 leading-relaxed">{children}</p>
    </div>
  );
}
