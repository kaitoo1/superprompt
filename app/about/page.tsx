import Link from "next/link";

export default async function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-semibold mb-16  leading-tight">
        Find prompts that get you better results from AI.
      </h1>

      {/* Intro */}
      <section className="mb-24">
        <div className=" space-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.imgur.com/Nvom102.jpeg"
            alt="doge"
            className="rounded-md mx-auto max-w-120 w-full"
          />
          <p className="text-lg md:text-xl font-light  leading-relaxed">
            You’ve probably tried ChatGPT or seen viral AI photos. Everyone’s
            bragging about how they used it to land a job, plan a trip, or
            create something insane—and you’re thinking:{" "}
            <span className="font-medium text-[#0000FF] dark:text-[#FBC918]">
              “What did you type in to get that?”
            </span>
          </p>
          <p className="text-lg md:text-xl font-light  leading-relaxed">
            Your ChatGPT feels dumber than theirs.
          </p>
          <p className="text-lg md:text-xl font-light  leading-relaxed">
            The problem is the prompt.
          </p>
          <p className="text-lg md:text-xl font-light  leading-relaxed">
            Great prompts are what make AI actually work for you. They turn
            generic answers into responses personalized to your exact needs. The
            right prompts make you feel like you have 100s of experts and
            assistants on your payroll.
          </p>
          <p className="text-lg md:text-xl font-light  leading-relaxed">
            Use <span className="font-medium italic ">SuperPrompt</span> to find
            and save the best prompts that others are using.
            {/* Whether
              you’re just starting out or already using it but want to do more,
              you're bound to find something that works for you. */}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 ">How to use it</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Find a prompt",
              desc: "Use the search bar or browse by category to find prompts for writing, image generation, productivity, and more.",
            },
            {
              title: "Copy + Try",
              desc: "Every prompt is ready to use. Copy and paste it into your favorite AI tool like ChatGPT or Grok.",
            },
            {
              title: "Save Your Favorites",
              desc: "Found one that works great? Favorite it to save for later.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg"
            >
              <h3 className="text-lg font-semibold  mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Get started */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 ">Get Started</h2>
        <p className="text-xl  mb-6 leading-relaxed">
          You don’t need to sign up to explore. Just start browsing and trying
          prompts. If you find one that helps, hit the star to save it.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#0000FF] text-white hover:bg-blue-500 rounded-md transition-colors  inline-block"
          >
            Browse Prompts
          </Link>
          {/* <button
              onClick={() => (window.location.href = "/submit")}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors "
            >
              Submit a Prompt
            </button> */}
        </div>
      </section>
    </div>
  );
}
