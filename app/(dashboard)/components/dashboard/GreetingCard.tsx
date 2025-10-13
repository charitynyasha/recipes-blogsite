export default function GreetingCard({ userName }: { userName: string }) {
  return (
    <div className="bg-gradient-to-r from-[#BCA067] to-black/90 rounded-lg shadow-sm p-8 text-white mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hi, {userName}! 👋</h1>
          <p className="text-blue-100">Welcome back to your blog dashboard</p>
        </div>
        <div className="hidden md:block">
          <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}
