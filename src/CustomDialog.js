import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Box } from '@mui/system';

const CustomDialog = ({
  open,
  title,
  actions,
  showClose = false,
  closeHandler = () => {
    // do nothing.
  },
  children,
  disableEscape = false,
  fullScreen = false,
  className,
}) => (
  <Dialog
    onClose={(_event, reason) => {
      closeHandler();
    }}
    open={open}
    maxWidth="md"
    fullWidth
    disableEscapeKeyDown={disableEscape}
    fullScreen={fullScreen}
    className={className}
  >
    {showClose && (
      <IconButton
        sx={{ position: 'absolute', top: '8px', right: '10px' }}
        onClick={() => closeHandler()}
      >
        <Close />
      </IconButton>
    )}
    {title && (
      <DialogTitle
        sx={{
          textAlign: 'center',
        }}
      >
        <b>{title}</b>
      </DialogTitle>
    )}
    <DialogContent sx={{ overflowY: 'auto' }}>{children}</DialogContent>
    <DialogActions sx={{ justifyContent: 'flex-end' }}>
      <Box sx={{ my: 2, mt: 2, mx: 4, textAlign: 'center' }}>{actions}</Box>
    </DialogActions>
  </Dialog>
);

export default CustomDialog;
