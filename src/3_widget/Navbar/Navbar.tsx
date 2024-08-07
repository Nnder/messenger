import { Box, Button, Input, Menu, MenuItem } from "@mui/material";
import ButtonText from "../../6_shared/UI/Buttons/Folder/ButtonText";
import ButtonFolder from "../../6_shared/UI/Buttons/Folder/ButtonFolder";
import MainModal from "../../4_features/Modal/MainModal";
import { ChatList } from "../../4_features/Chat/ChatList";
import { memo, useEffect, useRef, useState } from "react";
import { fetchBySearch } from "../../5_entities/Search/Search";
import { IUser } from "../../5_entities/User/User.types";
import { IChat } from "../../5_entities/Chat/Chat.types";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useUserStore } from "../../5_entities/User/UserStore";
import { IRequest, createRequest } from "../../5_entities/Request/Request";
import { addUserToChat } from "../../5_entities/Chat/Chat";
import { useNavbarStore } from "../../5_entities/Mobile/MobileStore";
import { useFolderStore } from "../../5_entities/Folder/Folder";
import once from "../../6_shared/helpers/onceClick";

interface ISearch {
  users?: IUser[];
  chats?: IChat[];
}

export default memo(function Navbar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ISearch>({});
  const inputSearch = useRef<HTMLInputElement | null>(null);
  const { ref, getUser } = useUserStore();
  const { setType, setFilterdChats, folderType } = useFolderStore();

  const makeSearch = (search: string) => {
    if (!!search)
      fetchBySearch(search, getUser()).then((data) => {
        setData(data);
        handleSearch();
      });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSearch = () => {
    if (inputSearch && inputSearch.current)
      setTimeout(() => setAnchorEl(inputSearch.current), 1000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendFriendRequest = (user: IUser, e: any) => {
    if (user?.ref && ref) {
      e.target.disabled = true;
      const request: IRequest = {
        type: "personal",
        from: ref,
        to: user?.ref,
        addTo: {
          user: user?.ref,
        },
      };
      console.log("works", request);
      createRequest(request);
    }
  };

  const enterChat = (chat: IChat) => {
    if (chat?.uid && ref) addUserToChat(chat?.uid, ref);
  };

  const { showNabar } = useNavbarStore();
  const [show, setShow] = useState(showNabar);

  useEffect(() => {
    const unsub = useNavbarStore.subscribe(
      (state) => state.showNabar,
      (showNabar: boolean) => {
        setShow(showNabar);
      },
    );

    const unsubFolder = useFolderStore.subscribe(
      (state) => state.folderType,
      (folderType: string) => {
        console.log("filtered chats", folderType);
        setFilterdChats();
      },
    );

    return () => {
      unsub();
      unsubFolder();
    };
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "100vw", sm: "30vw" },
        maxWidth: { xs: "100vw", md: "500px" },
        background: "black",
        height: "100vh",
        display: {
          xs: show ? "grid" : "none",
          sm: "grid",
          md: "grid",
        },
        gridTemplateRows: "56px 1fr",
        position: { xs: "absolute", sm: "initial" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <MainModal />
        <Input
          ref={inputSearch}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            makeSearch(e.target.value);
          }}
          placeholder="Поиск"
          sx={{ color: "#fff", mr: 1, width: "70%" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          id="basic-button"
        />
        <Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              maxHeight: "80vh",
              minWidth: 200,
            }}
          >
            {data?.users &&
              data?.users.map((user: IUser, i: number) => (
                <MenuItem
                  key={user?.uid ? i + user?.uid : i + user.username}
                  sx={{ minWidth: 200, width: "100%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    @{user.username}
                    <Button onClick={(e) => once(sendFriendRequest)(user, e)}>
                      <AddIcon sx={{ color: "black" }} />
                    </Button>
                  </Box>
                </MenuItem>
              ))}

            {data?.chats &&
              data?.chats.map((chat: IChat, i: number) => (
                <MenuItem
                  key={chat?.uid ? i + chat?.uid : i + chat.name}
                  sx={{ minWidth: 200, width: "100%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>Чат: {chat.name}</Box>
                    <Button
                      onClick={(e: any) => {
                        e.target.disabled = true;
                        once(enterChat)(chat);
                      }}
                    >
                      <ChevronRightIcon sx={{ color: "black" }} />
                    </Button>
                  </Box>
                </MenuItem>
              ))}
          </Menu>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#201E1F",
          display: { sm: "block", md: "flex" },
          height: "calc(100vh - 56px)",
        }}
      >
        {/* Список чатов */}
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            width: "20%",
            background: "#201E1F",
            borderRight: "1px solid #353535",
            height: "calc(100vh - 56px)",
            overflow: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
          }}
        >
          <ButtonFolder
            background={
              folderType && folderType === "all" ? "#000000" : "inherit"
            }
            onClick={() => {
              setType("all");
              setFilterdChats();
            }}
          >
            Все
          </ButtonFolder>
          <ButtonFolder
            background={
              folderType && folderType === "chat" ? "#000000" : "inherit"
            }
            onClick={() => {
              setType("chat");
              setFilterdChats();
            }}
          >
            Чаты
          </ButtonFolder>
          <ButtonFolder
            background={
              folderType && folderType === "personal" ? "#000000" : "inherit"
            }
            onClick={() => {
              setType("personal");
              setFilterdChats();
            }}
          >
            Личное
          </ButtonFolder>
        </Box>

        {/* Список чатов для мобилки */}
        <Box
          sx={{
            display: { xs: "flex", sm: "flex", md: "none" },
            width: { xs: "100vw", sm: "30vw" },
            background: "#201E1F",
            height: "56px",
            overflow: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <ButtonText
            background={
              folderType && folderType === "all" ? "#000000" : "inherit"
            }
            onClick={() => {
              setType("all");
              setFilterdChats();
            }}
          >
            Все
          </ButtonText>
          <ButtonText
            background={
              folderType && folderType === "chat" ? "#000000" : "inherit"
            }
            onClick={() => {
              setType("chat");
              setFilterdChats();
            }}
          >
            Чаты
          </ButtonText>
          <ButtonText
            background={
              folderType && folderType === "personal" ? "#000000" : "inherit"
            }
            onClick={() => {
              setType("personal");
              setFilterdChats();
            }}
          >
            Личное
          </ButtonText>
        </Box>

        <Box
          sx={{
            width: { sm: "100%", md: "80%" },
            height: {
              xs: "calc(100vh - 112px)",
              sm: "calc(100vh - 112px)",
              md: "calc(100vh - 56px)",
            },
            overflow: "auto",
            scrollbarWidth: "thin",
          }}
          key="chatList"
        >
          <ChatList />
        </Box>
      </Box>
    </Box>
  );
});
