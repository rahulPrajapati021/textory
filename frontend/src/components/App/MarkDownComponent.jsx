export const MarkdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-stone-100">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-7 mb-3 text-stone-100">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-2 text-stone-200">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-base leading-7 text-stone-300 mb-4">
      {children}
    </p>
  ),

  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition"
    >
      {children}
    </a>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-stone-300">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-stone-300">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="leading-7">{children}</li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-stone-600 pl-4 italic text-stone-400 my-6">
      {children}
    </blockquote>
  ),

  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-stone-700/60 text-stone-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ) : (
      <pre className="bg-stone-950 text-stone-100 p-4 rounded-xl overflow-x-auto my-6">
        <code className="text-sm font-mono">{children}</code>
      </pre>
    ),

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="max-w-full rounded-xl shadow-lg my-8 mx-auto border border-stone-700"
    />
  ),
};
