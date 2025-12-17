"use client";

export default function CampaignForm() {
  return (
    <form className="space-y-4 bg-neutral-900 p-4 rounded-lg">
      <input
        className="w-full px-3 py-2 rounded bg-neutral-800"
        placeholder="Campaign Title"
      />

      <textarea
        className="w-full px-3 py-2 rounded bg-neutral-800"
        placeholder="Notification Message"
      />

      <select className="w-full px-3 py-2 rounded bg-neutral-800">
        <option>ALL</option>
        <option>iOS</option>
        <option>ANDROID</option>
      </select>

      <button className="px-4 py-2 bg-blue-600 rounded text-white">
        Save Campaign
      </button>
    </form>
  );
}
