import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  let productName = [];
  //productName = ['israr', 'khan', 'awnish'];
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    setProductList(productName);
  }, []);
  const [chkBox, setChkBox] = useState(false);
  const [values, setValues] = useState({
    message: '',
    chktest: chkBox,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChangesl = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleChanges = (e) => {
    setChkBox(e.target.checked);
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const addNamelist = (e) => {
    console.log('add to list item');
    const name = e.target.name;
    const value = e.target.value;
    setProductList({ ...productName, [name]: value });
  };
  const submitdata = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (isSubmit) {
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
    <form onSubmit={submitdata}>
      <h1>Hello StackBlitz!</h1>
      <p>
        <input
          type="text"
          onChange={handleChangesl}
          value={values.message}
          name="list"
        ></input>
        <button onClick={addNamelist}>addList</button>
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
      <p>
        <ul>
          {productList.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </p>
      <p>
        <input type="submit" />
      </p>
    </form>
  );
}
