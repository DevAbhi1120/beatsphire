import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
    await new Promise(res => setTimeout(res, 500));

    return [
        {
            id: "u1",
            name: "John Doe",
            email: "john@example.com",
            platform: "iOS",
            status: "ACTIVE",
            createdAt: "2024-01-10",
        },
        {
            id: "u2",
            name: "Jane Smith",
            email: "jane@example.com",
            platform: "Android",
            status: "SUSPENDED",
            createdAt: "2024-02-03",
        },
        {
            id: "u3",
            name: "Alex Brown",
            email: "alex@example.com",
            platform: "iOS",
            status: "BANNED",
            createdAt: "2023-12-21",
        },
    ];
}
