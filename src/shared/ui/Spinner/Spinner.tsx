import s from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={s.parent}>
      <span className={s.loader}></span>
    </div>
  );
};

export default Spinner;
