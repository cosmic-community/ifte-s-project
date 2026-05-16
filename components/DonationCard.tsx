import { Donation } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function DonationCard({ donation }: { donation: Donation }) {
  const isAnonymous = donation.metadata?.anonymous === true
  const donorName = isAnonymous ? 'Anonymous' : (getMetafieldValue(donation.metadata?.donor_name) || 'Anonymous')
  const amount = donation.metadata?.amount || 0
  const message = getMetafieldValue(donation.metadata?.message)
  const date = getMetafieldValue(donation.metadata?.donation_date)
  const campaign = donation.metadata?.campaign
  const campaignTitle = campaign ? (getMetafieldValue(campaign.metadata?.campaign_title) || campaign.title) : ''

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
            {donorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{donorName}</div>
            {date && <div className="text-xs text-gray-500">{formatDate(date)}</div>}
          </div>
        </div>
        <div className="text-2xl font-bold text-brand-600">{formatCurrency(amount)}</div>
      </div>
      {message && (
        <p className="text-gray-700 italic mt-3 pl-13">"{message}"</p>
      )}
      {campaignTitle && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Donated to: </span>
          <span className="text-xs font-medium text-gray-700">{campaignTitle}</span>
        </div>
      )}
    </div>
  )
}