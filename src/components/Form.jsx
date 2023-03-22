import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

function Form(props){

    const [text, setText] = useState("");

    const handleClick = () => {
        props.onAdd(text);
        setText("");
    }
    
    const handleFilter = (event) => {
        const value = event.target.value;
        props.onFilter(value)
    }

    return(
        <div className="add-form">
        {props.disable === true ?
          <div className="add-input">
            <input type="text" placeholder="Add New" value={""}></input>
            <AddIcon className="add-button" fontSize='large' />
          </div>
          :
          <div className="add-input">
            <input type="text" placeholder="Add New" onChange={(event) => setText(event.target.value)} value={text}></input>
            <AddIcon className="add-button" fontSize='large' onClick={handleClick} />
          </div>
          }

          <div>
            <select className="state-select" onChange={handleFilter}>
              <option value="All">All</option>
              <option value="Uncompleted">Uncompleted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
    );
}

export default Form;