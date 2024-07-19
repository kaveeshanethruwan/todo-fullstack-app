import { ChangeEvent, useEffect, useState } from "react";
import { Box, Chip, CircularProgress, TextField } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import UpsertModal from "./UpsertModal";
import { Todo } from "../types/todo";
import DeleteModal from "./DeleteModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useHttp } from "../lib/api";

export const ListTodos = () => {
  const todos = useAppSelector((state) => state.todo.data);
  const fetchLoading = useAppSelector((state) => state.todo.http?.fetchTodos?.loading);
  const fetchSuccess = useAppSelector((state) => state.todo.http?.fetchTodos?.success);

  const [open, setOpen] = useState(false);
  const handleModalControl = () => setOpen(!open);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteDialog = () => setDeleteDialogOpen(!deleteDialogOpen);
  const [currentItem, setCurrentItem] = useState<Todo | null>(null);
  const [search, setSearch] = useState("");
  const { createRequest } = useHttp();

  const onUpdate = (item: Todo) => {
    setCurrentItem(item);
    handleModalControl();
  };

  const onDelete = (item: Todo) => {
    setCurrentItem(item);
    handleDeleteDialog();
  };

  const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const config = { url: "todos", method: "get", params: { search: e.target.value } };
    await createRequest(config, "searchTodo");
  };

  useEffect(() => {
    setSearch("");
  }, [fetchSuccess]);

  if (fetchLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <TextField value={search} onChange={onSearch} sx={{ width: "50%", marginTop: "25px", marginBottom: "25px" }} id="outlined-basic" label="Search..." variant="outlined" />

      <Box>
        {fetchSuccess &&
          todos?.map((item, i) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                justifyContent: "space-between",
                pt: 3,
                pb: 3,
                borderBottomColor: "#ebedef",
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
              }}
              key={item.task + i}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ minWidth: "100px" }}>{item.id}</Box>
                <Box sx={{ minWidth: "350px" }}>{item.task}</Box>
                {item.completed ? <Chip label="done" color="success" variant="outlined" /> : <Chip label="not-done" color="primary" variant="outlined" />}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: { xs: "15px", md: "0px" }, backgroundColor: "transparent" }}>
                <Box onClick={() => onUpdate(item)} sx={{ marginRight: "25px", cursor: "pointer" }}>
                  <EditIcon sx={{ color: "#7CB9E8" }} />
                </Box>
                <Box onClick={() => onDelete(item)} sx={{ cursor: "pointer" }}>
                  <DeleteSweepIcon sx={{ color: "#8c0002" }} />
                </Box>
              </Box>
            </Box>
          ))}
      </Box>

      <UpsertModal status={open} control={handleModalControl} currentItem={currentItem} />
      <DeleteModal status={deleteDialogOpen} control={handleDeleteDialog} currentItem={currentItem} />
    </>
  );
};
