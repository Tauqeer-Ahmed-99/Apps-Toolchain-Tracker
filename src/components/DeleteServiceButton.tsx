"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { deleteApplication, deleteService } from "@/server/actions";
import { ServerActionStatus, Service } from "@/lib/models";
import Dialog from "@mui/material/Dialog";
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DeleteServiceButton = ({
  service,
  onSuccess,
  disabled,
}: {
  service: Service;
  onSuccess?: () => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openConfirmation = () => {
    setOpen(true);
  };

  const closeConfirmation = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    closeConfirmation();

    setLoading(true);

    const formData = new FormData();
    formData.set("serviceId", service.serviceId);

    const res = await deleteService(
      {
        status: ServerActionStatus.NotInitialized,
        message: "",
        formState: { serviceId: service.serviceId },
      },
      formData
    );

    setLoading(false);

    if (res.status === "error") {
      setError(res.message);
    }

    if (res.status === "success") {
      onSuccess?.();
    }
  };

  return (
    <>
      <Button
        color="error"
        onClick={openConfirmation}
        loading={loading}
        disabled={disabled}
      >
        Delete
      </Button>

      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>Delete Service '{service.serviceName}'?</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmation}>Cancel</Button>
          <Button variant="contained" onClick={handleAction}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loading}>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress size={24} /> Deleting Service...
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(error)} maxWidth="sm" fullWidth>
        <DialogTitle>Error</DialogTitle>
        <DialogContent sx={{ color: "red" }}>{error}</DialogContent>
        <DialogActions>
          <Button onClick={() => setError("")}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteServiceButton;
