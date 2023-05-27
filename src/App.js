import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
      },
    ]);
    setInput('');
  };
  //const [chkBox, setChkBox] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [values, setValues] = useState({
    id: 8,
    name: '',
    year: 2023,
    color: '#C74375',
    pantone_value: '19-1669',
  });
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const submitdata = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isSubmit) {
      console.log('israr hey');
      const allData = { ...values };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
      };
      console.log(requestOptions.body);
      fetch('https://reqres.in/api/posts', requestOptions)
        .then((response) => {
          console.log('post sucess' + { ...response });
          response.json();
        })
        //.then((data) => setValues(data[0].name))
        .catch((error) => {
          console.log('failed result' + error);
        });
    }
  };
  return (
    <form>
      <h1>NAB (National Bank of Austulia)</h1>
      <p>
        <input
          type="text"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        ></input>
        <button onClick={handleClick}>Add Item</button>
      </p>
      <p>
        <input
          type="text"
          onChange={handleChanges}
          value={values.name}
          name="name"
        ></input>
      </p>
      <ul>
        {todoList.map((todo) => (
          <li id={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <p>
        <input type="submit" onClick={submitdata} />
      </p>
    </form>
  );
}
