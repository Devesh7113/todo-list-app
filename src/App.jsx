// uuid npm package = to create new unique ids
// react-icons.github.io for react icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString)
    {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }

  }, [])
  
  const toggleFinished = (e) =>
  {
    setshowFinished(!showFinished);
  }

  const saveToLS = () =>
  {
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompeleted: false }]);
    setTodo("");
    saveToLS();
  };
  
  const handleEdit = (e, reqId) => 
  {
    let reqTodo = todos.filter(item =>
      {
        return item.id === reqId;
      })
      
      setTodo(reqTodo[0].todo);
      
      let newTodos = todos.filter(item =>
        {
          return item.id !== reqId;
        })
        
        setTodos(newTodos);
        saveToLS();
      }
      
  const handleDelete = (e, id) => 
  {
    let newTodos = todos.filter(item =>
    {
      return item.id !== id;
    })

    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => 
  {
    setTodo(e.target.value);
  }

  const handleCheckBox = (e) => 
  {
    let idReq = e.target.name;
    let index = todos.findIndex(item =>
      {
        return item.id == idReq;
      });

    // let newTodos = todos; 
    // above one is not completely correct because the reference is same so re-rendering was not happening
    let newTodos = [...todos];
    newTodos[index].isCompeleted = !todos[index].isCompeleted;
    setTodos(newTodos); 
    saveToLS();
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold mb-2">Add a Todo</h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="w-full rounded-lg px-3 py-1"
          />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 disabled:bg-purple-700 hover:bg-purple-950 p-2 py-1 text-sm rounded-md text-white">
            Save
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished
        <h2 className="text-lg font-bold my-2">Your Todos</h2>
        {todos.length === 0 && <div className="my-2">No Todos to display</div>}
        <div className="todos">
          {todos.map((item) => {
            return ( (showFinished || !item.isCompeleted) &&
              <div className="todo flex w-full justify-between mt-2" key={item.id}>
              <div  className="flex gap-3">
                <input name={item.id} type="checkbox" onChange={handleCheckBox} checked={item.isCompeleted}/>
                <div className={item.isCompeleted? "line-through":""}>{item.todo}</div>
              </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e,item.id)} className="bg-violet-800 hover:bg-purple-950 p-2 py-1 text-sm rounded-md mx-1 text-white">
                  <FaEdit />
                  </button>
                  <button onClick={(e) => handleDelete(e,item.id)} className="bg-violet-800 hover:bg-purple-950 p-2 py-1 text-sm rounded-md mx-1 text-white">
                  <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
