import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function removeOneCharacter(index) {
    const userToDelete = characters[index];

    fetch(`http://localhost:8000/users/${userToDelete._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not 2xx, throw an error
          if (response.status === 404) {
            throw new Error("User not found. No delete performed.");
          }
          throw new Error("Network response was not ok.");
        } // If the delete was successful, update the state
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to insert user: " + response.statusText);
        }
      })
      .then((newPerson) => setCharacters([...characters, newPerson]))
      .catch((error) => {
        console.log(error);
      });
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
