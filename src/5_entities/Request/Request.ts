import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { IChat } from "../Chat/Chat.types";
import { IUser } from "../User/User.types";
import { db } from "../../6_shared/firebase/firebase";
import { fetchUser } from "../User/User";
import { fetchChat } from "../Chat/Chat";

export interface IRequest {
  ref?: DocumentReference<DocumentData, DocumentData>;
  uid?: string;
  type: "chat" | "personal";
  from: DocumentReference<DocumentData, DocumentData>;
  to: DocumentReference<DocumentData, DocumentData>;
  addTo: {
    user?: DocumentReference<DocumentData, DocumentData>;
    chat?: DocumentReference<DocumentData, DocumentData>;
  };
}

export interface IRequestReady {
  ref?: DocumentReference<DocumentData, DocumentData>;
  uid?: string;
  type: "chat" | "personal";
  from: IUser;
  to: IUser;
  addTo: {
    user?: IUser;
    chat?: IChat;
  };
}

export const createRequest = async (params: IRequest) => {
  return await addDoc(collection(db, "requests"), params);
};

export const subscribeOnRequests = async (
  uid: string,
  callback: (requests: IRequestReady[]) => void,
) => {
  const docRef = await doc(db, "users", uid);
  // const to = await getDoc(docRef);
  const queryChats = query(
    collection(db, "requests"),
    where("to", "==", docRef),
  );

  const unsub = await onSnapshot(queryChats, async (snapshot: any) => {
    const requests: IRequestReady[] = [];
    await Promise.all(
      snapshot.docs.map(async (doc: any) => {
        const d = await doc.data();
        const from = await fetchUser(d.from.id);
        const to = await fetchUser(d.to.id);
        const addTo =
          d.type == "chat"
            ? { chat: await fetchChat(d.addTo.chat.id) }
            : { user: await fetchUser(d.addTo.user.id) };
        requests.push({
          ...d,
          uid: doc.id,
          ref: doc,
          from: { ...from, ref: d.from },
          to: { ...to, ref: d.to },
          addTo,
        });
      }),
    );

    callback(requests);
  });

  return unsub;
};

export const deleteRequest = async (uid: string) => {
  const requestRef = await doc(db, "requests", uid);
  return await deleteDoc(requestRef);
};

// export const updateMessage = async (uid: string, params: Partial<IMessage>) => {
//   const docRef = doc(db, "messages", uid);

//   let message: Partial<IMessage> = {};

//   try {
//     await setDoc(docRef, { ...params }, { merge: true });
//     message = (await getDoc(docRef)).data() as IMessage;
//   } catch (e) {
//     toast("Ошибка при обновлении сообщения");
//   }

//   return message;
// };
