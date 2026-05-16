// app/causes/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCauseBySlug, getCampaigns, getMetafieldValue } from '@/lib/cosmic'
import CampaignCard from '@/components/CampaignCard'

export default async function CauseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cause = await getCauseBySlug(slug)

  if (!cause) {
    notFound()
  }

  const name = getMetafieldValue(cause.metadata?.name) || cause.title
  const description = getMetafieldValue(cause.metadata?.description)
  const icon = getMetafieldValue(cause.metadata?.icon)
  const coverImage = cause.metadata?.cover_image

  const allCampaigns = await getCampaigns()
  const relatedCampaigns = allCampaigns.filter(
    (c) => c.metadata?.cause?.id === cause.id
  )

  return (
    <div>
      {coverImage?.imgix_url && (
        <div className="w-full h-64 md:h-96 overflow-hidden bg-gray-200">
          <img
            src={`${coverImage.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-full object-cover"
            width={2000}
            height={800}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/causes" className="text-brand-600 hover:text-brand-700 font-semibold mb-6 inline-block">
          ← Back to Causes
        </Link>

        <div className="flex items-center gap-4 mb-6">
          {icon && <span className="text-5xl">{icon}</span>}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{name}</h1>
        </div>

        {description && (
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
          </div>
        )}

        {relatedCampaigns.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}