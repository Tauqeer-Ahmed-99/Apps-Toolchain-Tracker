"use client";

import React, { use, useActionState, useEffect, useRef, useState } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import CurrencyRupeeSharp from "@mui/icons-material/CurrencyRupeeSharp";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import { ServerActionState, ServerActionStatus, Service } from "@/lib/models";
import { AddServiceFormState } from "@/lib/formModels";
import { createUpdateService } from "@/server/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams } from "next/navigation";
import Options from "./Options";
import DeleteServiceButton from "./DeleteServiceButton";
import { getServiceIcon } from "@/lib/utils";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddService = ({ service }: { service?: Service }) => {
  const { user } = useKindeBrowserClient();
  const { appId } = useParams();
  const [open, setOpen] = useState(false);

  const initialState: ServerActionState<AddServiceFormState> = {
    status: ServerActionStatus.NotInitialized,
    message: "",
    formState: {
      appId: service ? (appId as string) ?? "" : "",
      userId: service ? user?.id ?? "" : "",
      serviceId: service?.serviceId ?? "",
      serviceName: service?.serviceName ?? "",
      serviceCost: service?.cost?.cost ?? "",
      serviceCostCycle: service?.cost?.costCycle ?? "Monthly",
      serviceDescription: service?.serviceDescription ?? "",
    },
  };

  const [state, formAction, isPending] = useActionState(
    createUpdateService,
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
    <>
      {service ? (
        <MenuItem sx={{ py: 2 }} onClick={openDialog}>
          <ListItemAvatar>
            <ListItemAvatar>
              <Image
                src={getServiceIcon(service.serviceName).icon}
                alt={service.serviceName}
                height={30}
              />
            </ListItemAvatar>
          </ListItemAvatar>
          <ListItemText
            primary={service.serviceName}
            secondary={`${service.cost?.costCycle} recurring cost of ${service.cost?.cost}`}
          />
          <Box display="flex" alignItems="center">
            <CurrencyRupeeSharp fontSize="small" />
            <Typography>{service.cost?.cost ?? 0}</Typography>
          </Box>
        </MenuItem>
      ) : (
        <Button
          endIcon={<MiscellaneousServicesRoundedIcon fontSize="small" />}
          variant="contained"
          onClick={openDialog}
        >
          Add Service
        </Button>
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
            Add Service
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
            <TextField
              id="appId"
              name="appId"
              fullWidth
              defaultValue={appId}
              disabled={isPending}
              sx={{ display: "none" }}
              type="hidden"
              hidden
            />
            {service && (
              <TextField
                id="serviceId"
                name="serviceId"
                fullWidth
                defaultValue={service.serviceId}
                disabled={isPending}
                sx={{ display: "none" }}
                type="hidden"
                hidden
              />
            )}
            <Box py={1}>
              <InputLabel>Service Name</InputLabel>
              <TextField
                id="serviceName"
                name="serviceName"
                placeholder="Enter Service Name..."
                fullWidth
                defaultValue={state.formState.serviceName}
                disabled={isPending}
              />
            </Box>
            <Box py={1}>
              <InputLabel>Service Cost</InputLabel>
              <TextField
                id="serviceCost"
                name="serviceCost"
                placeholder="Enter Service Cost..."
                fullWidth
                defaultValue={state.formState.serviceCost}
                disabled={isPending}
                type="number"
              />
            </Box>
            <Box py={1}>
              <Options
                id="serviceCostCycle"
                name="serviceCostCycle"
                inputLabel="Cost Cycle"
                defaultValue={state.formState.serviceCostCycle ?? "Monthly"}
                disabled={isPending}
                options={[
                  { label: "Weekly", value: "Weekly" },
                  { label: "Monthly", value: "Monthly" },
                  { label: "Annual", value: "Annual" },
                ]}
              />
            </Box>
            <Box py={1}>
              <InputLabel>Service Description</InputLabel>
              <TextField
                id="serviceDescription"
                name="serviceDescription"
                placeholder="Enter Service Description..."
                fullWidth
                defaultValue={state.formState.serviceDescription}
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
            {service && (
              <DeleteServiceButton
                service={service}
                onSuccess={closeDialog}
                disabled={isPending}
              />
            )}
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
    </>
  );
};

export default AddService;
