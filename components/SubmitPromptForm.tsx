"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "../contexts/UserContext";

interface SubmitPromptFormProps {
  onCancelAction: () => void;
  onSuccessAction: () => void;
}

export default function SubmitPromptForm({
  onCancelAction,
  onSuccessAction,
}: SubmitPromptFormProps) {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promptText, setPromptText] = useState("");
  const [outputPreview, setOutputPreview] = useState("");
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");
  const [aiType, setAiType] = useState("General LLM");
  const [specificTool, setSpecificTool] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be signed in to submit a prompt");
      return;
    }

    if (!title.trim() || !description.trim() || !promptText.trim()) {
      setError("Title, description, and prompt are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Convert categories string to array
      const categoriesArray = categories
        .split(",")
        .map((category) => category.trim().toLowerCase())
        .filter((category) => category.length > 0);

      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);

      const outputPreviewArray = outputPreview
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const { error: submitError } = await supabase.from("prompts").insert({
        title,
        description,
        prompt: promptText,
        categories: categoriesArray,
        tags: tagsArray,
        ai_type: aiType,
        specific_tool: specificTool || null,
        user_id: user.id,
        output_preview: outputPreviewArray,
      });

      if (submitError) {
        throw submitError;
      }

      // Clear form and show success
      setTitle("");
      setDescription("");
      setPromptText("");
      setCategories("");
      setTags("");
      setAiType("General LLM");
      setSpecificTool("");

      onSuccessAction();
    } catch (err) {
      console.error("Error submitting prompt:", err);
      setError("Failed to submit prompt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Submit a New Prompt</h2>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Life Coach Prompt"
            required
          />
          <p className="text-xs text-zinc-400 mt-1">
            {title.length}/100 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., A prompt to help you become your best self"
            required
            rows={8}
            maxLength={5000}
          />
        </div>

        <div>
          <label
            htmlFor="outputPreview"
            className="block text-sm font-medium mb-2"
          >
            Output Previews
          </label>
          <input
            id="outputPreview"
            type="text"
            value={outputPreview}
            onChange={(e) => setOutputPreview(e.target.value)}
            className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Image urls for output previews (max 2) (comma-separated)"
          />
        </div>

        <div>
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">
            Prompt <span className="text-red-500">*</span>
          </label>
          <textarea
            id="prompt"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={8}
            maxLength={5000}
            className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your prompt here..."
            required
          />
          <p className="text-xs text-zinc-400 mt-1">
            {promptText.length}/5000 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium mb-2"
          >
            Categories
          </label>
          <input
            id="categories"
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Education, Coaching (comma-separated)"
          />
          <p className="text-xs text-zinc-400 mt-1">
            Separate categories with commas
          </p>
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-2">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Education, Coaching (comma-separated)"
          />
          <p className="text-xs text-zinc-400 mt-1">
            Separate tags with commas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="aiType" className="block text-sm font-medium mb-2">
              AI Type <span className="text-red-500">*</span>
            </label>
            <select
              id="aiType"
              value={aiType}
              onChange={(e) => setAiType(e.target.value)}
              className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="General LLM">General LLM</option>
              <option value="Code Generation">Code Generation</option>
              <option value="Image Generation">Image Generation</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="specificTool"
              className="block text-sm font-medium mb-2"
            >
              Specific Tool (Optional)
            </label>
            <input
              id="specificTool"
              type="text"
              value={specificTool}
              onChange={(e) => setSpecificTool(e.target.value)}
              className="w-full py-2 px-3 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., ChatGPT, Midjourney"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancelAction}
            className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></span>
                Submitting...
              </>
            ) : (
              "Submit Prompt"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
