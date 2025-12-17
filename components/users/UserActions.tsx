"use client";

export default function UserActions({ userId }: { userId: string }) {
  return (
    <div className="flex gap-2">
      <button className="text-sm text-blue-400 hover:underline">
        View
      </button>
      <button className="text-sm text-yellow-400 hover:underline">
        Suspend
      </button>
      <button className="text-sm text-red-400 hover:underline">
        Ban
      </button>
    </div>
  );
}
