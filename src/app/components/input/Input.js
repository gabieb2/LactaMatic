

const Input = ({ placeholder, value, onChange, type }) => {
  return <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border border-gray-300 rounded-md"
  />;
};

export default Input;