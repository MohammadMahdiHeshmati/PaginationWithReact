import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([])
  const [paginatedTodos, setPaginatedTodos] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [removeTodo, setRemoveTodo] = useState(false)

  let pageSize = 10;
  let pageNumbers;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        updatePaginate(data)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    updatePaginate(todos)
  }, [currentPage, removeTodo])

  const updatePaginate = (datas) => {
    let endIndex = currentPage * pageSize;
    let startIndex = endIndex - pageSize;
    let allShownTodos = datas.slice(startIndex, endIndex);
    setPaginatedTodos(allShownTodos);
  }

  let pagesCount = Math.ceil(todos.length / pageSize)
  pageNumbers = Array.from(Array(pagesCount).keys())

  const changePaginate = (newPage) => {
    setCurrentPage(newPage)
  }

  const toggleHandler = (id) => {
    let newTodos = [...todos]
    let todoIndex = newTodos.findIndex((todo) => todo.id === id)
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed
    setTodos(newTodos)
  }

  const removeHandler = (id) => {
    let newTodos = [...todos]
    let todoIndex = newTodos.findIndex((todo) => todo.id === id)
    newTodos.splice(todoIndex, 1)
    setTodos(newTodos)
    setRemoveTodo(!removeTodo)
  }

  return (
    <div className="p-2">
      <table className="w-full  border-gray-300">
        <caption className="text-left text-2xl font-bold pb-3 pt-1 text-red-600">Todos</caption>
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
              <td className="border border-gray-300 p-2 text-center">
                <button className="md:mr-3" onClick={() => { toggleHandler(todo.id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-green-600 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button className="md:ml-3" onClick={() => { removeHandler(todo.id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-red-600 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      <div className="flex justify-center items-start">
        <ul className="rounded-xl overflow-hidden m-4 flex justify-center items-center flex-wrap border border-gray-300">
          {pageNumbers.map((pageNumber) => (
            <li
              className={`px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-100 ${pageNumber + 1 === currentPage ? "active-Paginate" : ""}`}
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