import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./redux/hooks.tsx";
import "./App.css";
import { ListTodos } from "./components/ListTodos.tsx";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Alert, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import TodoModal from "./components/UpsertModal.tsx";
import AddIcon from "@mui/icons-material/Add";
import { useHttp } from "./lib/api.ts";

function App() {
  const dispatch = useAppDispatch();
  const fetchSuccess = useAppSelector((state) => state.todo.http?.fetchTodos?.success);
  const fetchError = useAppSelector((state) => state.todo.http?.fetchTodos?.error);
  const todos = useAppSelector((state) => state.todo.data);

  const [open, setOpen] = useState(false);
  const handleModalControl = () => setOpen(!open);

  const { createRequest } = useHttp();

  useEffect(() => {
    const config = { url: "todos", method: "get" };
    createRequest(config, "fetchTodos");
  }, [dispatch]);

  return (
    <>
      <Container fixed>
        <Box>
          <h1>Welcome to TodoX</h1>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3>{Array.isArray(todos) && todos.length ? `You have ${todos.length} todos!` : "You don't have any todos!"}</h3>
            <Button onClick={handleModalControl} variant="contained" endIcon={<AddIcon />}>
              Add Todo
            </Button>
          </Box>
          <Divider />

          {!fetchSuccess && fetchError && (
            <Alert sx={{ marginTop: "30px" }} severity="error">
              Failed to load todos! ERROR: {fetchError}
            </Alert>
          )}

          <ListTodos />
        </Box>

        <TodoModal status={open} control={handleModalControl} />
      </Container>
    </>
  );
}

export default App;
