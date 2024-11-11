import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa"; // Import a trash icon

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4a90e2, #a1c4fd);
`;

const InputContainer = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  margin-top: 20px;
  max-width: 400px;
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: ${(props) => (props.completed ? "#d3f9d8" : "#fff")};
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
    background-color: ${(props) => (props.completed ? "#b9e8b5" : "#f1f1f1")};
  }
`;

const Checkbox = styled.input`
  margin-right: 15px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const TodoText = styled.span`
  font-size: 16px;
  color: #333;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  opacity: ${(props) => (props.completed ? 0.6 : 1)};
`;

const DeleteIcon = styled(FaTrashAlt)`
  color: #ff4d4d;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.2s;

  &:hover {
    color: #ff1a1a;
  }
`;

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();
    if (todoInput.trim() !== "") {
      setTodos([...todos, { text: todoInput, completed: false }]);
      setTodoInput("");
    }
  };

  const toggleComplete = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <PageWrapper>
      <InputContainer>
        <Form onSubmit={addTodo}>
          <Form.Group className="mb-3 text-center mt-3">
            <Form.Label className="my-3 py-2 fw-bold fs-2">
              To-Do List 📝
            </Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                className="rounded-5"
                type="text"
                placeholder="Add your task"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
              />
              <Button
                className="px-4 m-2 rounded-5"
                variant="primary"
                type="submit"
              >
                Add
              </Button>
            </div>
          </Form.Group>
          <Wrapper>
            {todos.map((todo, index) => (
              <TodoItem key={index} completed={todo.completed}>
                <Checkbox
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                />
                <TodoText completed={todo.completed}>{todo.text}</TodoText>
                <DeleteIcon onClick={() => deleteTodo(index)} />
              </TodoItem>
            ))}
          </Wrapper>
        </Form>
      </InputContainer>
    </PageWrapper>
  );
}

export default App;
