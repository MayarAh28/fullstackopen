import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameExist = persons.some((person) => person.name === newName);

    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersons = [
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ];
    setPersons(newPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
