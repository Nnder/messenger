import { Box, Modal, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

type IModalWrapper = PropsWithChildren<{
  sx?: SxProps;
  open: boolean;
  handle: (open: boolean) => void;
}>;

export const ModalWrapper = ({ sx, open, handle, children }: IModalWrapper) => {
  return (
    <Modal
      open={open}
      onClose={() => handle(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          ...sx,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
