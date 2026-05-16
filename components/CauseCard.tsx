import Link from 'next/link'
import { Cause } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CauseCard({ cause }: { cause: Cause }) {
  const name = getMetafieldValue(cause.metadata?.name) || cause.title
  const description = getMetafieldValue(cause.metadata?.description)
  const icon = getMetafieldValue(cause.metadata?.icon)
  const coverImage = cause.metadata?.cover_image

  return (
    <Link href={`/causes/${cause.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">
        {coverImage?.imgix_url && (
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img
              src={`${coverImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={400}
              height={225}
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            {icon && <span className="text-3xl">{icon}</span>}
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
              {name}
            </h3>
          </div>
          {description && (
            <p className="text-gray-600 line-clamp-3">{description}</p>
          )}
        </div>
      </div>
    </Link>
  )
}