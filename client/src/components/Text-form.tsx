import '../Styles/Text-form.style.css';

type TextFormProps = {
  setPartyDetails: React.Dispatch<
    React.SetStateAction<{
      name: string;
      age: number;
      date: Date;
      time: string;
      address: string;
    }>
  >;
};

type entry = {
  name: string;
  age: number;
  date: Date;
  time: string;
  address: string;
};

const TextForm: React.FC<TextFormProps> = ({ setPartyDetails }) => {
  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: string };
      date: { value: string };
      time: { value: string };
      address: { value: string };
    };
    const entry: entry = {
      name: target.name.value,
      age: +target.age.value,
      date: new Date(target.date.value),
      time: target.time.value,
      address: target.address.value,
    };
    entry.name = entry.name.toUpperCase();

    setPartyDetails(entry);
  }

  return (
    <div className="text-menu">
      <form id="details-form" onSubmit={onSubmitHandler}>
        <label>Your Name</label>
        <input type="text" name="name" placeholder="your name" />
        <label>You are turning</label>
        <input type="number" name="age" placeholder="age" />
        <label>When?</label>
        <input type="date" name="date" />
        <label>Time?</label>
        <input type="time" name="time" />
        <label>Where? </label>
        <input type="text" name="address" placeholder="address" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default TextForm;
