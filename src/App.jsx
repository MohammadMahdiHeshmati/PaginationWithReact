import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([])
  const [paginatedTodos, setPaginatedTodos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  let pageSize = 10;
  let pageNumber;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));

    let endIndex = currentPage * pageSize;
    let startIndex = endIndex - pageSize;
    let allShownTodos = todos.slice(startIndex, endIndex);
    setPaginatedTodos(allShownTodos);
  }, []);

  return (
    <div className="p-2">
      <table className="w-full border border-gray-300">
        <thead className="text-left bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Completed</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {paginatedTodos.map((todo) => (
            <tr className="hover:bg-blue-100 transition-all cursor-pointer">
              <td className="border border-gray-300 p-2">{todo.id}</td>
              <td className="border border-gray-300 p-2">{todo.title}</td>
              <td className={`border border-gray-300 p-2 ${todo.completed ? "text-green-600" : "text-red-600"}`}>{todo.completed ? "Completed" : "Pending"}</td>
              <td className="border border-gray-300 p-2">
                <button>OK</button>
                <button>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}