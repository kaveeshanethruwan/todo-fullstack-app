import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Todo } from "../types/todo";
import { useAppSelector } from "../redux/hooks";
import { useHttp } from "../lib/api";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

interface DialogProps {
  status: boolean;
  control: () => void;
  currentItem?: Todo | null;
}

export default function DeleteModal({ status, control, currentItem }: DialogProps) {
  const [submitError, setSubmitError] = useState<string>("");
  const { createRequest } = useHttp();
  const deleteLoading = useAppSelector((state) => state.todo.http?.deleteTodo?.loading);

  const onDelete = async () => {
    setSubmitError("");
    const config = { method: "delete", url: `todos/${currentItem?.id}` };
    const res = await createRequest(config, "deleteTodo");
    if (res?.success) {
      control();
      const config = { url: "todos", method: "get" };
      createRequest(config, "fetchTodos");
      return;
    }
    setSubmitError(res?.error as string);
  };

  useEffect(() => {
    setSubmitError("");
  }, [status, currentItem]);

  return (
    <>
      <Dialog open={status} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle sx={{ color: "#8c0002" }} id="alert-dialog-title">{`Delete task: ${currentItem?.task}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure do you want to delete this task? </DialogContentText>
          {deleteLoading ? <LinearProgress sx={{ mt: 2, mb: 2 }} /> : null}
          {submitError && <p style={{ color: "#8c0002" }}>{submitError}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={control}>NO</Button>
          <Button onClick={onDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
