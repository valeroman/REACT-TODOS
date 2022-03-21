import React, { useContext } from 'react';
import { collection, addDoc, getFirestore, deleteDoc, doc } from "firebase/firestore";
import FirebaseContext from '../context/firebase';
import { async } from '@firebase/util';

export const Card = ({todo}) => {

    const { firebase } = useContext(FirebaseContext);
    const db = getFirestore(firebase);

    const handleDelete = async (event) => {
        event.preventDefault();

        const taskDocRef = doc(db, 'todos', todo.id);

        try{
            await deleteDoc(taskDocRef)
        } catch (err) {
            alert(err)
        }
    }

    return (

        <div className="h-100 w-full backgound flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white  rounded-2xl  shadow p-4 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div className="container space-x-96 flex-row">

                    <div className="p-4">
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{todo.todo}</p>
                    </div>
                    <button 
                        className="bg-blue-medium text-white font-bold  p-2 border-2 rounded  hover:text-white hover:bg-teal"
                        type='submit'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div> 
        </div>



    )
}
