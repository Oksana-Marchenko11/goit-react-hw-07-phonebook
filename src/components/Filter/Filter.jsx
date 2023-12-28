import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export function Filter() {
  const dispatch = useDispatch();
  const onFilter = e => dispatch(setFilter(e.currentTarget.value));
  return (
    <div className={css.filter}>
      <label className={css.filt_lable}>
        Find contacts by name
        <input
          className={css.filt_inp}
          type="text"
          // value={value}
          onChange={onFilter}
        />
      </label>
    </div>
  );
}
