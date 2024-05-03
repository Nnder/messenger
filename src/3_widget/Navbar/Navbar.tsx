import { Box, Input } from '@mui/material';
import ButtonText from '../../6_shared/UI/Buttons/Folder/ButtonText';
import ButtonFolder from '../../6_shared/UI/Buttons/Folder/ButtonFolder';
import ChatItem from '../../4_features/Chat/ChatItem';
import MainModal from '../../4_features/Modal/MainModal';
// import { useTheme } from "@emotion/react";

export default function Navbar() {
  // const theme = useTheme();
  return (
    <Box sx={{
      width: { xs: '100vw', sm: '30vw' },
      maxWidth: { xs: '100vw', md: '300px' },
      background: 'black',
      height: '100vh',
      display: 'grid',
      gridTemplateRows: '56px 1fr',
      position: { xs: 'absolute', sm: 'initial' },
    }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <MainModal />
        <Input placeholder="Поиск" sx={{ color: '#fff', mr: 1, width: '70%' }} />
      </Box>
      <Box sx={{ background: '#201E1F', display: { sm: 'block', md: 'flex' }, height: 'calc(100vh - 56px)' }}>
        {/* Список чатов */}
        <Box sx={{
          display: { xs: 'none', sm: 'none', md: 'block' }, width: '25%', background: '#201E1F', borderRight: '1px solid #353535', height: 'calc(100vh - 56px)', overflow: 'auto',
        }}
        >
          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>

          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>
          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>
          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>
          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>
          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>
          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>
          <ButtonFolder>Все чаты</ButtonFolder>
          <ButtonFolder>Личное</ButtonFolder>
        </Box>

        {/* Список чатов для мобилки */}
        <Box sx={{
          display: { xs: 'flex', sm: 'flex', md: 'none' }, width: { xs: '100vw', sm: '30vw' }, background: '#201E1F', height: '56px', overflow: 'auto',
        }}
        >
          <ButtonText>Все чаты</ButtonText>
          <ButtonText>Личное</ButtonText>

          <ButtonText>Все чаты</ButtonText>
          <ButtonText>Личное</ButtonText>
          <ButtonText>Все чаты</ButtonText>
          <ButtonText>Личное</ButtonText>
          <ButtonText>Все чаты</ButtonText>
          <ButtonText>Личное</ButtonText>
          <ButtonText>Все чаты</ButtonText>
          <ButtonText>Личное</ButtonText>
          <ButtonText>Все чаты</ButtonText>
          <ButtonText>Личное</ButtonText>
          <ButtonText>Все чаты</ButtonText>
          <ButtonText>Личное</ButtonText>
        </Box>

        <Box sx={{ width: { sm: '100%', md: '75%' }, height: { xs: 'calc(100vh - 112px)', sm: 'calc(100vh - 112px)', md: 'calc(100vh - 56px)' }, overflow: 'auto' }}>
          <ChatItem href="/">1</ChatItem>
          <ChatItem href="/friends">1</ChatItem>
          <ChatItem href="/chats">1</ChatItem>
          <ChatItem href="/settings">1</ChatItem>

          <ChatItem href="/">1</ChatItem>
          <ChatItem href="/friends">1</ChatItem>
          <ChatItem href="/chats">1</ChatItem>
          <ChatItem href="/settings">1</ChatItem>
          <ChatItem href="/">1</ChatItem>
          <ChatItem href="/friends">1</ChatItem>
          <ChatItem href="/chats">1</ChatItem>
          <ChatItem href="/settings">1</ChatItem>
          <ChatItem href="/">1</ChatItem>
          <ChatItem href="/friends">1</ChatItem>
          <ChatItem href="/chats">1</ChatItem>
          <ChatItem href="/settings">1</ChatItem>
        </Box>
      </Box>
    </Box>
  );
}
