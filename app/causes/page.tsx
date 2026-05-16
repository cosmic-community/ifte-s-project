import { getCauses } from '@/lib/cosmic'
import CauseCard from '@/components/CauseCard'

export const metadata = {
  title: 'Causes - Ifte\'s Project',
  description: 'Browse all charitable causes',
}

export default async function CausesPage() {
  const causes = await getCauses()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Causes</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore the meaningful causes we support and find one that resonates with you.
        </p>
      </div>

      {causes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No causes available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causes.map((cause) => (
            <CauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      )}
    </div>
  )
}