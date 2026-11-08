import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  let filteredPersons = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search))
    : persons;

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearch(searchTerm);
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name} ?`))
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch(() => {
          alert("this person already deleted");
          setPersons(persons.filter((person) => person.id !== id));
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToChange = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (personToChange) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .changeNumber(personToChange.id, newPerson)
          .then((newPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === personToChange.id ? newPerson : person
              )
            );
          })
          .then(() => {
            setNotification(`Added ${newName}`);
            setTimeout(() => {
              setNotification("");
            }, 5000);
          })
          .catch(() => {
            setError(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setError("");
            }, 5000);
          });
      }
      return;
    }
    personService
      .create(newPerson)
      .then((person) => {
        setPersons([...persons, person]);
      })
      .then(() => {
        setNotification(`Added ${newName}`);
        setTimeout(() => {
          setNotification("");
        }, 5000);
      });

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={error} />
      <Notification notification={notification} />
      <Filter value={search} onSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onChangeName={handleNameChange}
        number={newNumber}
        onChangeNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
