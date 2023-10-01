import React, { useState, useEffect } from "react";
import ListComponent from "./components/ListComponent";
import "animate.css";
import uuid4 from "uuid4";
import { RiMenu2Line, RiAddLine } from "react-icons/ri";

const App = () => {
  const [displayInput, setdisplayInput] = useState("none");
  const [buttonTxt, setbuttonTxt] = useState("Create Task");
  const [text, settext] = useState("");
  const [editBut, seteditBut] = useState("");
  const [array, setarray] = useState([]);

  const Changetxt = (event) => {
    settext(event.target.value);
    setbuttonTxt(`Add ${editBut} List`);
  };

  const AddTxt = () => {
    if (text === "") {
      alert("Add the List");
    } else {
      setarray([...array, { id: uuid4(), listName: text, status: "false" }]);
      setdisplayInput("none");
      settext("");
      setbuttonTxt("Create List");
      seteditBut("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      AddTxt();
    }
  };

  const DeleteList = (index) => {
    const deletedArray = array.filter((elem) => index != elem.id);
    setTimeout(() => {
      setarray(deletedArray);
    }, 500);
  };

  const TskCompleted = (index) => {
    const take = array.map((elem) => {
      if (elem.id === index) {
        return { ...elem, status: elem.status === "false" ? "true" : "false" };
      } else {
        return elem;
      }
    });
    setarray(take);
  };

  const EditTxt = (index) => {
    DeleteList(index);
    seteditBut("Edit");
    array.forEach((elem) => {
      if (elem.id === index) {
        let x = elem.listName;
        settext(x);
        setdisplayInput("flex");
        setbuttonTxt("Edit List");
      }
    });
  };

  const ListComponentMap = array
    .slice()
    .reverse()
    .map((elem) => (
      <ListComponent
        key={elem.id}
        listValue={elem.listName}
        deleteList={() => DeleteList(elem.id)}
        status={() => TskCompleted(elem.id)}
        statusRes={elem.status}
        editList={() => EditTxt(elem.id)}
      />
    ));

  // Local Storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("items"));
    if (storedData && storedData.length > 0) {
      setarray(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(array));
  }, [array]);

  return (
    <>
      <section className="todolistSec">
        <div className="header">
          <i>
            <RiMenu2Line />
          </i>
          <h1>Website todo App</h1>
        </div>
        <div className="listDiv">{ListComponentMap}</div>
        <button
          className="addBtn"
          onClick={() => {
            displayInput === "none" ? setdisplayInput("flex") : AddTxt();
          }}
        >
          <RiAddLine /> {buttonTxt}
        </button>
        <div className="inputListDiv" style={{ display: displayInput }}>
          <input
            type="text"
            onChange={Changetxt}
            placeholder="Buying a Tea"
            value={text}
            onKeyDown={handleKeyPress}
          />
        </div>
      </section>
    </>
  );
};

export default App;
