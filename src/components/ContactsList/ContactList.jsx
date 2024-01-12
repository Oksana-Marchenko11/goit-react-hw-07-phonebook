import React from 'react';
import css from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts, deleteContacts } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const contacts = useSelector(getContacts);
  console.log(contacts);
  const filter = useSelector(getFilter);
  const filteredContacts = contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(filter.filter.toLowerCase())
  );

  return (
    <div>
      <h3 className={css.contacts_text}>Contacts</h3>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Phone</td>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(({ id, name, phone }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{phone}</td>
              <td>
                <button
                  className={css.delete_btn}
                  value={id}
                  onClick={() => dispatch(deleteContacts(id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
