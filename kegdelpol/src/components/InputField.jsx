import './InputField.css';

const InputField = ({ label, id, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="form-label">{label}</label>
      <input 
        type={type} 
        id={id} 
        placeholder={placeholder} 
        className="form-control input-field" 
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;