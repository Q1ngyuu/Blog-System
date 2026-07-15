import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-indigo-100/60 bg-white/75 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold text-gray-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-base shadow-md shadow-indigo-500/20">
              ✍️
            </span>
            <span className="gradient-text">我的博客</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 transition-colors duration-300 hover:text-indigo-600"
          >
            ← 返回首页
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-col items-center justify-center px-4 py-20">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-inner">
          <span className="text-5xl">📄</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-700">文章不存在</h1>
        <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-gray-400">
          这篇文章可能已被作者删除，或者你访问了一个错误的链接。
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg hover:scale-105"
          >
            ← 返回列表
          </Link>
        </div>
      </main>
    </div>
  );
}
