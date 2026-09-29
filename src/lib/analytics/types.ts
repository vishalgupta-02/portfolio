export const ALLOWED_EVENT_TYPES = [
  "page_view",
  "project_view",
  "github_click",
  "live_demo_click",
  "resume_download",
  "contact_click",
] as const;

export type AnalyticsEventType = (typeof ALLOWED_EVENT_TYPES)[number];

export interface TrackEventPayload {
  type: AnalyticsEventType;
  path?: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsStats {
  uniqueVisitors: number;
  totalPageViews: number;
  topProjects: { project: string; count: number }[];
  eventCounts: Record<AnalyticsEventType, number>;
}
