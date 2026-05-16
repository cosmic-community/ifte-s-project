import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💝</span>
            <span className="font-bold text-xl text-gray-900">Ifte's Project</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-brand-600 font-medium">Home</Link>
            <Link href="/causes" className="text-gray-700 hover:text-brand-600 font-medium">Causes</Link>
            <Link href="/campaigns" className="text-gray-700 hover:text-brand-600 font-medium">Campaigns</Link>
            <Link href="/donations" className="text-gray-700 hover:text-brand-600 font-medium">Donations</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}