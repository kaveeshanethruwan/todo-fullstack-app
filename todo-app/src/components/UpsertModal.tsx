import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LinearProgress, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { Todo } from "../types/todo";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useHttp } from "../lib/api";

interface ModalProps {
  status: boolean;
  control: () => void;
  currentItem?: Todo | null;
}

export default function UpsertModal({ status, control, currentItem = null }: ModalProps) {
  const [todoName, setTodoName] = useState<string>("");
  const [todoStatus, setTodoStatus] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const createLoading = useAppSelector((state) => state.todo.http?.createTodo?.loading);
  const updateLoading = useAppSelector((state) => state.todo.http?.updateTodo?.loading);
  const { createRequest } = useHttp();

  const onTodoNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const onStatusChange = (event: SelectChangeEvent) => {
    if (event.target.value === "completed") {
      setTodoStatus(true);
      return;
    }
    setTodoStatus(false);
  };

  const onCancel = () => {
    setTodoName("");
    control();
  };

  const onSave = async () => {
    setSubmitError("");
    // update
    if (todoName && currentItem) {
      const config = { url: `todos/${currentItem.id}`, method: "patch", data: { task: todoName, completed: todoStatus } };
      const res = await createRequest(config, "updateTodo");
      if (res?.success) {
        control();
        const config = { url: "todos", method: "get" };
        createRequest(config, "fetchTodos");
        return;
      }
      setSubmitError(res?.error as string);
      return;
    }

    // create
    if (todoName) {
      if (!todoName.trim()) {
        setSubmitError("Todo title required!");
        return;
      }
      const config = { url: "todos", method: "post", data: { task: todoName.trim(), completed: false } };
      const res = await createRequest(config, "createTodo");
      if (res?.success) {
        control();
        const config = { url: "todos", method: "get" };
        createRequest(config, "fetchTodos");
        return;
      }
      setSubmitError(res?.error as string);
    }
  };

  useEffect(() => {
    setTodoName("");
    setTodoStatus(false);
    setSubmitError("");
    if (currentItem) {
      setTodoName(currentItem.task);
      setTodoStatus(currentItem.completed);
    }
  }, [status, currentItem]);

  return (
    <>
      <Dialog open={status} sx={{ "& .MuiDialog-paper": { width: "500px" } }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle sx={{ color: "#7CB9E8" }} id="alert-dialog-title">
          {currentItem ? `Update task: ${currentItem.task}` : "Add todo"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {!currentItem && <TextField id="todoName" value={todoName} onChange={onTodoNameChange} sx={{ mt: 3, mb: 3 }} label="Enter todo name" variant="outlined" />}
            {currentItem && (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={todoStatus === true ? "completed" : "not-completed"}
                label="Status"
                onChange={onStatusChange}
                sx={{ width: "fit-content", mt: 3 }}>
                <MenuItem value={"completed"}>Completed</MenuItem>
                <MenuItem value={"not-completed"}>Not completed</MenuItem>
              </Select>
            )}
          </Box>

          {createLoading || updateLoading ? <LinearProgress sx={{ mt: 2, mb: 2 }} /> : null}
          {submitError && <p style={{ color: "#8c0002" }}>{submitError}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>NO</Button>
          <Button onClick={onSave} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
