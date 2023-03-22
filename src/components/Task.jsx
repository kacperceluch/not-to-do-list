import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Task(props){

    const [editingText, setEditingText] = useState();

    const deleteTask = () => {
        props.onDelete(props.id);
    }

    const isTaskChecked = () => {
        props.onCheck(props.id);
    }

    const editTask = () => {
        props.onEdit(props.id);
        setEditingText(props.name)
    }
    
    const addEditingTask = () => {
        props.submitEditTask(props.id, editingText);
    }

    const completed = props.isChecked === true ? "task completed" : "task";
    const editing = props.isEditing === true ? "edit-task" : "";
    
    return(
        <div className={`list-group-item ${completed} ${editing}`}>
            <div className="task-name">
                {props.isEditing === true ?
                <div className="details">
                    <input className="edit-task-input" type="text" onChange={(event) => setEditingText(event.target.value)} value={editingText}/>
                </div>
                :
                <div className="details">
                    {props.isChecked === true ? <CheckCircleIcon className="icon" onClick={isTaskChecked} /> : <RadioButtonUncheckedIcon className="icon" onClick={isTaskChecked} />}
                    <p>{props.name}</p>   
                </div> 
                }
            </div>

            <div className="actions">
                {props.isEditing === true ? 
                <AddIcon className="add-edit-button" fontSize="large" onClick={addEditingTask}/>
                :
                <div className="actions">
                    {props.isDisabled === true ?
                    <div className="action-icons"> 
                        <DeleteIcon  />
                        <EditIcon />
                    </div>
                    :
                    <div className="action-icons">
                        <DeleteIcon className="icon" onClick={deleteTask} />
                        <EditIcon className="icon" onClick={editTask} />
                    </div>}
                </div>
                }
            </div>
        </div>
    );
}

export default Task;