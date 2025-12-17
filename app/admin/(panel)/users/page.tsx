import RequirePermission from "@/components/admin/RequirePermission";
import UsersTable from "@/components/users/UsersTable";
import { getUsers } from "@/services/mock/users.service";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <RequirePermission permission="users">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <UsersTable users={users} />
      </div>
    </RequirePermission>
  );
}
