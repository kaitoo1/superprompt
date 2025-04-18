/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.superprompt.tips",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const promptSlugs = [
      "entry-level-resume",
      "stylize-image",
      "write-cover-letter",
      "optimize-linkedin-profile",
      "blog-post-outline",
      "interview-question-study-pack",
      "personal-gym-routine",
      "research-report",
      "language-coaching-session",
      "personal-finance-plan",
      "therapist",
      "write-a-cover-letter",
      "increase-productivity",
      "start-a-business",
      "get-a-personalized-meal-plan",
      "get-feedback-on-your-writing",
      "job-search-consultant",
      "evaluate-business-plan",
      "learn-new-vocabulary",
      "study-for-anything",
      "coloring-page",
      "get-a-recruiter-perspective-on-resume",
      "quick-apology-email",
      "cold-outreach-pitch",
      "meeting-notes-summary",
      "task-prioritization",
      "daily-schedule-generator",
    ];

    const blogSlugs = [
      "5-prompt-mistakes-killing-your-chatgpt-results",
      "telltale-signs-text-written-by-ai",
      "instantly-improve-your-prompts-with-one-line",
      "practical-guide-use-ai-well",
    ];
    const now = new Date().toISOString();
    const promptPaths = promptSlugs.map((slug) => ({
      loc: `/prompt/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: now,
    }));
    const blogPaths = blogSlugs.map((slug) => ({
      loc: `/blog/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: now,
    }));
    const staticPaths = [
      {
        loc: `/about`,
        changefreq: "monthly",
        priority: 0.5,
        lastmod: now,
      },
    ];
    return [...promptPaths, ...blogPaths, ...staticPaths];
  },
};
