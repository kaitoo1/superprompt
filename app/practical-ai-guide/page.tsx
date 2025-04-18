import Link from "next/link";

export default function PracticalAIGuidePage() {
  return (
    <div className="flex flex-col items-center px-4 py-12 max-w-2xl mx-auto">
      {/* Headline Section */}
      <h1 className="text-3xl font-bold text-center mb-2">
        Get the free guide:{" "}
        <span className="text-blue-600">
          A Practical Guide to Using AI Well
        </span>
      </h1>

      <p className="text-center text-gray-600 mb-6">
        AI is quickly becoming a baseline skill. Learn how to use it well to
        work faster and do more with less.
      </p>

      <p className="text-center text-gray-600 mb-6">
        This isn’t just another list of prompts. It’s a practical, real world
        guide to working with AI tools like ChatGPT, Grok, and Gemini.
      </p>

      <p className="text-center text-gray-600 mb-6">It covers:</p>
      {/* Highlight bullets */}
      <ul className="text-gray-800 text-left mb-8 list-disc list-inside space-y-2">
        <li>Why the real skill isn’t writing perfect prompts</li>
        <li>How to use AI like a teammate</li>
        <li>
          How to turn vague goals into structured workflows AI can help with
        </li>
        <li>The biggest mistakes that make AI feel useless</li>
        <li>
          Real examples for content creation, product work, personal goals, and
          more
        </li>
      </ul>

      {/* Signup Form */}
      <form
        action="https://YOURSUBDOMAIN.beehiiv.com/subscribe"
        method="POST"
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6"
      >
        <input
          type="hidden"
          name="redirectTo"
          value="https://superprompt.tips/thanks"
        />

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Why are you interested in AI?
          </p>
          <div className="space-y-2 text-sm text-gray-800">
            {[
              "To stay competitive in my career",
              "To get more done at work",
              "To build something (startup, app, project)",
              "For creative projects (writing, design, etc.)",
              "I’m just curious / exploring",
              "Other",
            ].map((option) => (
              <label key={option} className="block">
                <input
                  type="checkbox"
                  name="goal_with_ai"
                  value={option}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            What field are you in?
          </label>
          <input
            type="text"
            name="field_of_work"
            placeholder="e.g., marketing, design, dev"
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            How are you using AI today?
          </label>
          <input
            type="text"
            name="current_usage"
            placeholder="e.g., summarizing, writing, code help"
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            How often do you use AI tools?
          </label>
          <select
            name="usage_frequency"
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose one</option>
            <option value="Every day">Every day</option>
            <option value="A few times a week">A few times a week</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Barely used it yet">Barely used it yet</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Get the Free Guide
        </button>
      </form>

      {/* Post-signup upsell idea */}
      <div className="mt-12 text-center text-gray-600">
        <p>
          Already into AI? Check out{" "}
          <Link href="/" className="text-blue-600 underline">
            SuperPrompt
          </Link>{" "}
          — curated prompts that get you better results.
        </p>
      </div>
    </div>
  );
}
