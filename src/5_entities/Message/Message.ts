import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { useUserStore } from "../User/UserStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export interface IMessage<T> {
  uid: string;
  owner: T;
  text: string;
  chat: T;
  userRead: boolean;
  createdAt: Date;
  status: string;
}

export const createMessage = async (
  params: Partial<
    IMessage<string | DocumentReference<DocumentData, DocumentData>>
  >,
) => {
  // @ts-ignore
  const chatRef = await doc(db, "chats", params.chat);
  // @ts-ignore
  const ownerRef = await doc(db, "users", params.owner);
  params.chat = chatRef;
  params.owner = ownerRef;
  params.createdAt = new Date();
  params.status = "new";
  return await addDoc(collection(db, "messages"), params);
};

export const fetchMessages = async (chatUID: string, part: number = 1) => {
  const docRef = await doc(db, "chats", chatUID);
  console.log(part);
  const queryChats = await query(
    collection(db, "messages"),
    where("chat", "==", docRef),
    orderBy("createdAt", "asc"),
    // startAt(30*part),
    // limit(30),
  );

  const messages: IMessage<DocumentReference<DocumentData, DocumentData>>[] =
    [];

  const querySnapshot = await getDocs(queryChats);
  querySnapshot.forEach((doc) => {
    messages.push({ ...doc.data(), uid: doc.id } as IMessage<
      DocumentReference<DocumentData, DocumentData>
    >);
  });
  return messages;
};

export const subscribeOnMessages = async (
  chatUID: string,
  callback: (
    messages: IMessage<DocumentReference<DocumentData, DocumentData>>[],
  ) => void,
) => {
  const docRef = doc(db, "chats", chatUID);
  const queryChats = await query(
    collection(db, "messages"),
    where("chat", "==", docRef),
    orderBy("createdAt", "asc"),
    // startAt(30*page),
    // limit(30),
  );

  const unsub = onSnapshot(queryChats, (snapshot: any) => {
    const messages: IMessage<DocumentReference<DocumentData, DocumentData>>[] =
      [];
    snapshot.forEach((doc: any) => {
      messages.push({ ...doc.data(), uid: doc.id });
    });

    callback(messages);
  });

  return unsub;
};

// export const useGetMessages = (chatUID: string) => {
//   const { uid } = useUserStore();
//   return useQuery({
//     queryKey: ["messages", uid, chatUID],
//     queryFn: () => fetchMessages(chatUID),
//   });
// };

export const useGetMessages = (chatUID: string) => {
  const { uid } = useUserStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      const onMessageChange = (
        messages: IMessage<DocumentReference<DocumentData, DocumentData>>[],
      ) => {
        queryClient.setQueryData(["messages", uid, chatUID], messages);
      };
      return await subscribeOnMessages(chatUID || "", onMessageChange);
    };
    const unsub = fetchData();

    return () => {
      Promise.resolve(unsub).then((unsub) => {
        unsub();
      });
    };
  }, [chatUID, uid, queryClient]);

  return useQuery({
    queryKey: ["messages", uid, chatUID],
    queryFn: () => fetchMessages(chatUID),
  });
};
