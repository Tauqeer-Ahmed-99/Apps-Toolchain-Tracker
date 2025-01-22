"use client";

import React, { useActionState, useEffect, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { createUpdateApplication } from "@/server/actions";
import {
  Application,
  AppType,
  ServerActionState,
  ServerActionStatus,
} from "@/lib/models";
import { AddAppFormState } from "@/lib/formModels";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Options from "./Options";
import DeleteAppButton from "./DeleteAppButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddApp = ({ app }: { app?: Application }) => {
  const { user } = useKindeBrowserClient();
  const [open, setOpen] = React.useState(false);

  const initialState: ServerActionState<AddAppFormState> = {
    status: ServerActionStatus.NotInitialized,
    message: "",
    formState: {
      appName: app?.appName ?? "",
      appDescription: app?.appDescription ?? "",
      userId: app ? user?.id ?? "" : "",
      appId: app?.appId ?? "",
      appType: app ? app.appType : "Web",
    },
  };

  const [state, formAction, isPending] = useActionState(
    createUpdateApplication,
    initialState
  );

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (state.status === ServerActionStatus.Success) {
      closeDialog();
    }
  }, [state]);

  return (
    <React.Fragment>
      {app ? (
        <Button
          endIcon={<EditRoundedIcon fontSize="small" />}
          variant="contained"
          onClick={openDialog}
        >
          Edit
        </Button>
      ) : (
        <MenuItem onClick={openDialog}>
          <ListItemIcon>
            <AddRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Add Application"
            secondary="Create a new App"
          />
        </MenuItem>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={isPending ? undefined : closeDialog}
        maxWidth="xs"
        fullWidth
      >
        <form action={formAction}>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {app ? "Update" : "Add"} Application
            <IconButton
              ref={closeButtonRef}
              onClick={closeDialog}
              size="small"
              disabled={isPending}
            >
              <CloseRoundedIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              id="userId"
              name="userId"
              fullWidth
              defaultValue={user?.id}
              disabled={isPending}
              sx={{ display: "none" }}
              type="hidden"
              hidden
            />
            {app && (
              <TextField
                id="appId"
                name="appId"
                fullWidth
                defaultValue={app.appId}
                disabled={isPending}
                sx={{ display: "none" }}
                type="hidden"
                hidden
              />
            )}
            <Box py={1}>
              <InputLabel>Application Name</InputLabel>
              <TextField
                id="appName"
                name="appName"
                placeholder="Enter Application Name..."
                fullWidth
                defaultValue={state.formState.appName}
                disabled={isPending}
              />
            </Box>
            <Box py={1}>
              <Options
                id="appType"
                name="appType"
                inputLabel="Application Type"
                defaultValue={state.formState.appType}
                disabled={isPending}
                options={[
                  { label: "Web App", value: AppType.Web },
                  { label: "Mobile App", value: AppType.Mobile },
                  { label: "Desktop App", value: AppType.Desktop },
                  { label: "Hybrid App", value: AppType.Hybrid },
                ]}
              />
            </Box>
            <Box py={1}>
              <InputLabel>Application Description</InputLabel>
              <TextField
                id="appDescription"
                name="appDescription"
                placeholder="Enter Application Description..."
                fullWidth
                defaultValue={state.formState.appDescription}
                disabled={isPending}
              />
            </Box>
            {state.status === ServerActionStatus.Error && (
              <Typography variant="subtitle2" sx={{ color: "red" }}>
                {state.message}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            {app && <DeleteAppButton app={app} disabled={isPending} />}
            <Button onClick={closeDialog} disabled={isPending}>
              Cancel
            </Button>
            <Button
              variant="contained"
              loading={isPending}
              loadingPosition="start"
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddApp;
