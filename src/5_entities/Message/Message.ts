import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { useUserStore } from "../User/UserStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUser } from "../User/User";
import { IUser } from "../User/User.types";
import { updateChat } from "../Chat/Chat";
import toast from "react-hot-toast";

export interface IMessage<
  T = DocumentReference<DocumentData, DocumentData>,
  C = T,
> {
  uid: string;
  owner: T;
  text: string;
  chat: C;
  userRead: boolean;
  createdAt: Date;
  status: string;
}

export interface ExtentedIMessage
  extends IMessage<IUser, DocumentReference<DocumentData, DocumentData>> {
  index: number;
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
  updateChat(params.chat.id, {
    updatedAt: new Date(),
    lastMessage: params.text,
  });
  return await addDoc(collection(db, "messages"), params);
};

export const fetchMessages = async (
  chatUID: string,
  part: number = 1,
): Promise<
  IMessage<IUser, DocumentReference<DocumentData, DocumentData>>[]
> => {
  const docRef = await doc(db, "chats", chatUID);
  console.log(part);
  const queryChats = await query(
    collection(db, "messages"),
    where("chat", "==", docRef),
    orderBy("createdAt", "asc"),
    // startAt(30*part),
    // limit(30),
  );

  const messages: IMessage<
    IUser,
    DocumentReference<DocumentData, DocumentData>
  >[] = [];

  const querySnapshot = await getDocs(queryChats);
  querySnapshot.forEach((doc) => {
    messages.push({ ...doc.data(), uid: doc.id } as IMessage<
      IUser,
      DocumentReference<DocumentData, DocumentData>
    >);
  });
  return messages;
};

export const deleteMessage = async (uid: string) => {
  const messageRef = await doc(db, "messages", uid);
  return await deleteDoc(messageRef);
};

export const updateMessage = async (uid: string, params: Partial<IMessage>) => {
  const docRef = doc(db, "messages", uid);

  let message: Partial<IMessage> = {};

  try {
    await setDoc(docRef, { ...params }, { merge: true });
    message = (await getDoc(docRef)).data() as IMessage;
  } catch (e) {
    toast("Ошибка при обновлении сообщения");
  }

  return message;
};

export const subscribeOnMessages = async (
  chatUID: string,
  callback: (
    messages: IMessage<IUser, DocumentReference<DocumentData, DocumentData>>[],
  ) => void,
) => {
  const docRef = doc(db, "chats", chatUID);
  const queryChats = query(
    collection(db, "messages"),
    where("chat", "==", docRef),
    orderBy("createdAt", "asc"),
  );

  const unsub = onSnapshot(queryChats, async (snapshot: any) => {
    const messages: ExtentedIMessage[] = [];
    await Promise.all(
      snapshot.docs.map(async (doc: any, index: number) => {
        const d = await doc.data();
        const user = await fetchUser(d.owner.id);
        messages.push({ ...d, uid: doc.id, owner: user, index });
      }),
    );

    messages.sort((a, b) => a.index - b.index);

    callback(
      messages as IMessage<
        IUser,
        DocumentReference<DocumentData, DocumentData>
      >[],
    );
  });

  return unsub;
};

export const useGetMessages = (chatUID: string) => {
  const { uid } = useUserStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      const onMessageChange = (
        messages: IMessage<
          IUser,
          DocumentReference<DocumentData, DocumentData>
        >[],
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
