import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

type ToastItems = {
  open?: boolean;
  severity: "error" | "success" | "warning" | "info";
  message: string;
  onClose?: () => void;
};

export const Toast = (props: ToastItems) => {
  const [open, setOpen] = useState(!!props.open);

  useEffect(() => {
    setOpen(!!props.open);
  }, [props.open]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    event;
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={props.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};
