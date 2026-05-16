import { getDonations } from '@/lib/cosmic'
import DonationCard from '@/components/DonationCard'
import { formatCurrency } from '@/lib/utils'

export const metadata = {
  title: 'Donations - Ifte\'s Project',
  description: 'View all donations and supporters',
}

export default async function DonationsPage() {
  const donations = await getDonations()
  const totalRaised = donations.reduce((sum, d) => sum + (d.metadata?.amount || 0), 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Recent Donations</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          See the amazing supporters making a difference in our community.
        </p>
        <div className="inline-block bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl px-8 py-4">
          <div className="text-sm opacity-90">Total Raised</div>
          <div className="text-3xl font-bold">{formatCurrency(totalRaised)}</div>
          <div className="text-sm opacity-90 mt-1">from {donations.length} donations</div>
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No donations yet. Be the first to contribute!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  )
}