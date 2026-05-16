import { createBucketClient } from '@cosmicjs/sdk'
import { Cause, Campaign, Donation, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getCauses(): Promise<Cause[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'causes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Cause[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch causes')
  }
}

export async function getCauseBySlug(slug: string): Promise<Cause | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'causes', slug })
      .depth(1)
    return response.object as Cause
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch cause')
  }
}

export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'campaigns' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const campaigns = response.objects as Campaign[]
    return campaigns.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch campaigns')
  }
}

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'campaigns', slug })
      .depth(1)
    return response.object as Campaign
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch campaign')
  }
}

export async function getDonations(): Promise<Donation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'donations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const donations = response.objects as Donation[]
    return donations.sort((a, b) => {
      const dateA = new Date(a.metadata?.donation_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.donation_date || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch donations')
  }
}

export async function getDonationsByCampaign(campaignId: string): Promise<Donation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'donations', 'metadata.campaign': campaignId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Donation[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch donations')
  }
}