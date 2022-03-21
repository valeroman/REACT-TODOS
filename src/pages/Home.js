import React, { useContext, useEffect, useState } from 'react';
import { collection, addDoc, getFirestore, onSnapshot, serverTimestamp, orderBy, query } from "firebase/firestore";
import FirebaseContext from '../context/firebase';
import { Card } from '../components/Card';
import { Header } from '../components/Header';



export const Home = () => {

  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore(firebase);

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
      const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'))
      onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
      // console.log('snapshot', snapshot.docs.map(doc => doc.data().todo))
    });

  },[]);

  const handleAdd  = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp()
    });
    
    setInput('');
  }

  return (
    <div>

      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <Header />
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
              <div className="mb-4">
                  <h1 className="text-grey-darkest">Todo List</h1>
                  <form>
                      <div className="flex mt-4">
                          <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" 
                            placeholder="Add Todo"
                            value={input}
                            onChange={({ target }) => setInput(target.value)}
                          />
                          <button 
                            className={`bg-blue-medium text-white font-bold flex-no-shrink p-2 border-2 rounded  hover:text-white hover:bg-teal
                            ${!input && 'opacity-50'}`}
                            // class="bg-blue-medium text-white font-bold flex-no-shrink p-2 border-2 rounded  hover:text-white hover:bg-teal"
                            type='submit'
                            onClick={handleAdd}
                            disabled={!input}
                          >
                            Add
                          </button>
                      </div>
                  </form>
              </div>
          </div> 
      </div>
      <div>
        { 
          todos !== null && todos !== '' && (
            todos.map((todo) => (
              <Card todo={todo} />
            ))
          )
        }
       
      </div>
    </div>
    
  )
}
