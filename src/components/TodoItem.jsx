import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex-1">
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex items-center">
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
          className="mr-2 cursor-pointer"
        />
        <button
          onClick={() => deleteHandler(id)}
          className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
