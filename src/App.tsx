import { TaskList } from "./components/TaskList";
import Container from "react-bootstrap/Container";
import { DarkTheme } from "./types/enums";

function App() {
  return (
    <Container
      className='pt-5'
      style={{ ...DarkTheme, minWidth: "100%", minHeight: "100vh" }}
    >
      <TaskList />
    </Container>
  );
}

export default App;
