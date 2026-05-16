import Link from 'next/link'
import { Campaign } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatCurrency, calculateProgress } from '@/lib/utils'
import ProgressBar from '@/components/ProgressBar'

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const title = getMetafieldValue(campaign.metadata?.campaign_title) || campaign.title
  const summary = getMetafieldValue(campaign.metadata?.short_summary)
  const featuredImage = campaign.metadata?.featured_image
  const goal = campaign.metadata?.goal_amount || 0
  const raised = campaign.metadata?.amount_raised || 0
  const status = getMetafieldValue(campaign.metadata?.status)
  const progress = calculateProgress(raised, goal)

  const statusColor = status === 'Active' 
    ? 'bg-green-100 text-green-800' 
    : status === 'Completed'
    ? 'bg-blue-100 text-blue-800'
    : 'bg-gray-100 text-gray-800'

  return (
    <Link href={`/campaigns/${campaign.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
        {featuredImage?.imgix_url && (
          <div className="aspect-video overflow-hidden bg-gray-100 relative">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={400}
              height={225}
            />
            {status && (
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                {status}
              </span>
            )}
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
            {title}
          </h3>
          {summary && (
            <p className="text-gray-600 line-clamp-2 mb-4 flex-1">{summary}</p>
          )}
          <div className="mt-auto space-y-2">
            <ProgressBar progress={progress} />
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-900">{formatCurrency(raised)} raised</span>
              <span className="text-gray-500">of {formatCurrency(goal)}</span>
            </div>
            <div className="text-xs text-brand-600 font-semibold">{progress}% funded</div>
          </div>
        </div>
      </div>
    </Link>
  )
}