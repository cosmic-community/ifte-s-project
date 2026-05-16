import { getCampaigns } from '@/lib/cosmic'
import CampaignCard from '@/components/CampaignCard'

export const metadata = {
  title: 'Campaigns - Ifte\'s Project',
  description: 'View all active donation campaigns',
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Active Campaigns</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join us in making a difference. Support a campaign that speaks to your heart.
        </p>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No campaigns available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  )
}