import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  const handleSubmit = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already exists`);
      return;
    }
    setContacts(prevState => [{ id: nanoid(), name, number }, ...prevState]);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // useEffect(() => {
  //   const LS = JSON.parse(localStorage.getItem('contacts'));
  //   if (LS) {
  //     setContacts(LS);
  //   }
  // }, []);

  const handleFilter = e => {
    setFilter(e.target.value.trim().toLocaleLowerCase());
  };

  const deleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      {contacts.length > 0 ? (
        <>
          <h2>Contacts</h2>
          <div>
            <Filter onChange={handleFilter} />
            <ContactList
              contacts={filterContact}
              deleteContact={deleteContact}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
