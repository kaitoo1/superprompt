/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.superprompt.tips",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const slugs = [
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
    ];

    return slugs.map((slug) => ({
      loc: `/prompt/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
