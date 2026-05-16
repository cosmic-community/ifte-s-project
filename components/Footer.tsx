export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">💝</span>
          <span className="font-bold text-xl text-white">Ifte's Project</span>
        </div>
        <p className="text-sm">Making the world a better place, one donation at a time.</p>
        <p className="text-xs mt-4 text-gray-500">© {new Date().getFullYear()} Ifte's Project. All rights reserved.</p>
      </div>
    </footer>
  )
}