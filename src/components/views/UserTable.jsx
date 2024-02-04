// UserTable.js

import React, { useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Row from "./Row";
import Add from "./Add";
const UserTable = () => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [entry, setEntry] = useState([]);
  const handleAddClick = () => {
    // Set showUpdatePopup to true when edit button is clicked
    setShowUpdatePopup(true);
  };
  const handlePopupClose = () => {
    // Close the update popup and reset the editing entry
    setShowUpdatePopup(false);
    setEditingEntry(null);
  };

  const handleEdit = (id) => {
    // // Find the entry with the given id
    // const selected = entry.find((e) => e.id === id);
    // if (selected) {
    //   setSelectedEntry(selected);
    //   setShowUpdatePopup(true);
    // }
    // Set the entry to be edited in the state
    setEditingEntry(entry);
    // Open the update popup
    setShowUpdatePopup(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // Implement your update logic here
    // ...
    // Close the update popup
    setShowUpdatePopup(false);
  };

  useEffect(() => {
    const q = query(collection(db, "entries"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let EArr = [];
      querySnapshot.forEach((doc) => {
        EArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(EArr);
      setEntry(EArr);
    });

    return () => unsubscribe();
  }, []);
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "entries", id));
  };

  console.log("The Entries are ", JSON.stringify(entry));

  return (
    <div className="flex flex-col items-center">
      <table className="table-auto mt-8">
        <caption className="text-2xl mb-4">Users</caption>
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Added Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entry.map((adm) => (
            <Row key={adm.id} entry={adm} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>

      <Add />
    </div>
  );
};

export default UserTable;
