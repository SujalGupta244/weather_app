const Alert = ({ message }) => {
    return (
      <div className="bg-red-500 text-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold">Alert!</h2>
        <p>{message}</p>
      </div>
    );
};

export default Alert;
  