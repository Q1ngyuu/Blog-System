import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-100 to-blue-100 shadow-inner">
        <span className="text-5xl">🔍</span>
      </div>

      {/* 404 */}
      <h1 className="text-7xl font-black tracking-tighter text-gray-200">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        页面不存在
      </h2>
      <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-gray-400">
        你访问的页面可能已被移除、链接失效，或者你输入了一个错误的地址。
      </p>

      {/* Actions */}
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg hover:scale-105"
        >
          ← 返回首页
        </Link>
        <Link
          href="/admin"
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
        >
          后台管理
        </Link>
      </div>
    </div>
  );
}
