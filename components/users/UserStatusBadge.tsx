import { UserStatus } from "@/types/user";

const COLORS: Record<UserStatus, string> = {
  ACTIVE: "bg-green-600",
  SUSPENDED: "bg-yellow-600",
  BANNED: "bg-red-600",
};

export default function UserStatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs text-white ${COLORS[status]}`}
    >
      {status}
    </span>
  );
}
