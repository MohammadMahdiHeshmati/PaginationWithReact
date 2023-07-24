import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([])
  const [paginatedTodos, setPaginatedTodos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  let pageSize = 10;
  let pageNumbers;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        let endIndex = currentPage * pageSize;
        let startIndex = endIndex - pageSize;
        let allShownTodos = data.slice(startIndex, endIndex);
        setPaginatedTodos(allShownTodos);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let endIndex = currentPage * pageSize;
    let startIndex = endIndex - pageSize;
    let allShownTodos = todos.slice(startIndex, endIndex);
    setPaginatedTodos(allShownTodos);
  }, [currentPage])
  
  let pagesCount = Math.ceil(todos.length / pageSize)
  pageNumbers = Array.from(Array(pagesCount).keys())

  const changePaginate = (newPage) => {
    setCurrentPage(newPage)
  }

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
            <tr key={todo.id} className="hover:bg-blue-100 transition-all cursor-pointer">
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
      <div className="flex justify-center items-start">
        <ul className="rounded-xl overflow-hidden m-4 flex justify-center items-center flex-wrap border border-gray-300">
          {pageNumbers.map((pageNumber) => (
            <li
              className={`p-3 rounded-sm cursor-pointer hover:bg-blue-100 ${pageNumber + 1 === currentPage ? "active-Paginate" : ""}`}
              onClick={() => changePaginate(pageNumber + 1)}
              key={pageNumber + 1}>
              <span>{pageNumber + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}