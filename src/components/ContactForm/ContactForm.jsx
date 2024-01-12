import React from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  console.log(contacts);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchContacts();
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const nameInContacts = contacts.items.some(
      ({ name }) =>
        name.toLowerCase() === form.elements.name.value.toLowerCase()
    );
    if (nameInContacts) {
      alert(`${form.elements.name.value} is already in contacts`);
      return;
    }
    const numberInContacts = contacts.items.some(
      ({ phone }) =>
        phone.toLowerCase() === form.elements.number.value.toLowerCase()
    );
    if (numberInContacts) {
      alert(`${form.elements.number.value} is already in contacts`);
      return;
    }
    dispatch(
      addContacts({
        name: form.elements.name.value,
        phone: form.elements.number.value,
      })
    );
    form.reset();
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor="name">
        Name
      </label>
      <input
        id="name"
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.label} htmlFor="number">
        Number
      </label>
      <input
        id="number"
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.button} type="submit" onSubmit={handleSubmit}>
        Add contacts
      </button>
    </form>
  );
};
