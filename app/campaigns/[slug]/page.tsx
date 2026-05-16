// app/campaigns/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCampaignBySlug, getDonationsByCampaign, getMetafieldValue } from '@/lib/cosmic'
import ProgressBar from '@/components/ProgressBar'
import DonationCard from '@/components/DonationCard'
import { formatCurrency, formatDate, calculateProgress } from '@/lib/utils'

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const campaign = await getCampaignBySlug(slug)

  if (!campaign) {
    notFound()
  }

  const title = getMetafieldValue(campaign.metadata?.campaign_title) || campaign.title
  const description = getMetafieldValue(campaign.metadata?.description)
  const summary = getMetafieldValue(campaign.metadata?.short_summary)
  const featuredImage = campaign.metadata?.featured_image
  const goal = campaign.metadata?.goal_amount || 0
  const raised = campaign.metadata?.amount_raised || 0
  const status = getMetafieldValue(campaign.metadata?.status)
  const endDate = getMetafieldValue(campaign.metadata?.end_date)
  const cause = campaign.metadata?.cause
  const progress = calculateProgress(raised, goal)

  const donations = await getDonationsByCampaign(campaign.id)

  return (
    <div>
      {featuredImage?.imgix_url && (
        <div className="w-full h-64 md:h-96 overflow-hidden bg-gray-200">
          <img
            src={`${featuredImage.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
            width={2000}
            height={800}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/campaigns" className="text-brand-600 hover:text-brand-700 font-semibold mb-6 inline-block">
          ← Back to Campaigns
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {status && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === 'Active' ? 'bg-green-100 text-green-800' :
              status === 'Completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {status}
            </span>
          )}
          {cause && (
            <Link 
              href={`/causes/${cause.slug}`}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-800 hover:bg-brand-200"
            >
              {getMetafieldValue(cause.metadata?.name) || cause.title}
            </Link>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>

        {summary && (
          <p className="text-xl text-gray-600 mb-8">{summary}</p>
        )}

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-600">{formatCurrency(raised)}</div>
              <div className="text-gray-500 text-sm">raised of {formatCurrency(goal)} goal</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{progress}%</div>
              <div className="text-gray-500 text-sm">funded</div>
            </div>
          </div>
          <ProgressBar progress={progress} />
          {endDate && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-semibold">Campaign ends:</span> {formatDate(endDate)}
            </div>
          )}
        </div>

        {description && (
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Campaign</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</div>
          </div>
        )}

        {donations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Supporters ({donations.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}