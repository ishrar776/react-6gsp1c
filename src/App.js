import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [valueslist, setValueslist] = useState([]);
  const addlistItem = (e) => {
    const value1 = e.target.value;
    setValueslist([...valueslist, value1]);
  };
  const addNamelist = (e) => {
    e.preventDefault();
    //const value1 = e.target.value;
    //setValueslist([...valueslist, value1]);
    console.log('add to list itemfirst' + Object.values(valueslist));
  };
  const handleClick = (e) => {
    e.preventDefault();
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
      },
    ]);
    setInput('');
  };
  const [chkBox, setChkBox] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [values, setValues] = useState({
    message: '',
    chktest: chkBox,
  });
  const handleChanges = (e) => {
    setChkBox(e.target.checked);
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const submitdata = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isSubmit) {
      console.log('israr hey');
      console.log('values of check click' + chkBox);
      console.log('values of check click innner' + values.chktest);
      const allData = { ...values };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
      };
      console.log(requestOptions.body);
      fetch('https://reqres.in/api/posts', requestOptions)
        .then((response) => {
          console.log('post sucess' + response);
          response.json();
        })
        //.then((data) => setValues(data.message))
        .catch((error) => {
          console.log('failed result' + error);
        });
    }
  };
  return (
    <form>
      <h1>NAB (national Bank of Austulia)</h1>
      <p>
        {/* <input type="text" onChange={addlistItem} name="listadd"></input> */}
        <input
          type="text"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        ></input>

        <input type="submit" onClick={handleClick} />
      </p>
      <p>
        <input
          type="text"
          onChange={handleChanges}
          value={values.message}
          name="message"
        ></input>
      </p>
      <p>
        <input
          type="checkbox"
          onChange={handleChanges}
          value={values.chktest}
          name="chktest"
        ></input>
      </p>
      {/* <p>
        <ul>
          {valueslist.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </p> */}
      <ul>
        {todoList.map((todo) => {
          return <div id={todo.id}>{todo.task}</div>;
        })}
      </ul>
      ;
      <p>
        <input type="submit" onClick={submitdata} />
      </p>
    </form>
  );
}
