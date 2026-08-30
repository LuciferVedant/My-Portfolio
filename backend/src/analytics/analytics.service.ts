import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  private pageViewsCount = 1420; // baseline start count for stats widget
  private viewsByPath: Record<string, number> = {
    '/': 850,
    '/about': 210,
    '/experience': 190,
    '/projects': 110,
    '/skills': 60,
  };

  trackPageView(path: string, userAgent?: string) {
    this.pageViewsCount++;
    this.viewsByPath[path] = (this.viewsByPath[path] || 0) + 1;
    return { success: true, totalViews: this.pageViewsCount };
  }

  getStats() {
    return {
      totalViews: this.pageViewsCount,
      viewsByPath: this.viewsByPath,
      systemUptimePct: '99.98%',
      apiLatencyMs: 14,
    };
  }
}
