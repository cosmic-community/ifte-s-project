export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Cause extends CosmicObject {
  type: 'causes';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
    cover_image?: CosmicImage;
  };
}

export type CampaignStatus = 'Active' | 'Completed' | 'Paused' | 'Cancelled';

export interface Campaign extends CosmicObject {
  type: 'campaigns';
  metadata: {
    campaign_title?: string;
    description?: string;
    short_summary?: string;
    goal_amount?: number;
    amount_raised?: number;
    featured_image?: CosmicImage;
    status?: CampaignStatus | string;
    end_date?: string;
    cause?: Cause;
  };
}

export interface Donation extends CosmicObject {
  type: 'donations';
  metadata: {
    donor_name?: string;
    donor_email?: string;
    amount?: number;
    message?: string;
    anonymous?: boolean;
    donation_date?: string;
    campaign?: Campaign;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}