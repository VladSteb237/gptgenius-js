import { UserProfile } from "@clerk/nextjs";
import React from "react";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { auth } from "@clerk/nextjs/server";
import { fetchUserTokensById } from "@/utils/actions";
export const dynamic = "force-dynamic";

const Profile = async () => {
  const { userId } = await auth();
  const queryClient = new QueryClient();
  const currentTokens = await fetchUserTokensById(userId);

  return (
    <React.Fragment>
      <div>
        <h2 className="mb-8 ml-8 text-xl font-extrabold">
          Token Amount : {currentTokens}
        </h2>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile routing="hash" />
      </HydrationBoundary>
    </React.Fragment>
  );
};

export default Profile;
