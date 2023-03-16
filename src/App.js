import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [values, setValues] = useState({
    message: '',
    chktest: '',
  });
  const [chkBox, setChkBox] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
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
      console.log('values of check click' + chkBox);
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
    <form onSubmit={submitdata}>
      <h1>Hello StackBlitz!</h1>
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
          onChange={(e) => setChkBox(e.target.checked)}
          value={chkBox}
          name="chktest"
        ></input>
      </p>
      <p>
        <input type="submit" />
      </p>
    </form>
  );
}
