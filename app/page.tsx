import Link from 'next/link'
import { getCauses, getCampaigns, getDonations } from '@/lib/cosmic'
import CauseCard from '@/components/CauseCard'
import CampaignCard from '@/components/CampaignCard'
import DonationCard from '@/components/DonationCard'
import { formatCurrency } from '@/lib/utils'

export default async function HomePage() {
  const [causes, campaigns, donations] = await Promise.all([
    getCauses(),
    getCampaigns(),
    getDonations(),
  ])

  const totalRaised = donations.reduce((sum, d) => sum + (d.metadata?.amount || 0), 0)
  const featuredCauses = causes.slice(0, 3)
  const featuredCampaigns = campaigns.slice(0, 3)
  const recentDonations = donations.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-brand-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Make a Difference <span className="text-brand-600">Today</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Support meaningful causes and campaigns that change lives. Every donation counts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/campaigns" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View Campaigns
            </Link>
            <Link href="/causes" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold border border-gray-300 transition-colors">
              Explore Causes
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">{causes.length}</div>
            <div className="text-gray-600">Active Causes</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">{campaigns.length}</div>
            <div className="text-gray-600">Live Campaigns</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">{formatCurrency(totalRaised)}</div>
            <div className="text-gray-600">Total Raised</div>
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      {featuredCauses.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Causes</h2>
                <p className="text-gray-600">Causes that need your support</p>
              </div>
              <Link href="/causes" className="text-brand-600 hover:text-brand-700 font-semibold">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCauses.map((cause) => (
                <CauseCard key={cause.id} cause={cause} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Campaigns */}
      {featuredCampaigns.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Campaigns</h2>
                <p className="text-gray-600">Help us reach our goals</p>
              </div>
              <Link href="/campaigns" className="text-brand-600 hover:text-brand-700 font-semibold">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Donations */}
      {recentDonations.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Donations</h2>
                <p className="text-gray-600">See who's making a difference</p>
              </div>
              <Link href="/donations" className="text-brand-600 hover:text-brand-700 font-semibold">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}