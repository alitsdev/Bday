

const TextForm = ({setPartyDetails}) => {

    function onSubmitHandler(e) {
        e.preventDefault();

        const entry = {
          name: e.target.name.value,
          age: e.target.age.value,
          date: e.target.date.value,
          time: e.target.time.value,
          address: e.target.address.value
        };
        entry.name = entry.name.toUpperCase()

        setPartyDetails(entry);
      }

return (
    <div className="text-menu"><form id = 'details-form' onSubmit={onSubmitHandler}>
    <label>Your Name</label>
    <input type='text' name='name' placeholder='your name' />
    <label>You are turning</label>
    <input type='number' name='age' placeholder='age' />
    <label>When?</label>
    <input type='date' name='date' />
    <label>Time?</label>
    <input type='time' name='time' />
    <label>Where? </label>
    <input type='text' name='address' placeholder='address' />
    <button type='submit'>Save</button>
  </form></div>

)
};
 export default TextForm;