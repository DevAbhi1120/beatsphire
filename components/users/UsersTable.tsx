import { User } from "@/types/user";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto border border-neutral-800 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2">Platform</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-neutral-800">
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2 text-gray-400">{u.email}</td>
              <td className="px-4 py-2 text-center">{u.platform}</td>
              <td className="px-4 py-2 text-center">
                <UserStatusBadge status={u.status} />
              </td>
              <td className="px-4 py-2 text-center">{u.createdAt}</td>
              <td className="px-4 py-2 text-center">
                <UserActions userId={u.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
