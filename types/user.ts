export type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  platform: "iOS" | "Android";
  status: UserStatus;
  createdAt: string;
}
