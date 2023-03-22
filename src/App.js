import Task from "./components/Task";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";


function App() {

  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialState);
  const [disable, setDisable] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterTasks, setFilterTasks] = useState([]);

  useEffect(() => {
    addFilter();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, filterStatus]);

  const addFilter = () => {
    switch(filterStatus) {
      case "Uncompleted":
        setFilterTasks(tasks.filter(task => task.completed === false));
        break;
      case "Completed":
        setFilterTasks(tasks.filter(task => task.completed === true));
        break;
      default:
        setFilterTasks(tasks);
        break;
    };
  };

  const addTask = (text) => {
  setTasks(prev => [...prev, {text: text, completed: false, editing: false, disabled: false, id: nanoid()}]);
}

  const deleteTask = (id) => {
  setTasks(prev => {
    return prev.filter(element => {
      return element.id !== id;
    });
  });
};

  const checkTasks = (id) => {
  setTasks(tasks.map(element => {
    if (element.id === id) {
      return {
        ...element, completed: !element.completed
      }
    };
    return element;
  }));
  };

  const editTask = (id) => {
    setTasks(tasks.map(element => {
      if (element.id === id) {
        return {
          ...element, editing: !element.editing
        }
      };
      return {
        ...element, disabled: true
      };
    }));
    setDisable(true);
    };

    const addEditingTask = (id, editingText) => {
      setTasks(tasks.map(element => {
        if (element.id === id) {
          return {
            ...element, text: editingText, editing: !element.editing,
          }
        };
        return {
          ...element, disabled: false
        };
      }));
      setDisable(false);
    };
    
    const filterHandler = (status) => {
      setFilterStatus(status);  
    };

  return (
    <div className="App">
      <div className="card">
        <h1>NOT-TO-DO</h1>
        <div className="title">
          <div className="line"></div>
          <h2>list</h2>
          <div className="line"></div>
        </div>
       
        <Form disable={disable} onAdd={addTask} onFilter={filterHandler}/>
    
        {filterTasks.map((task, index) =>
          <Task name={task.text}
          id={task.id}
          key={index}
          isChecked={task.completed}
          isEditing={task.editing}
          isDisabled={task.disabled}
          onDelete={deleteTask}
          onCheck={checkTasks}
          onEdit={editTask}
          submitEditTask={addEditingTask}
          />)}
      </div>  
    </div>
  );
}

export default App;
