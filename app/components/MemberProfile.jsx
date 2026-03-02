import { fetchOrGenerateTokens } from "@/utils/actions";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  await fetchOrGenerateTokens(userId);
  return (
    <div className="flex items-center gap-2 px-4">
      <UserButton />
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default MemberProfile;
