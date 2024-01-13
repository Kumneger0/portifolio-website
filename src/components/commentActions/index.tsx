import {
  changeVote,
  deleteComment,
  getAllComments,
  getUser,
  writeReply
} from "@/app/actions/action";
import { atom, useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GoReply } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { MdOutlineDelete } from "react-icons/md";
import { LoginModal } from "../blogHeader/blogHeader";
import { Button } from "../ui/button";
import { SubmitForm } from "../writeComments";
const commentIdAtom = atom<number | null>(null);
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote
} from "react-icons/bi";
declare module "react" {
  const useOptimistic: typeof experimental_useOptimistic;
}

const voteAtom = atom<{ id: null | number; isUpvote: boolean }>({
  id: null,
  isUpvote: false
});

import React, {
  //@ts-ignore
  useOptimistic
} from "react";

type TVotes = NonNullable<
  Awaited<ReturnType<typeof getAllComments>>
>["comments"][number]["votes"];

const Vote = memo(
  ({
    id,
    asset_id,
    votes
  }: {
    id: number;
    asset_id: string;
    votes: TVotes;
  }) => {
    const { data, status } = useSession();
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [optimisticVotes, setOptimisticVotes] = useOptimistic(
      votes,
      (prv, newVotes: typeof votes) => {
        return newVotes;
      }
    );

    useEffect(() => {
      (async () => {
        if (!data?.user?.email) return;
        getUser(data.user?.email).then((user) => setUserId(user?.id ?? null));
      })();
    }, [data?.user?.email]);

    const upvotesCount = optimisticVotes.filter(
      ({ isUpvote }) => isUpvote
    ).length;
    const downvotesCount = optimisticVotes.length - upvotesCount;

    const userVote = votes.find((vote) => vote.userId === userId);

    async function createVote(isUpvote: boolean) {
      if (status === "unauthenticated" || !data?.user?.email) return;
      const newVote = optimisticVotes.findIndex(
        (vote) => vote.userId === userId
      );
      if (newVote !== -1) {
        const changedVote = [...optimisticVotes];
        changedVote[newVote].isUpvote = isUpvote;

        setOptimisticVotes(changedVote satisfies typeof optimisticVotes);
      } else {
        setOptimisticVotes([
          ...optimisticVotes,
          {
            commentId: id,
            date: new Date(),
            id: optimisticVotes.length + 1,
            isUpvote,
            userId: ""
          }
        ]);
      }
      await changeVote(id, isUpvote, data?.user?.email, asset_id);
    }

    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div>
            {userVote?.isUpvote ? (
              <Button disabled>
                <BiSolidUpvote className="w-7 h-7 text-green-500" />
              </Button>
            ) : (
              <Button disabled={isLoading} onClick={() => createVote(true)}>
                <BiUpvote className="w-7 h-7" />
              </Button>
            )}
          </div>
          <div>{upvotesCount}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            {userVote?.isUpvote === false ? (
              <Button disabled>
                <BiSolidDownvote className="w-7 h-7 text-red-500" />
              </Button>
            ) : (
              <Button onClick={() => createVote(false)}>
                <BiDownvote className="w-7 h-7 " />
              </Button>
            )}
          </div>
          <div>{downvotesCount}</div>
        </div>
      </div>
    );
  }
);

export interface Details {
  userEmail: string | null;
  asset_id: string;
  commentId: number;
}

const ReplyComments = memo(
  ({
    asset_id,
    commentId,
    replayFormPrentId
  }: {
    asset_id: string;
    commentId: number;
    replayFormPrentId: string;
  }) => {
    const { data, status } = useSession();

    const [id, setId] = useAtom(commentIdAtom);

    const details = {
      userEmail: data?.user?.email ?? null,
      asset_id,
      commentId
    };

    const createCommentsWithDetails = writeReply.bind(null, details);

    async function handleSubmit(formData: FormData) {
      await createCommentsWithDetails(formData);
      setId(null);
    }

    if (status === "unauthenticated")
      return (
        <LoginModal>
          {" "}
          <GoReply className="w-7 h-7 text-white" />
        </LoginModal>
      );

    return (
      <div className="">
        <Button
          disabled={status === "loading"}
          className={`${
            status === "loading" ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => {
            if (!setId) return;
            setId((prv) => (prv === commentId ? null : commentId));
          }}
          variant={"destructive"}
        >
          <GoReply className="w-7 h-7 text-white" />
        </Button>
        {id === commentId ? (
          <>
            {createPortal(
              <form action={handleSubmit}>
                <input
                  className="border-2 text-black border-gray-300 rounded-md p-2"
                  required
                  autoCapitalize="on"
                  spellCheck
                  // biome-ignore lint/a11y/noAutofocus: <explanation>
                  autoFocus
                  type="text"
                  name="content"
                  placeholder={`write a reply ${commentId}`}
                />
                <SubmitForm />
              </form>,
              document.getElementById(replayFormPrentId) as HTMLDivElement
            )}
          </>
        ) : null}
      </div>
    );
  }
);

const Delete = memo(({ userEmail, asset_id, commentId }: Details) => {
  const { data } = useSession();

  if (data?.user?.email !== userEmail || !data.user) return;

  function handleDeleteCommentAction() {
    if (!data?.user) return;
    deleteComment({
      asset_id,
      commentId,
      userEmail
    });
  }

  return (
    <Button onClick={handleDeleteCommentAction} variant={"destructive"}>
      <MdOutlineDelete className="w-7 h-7 text-red-600" />
    </Button>
  );
});

export { Delete, ReplyComments, Vote };
