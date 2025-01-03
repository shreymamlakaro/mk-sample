/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

type User = {
  id: string;
  created_at: string;
  profile_completed:boolean;
  first_name:string;
  last_name:string;
  profile_picture: string | null;
  username: string;
  email: string;
  is_admin: boolean;
  updated_at:string
};

export default function DashUsers({ isAdmin }: { isAdmin: boolean }) {
  const supabase = createClient();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (isAdmin) {
          const { data: usersData, error: usersError } = await supabase
            .from("users")
            .select("*");

          if (usersError) {
            console.log("error",userError)
            setError(usersError.message);
            return;
          }
          console.log('user data' ,usersData)
          setUsers(usersData || []);
        }
      } catch (err) {
        console.log(err)
        setError("An unexpected error occurred.");
      } finally {
        setIsLoaded(true);
      }
    };

    fetchUserDetails();
  }, [isAdmin]);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7 text-black">
        <h1 className="text-2xl font-semibold text-red-600">Error: {error}</h1>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7 text-black">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  return (
    <div className=" overflow-x-scroll mt-10 text-black  w-4/5 mx-auto hide-scrollbar">
      {users.length > 0 ? (
        <Table className="w-full visible bg-">
          <Table.Head className="border border-gray-300">
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user) => (
              <Table.Row
                className=" bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                key={user.id}
              >
                <Table.Cell >
                  {new Date(user?.created_at).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={user?.profile_picture || "/default-avatar.png"}
                    alt={`${user?.username}'s profile`}
                    className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>{user?.username}</Table.Cell>
                <Table.Cell>{user?.email}</Table.Cell>
                <Table.Cell>
                  {user.is_admin ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
}
