import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../../5_entities/Chat/Chat";
import { useUserStore } from "../../5_entities/User/UserStore";

export const useGetChats = () => {
  const { uid, getUser } = useUserStore();
  return useQuery({
    queryKey: ["chats", uid],
    queryFn: () => fetchChats(getUser()),
  });
};
