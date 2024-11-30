import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]); 
  const [newItem, setNewItem] = useState({ title: "", status: "Not completed" });
  const url = "https://jsonplaceholder.typicode.com/todos";
  console.log(url);
  

  // Fetch Data
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const modifyData = data.map((result) => ({
          ...result,status: result.completed ? "Not completed" : "completed",
        }));
        setData(modifyData.slice(0,10));
      })
      .catch((err) => {
        alert(`Error fetching data: ${err.message}`);
        console.error("Error fetching data:", err);
      });
  }, []);

  // Delete button
  const handleDelete = (id) => {
    setData((data) => data.filter((result) => result.id !== id));
    alert("User deleted successfully");
  };

  // Update button
  const handleUpdate = (id) => {
    setData((data) =>
      data.map((result) =>
        result.id === id
          ? { ...result, status: result.status === "completed" ? "Not completed" : "completed" }: result
        )
      );
      alert("User updated successfully");
  };
  // Add button
  const handleAdd = () => {
    const newId = data.length ? data[data.length - 1].id + 1 : 1; 
    const newEntry = { id: newId, ...newItem }; 
    setData([...data, newEntry]); 
    setNewItem({ title: "", status: "Not completed" }); 
    alert("New item added successfully");
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">TO-DO-LIST</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((result) => (
              <tr key={result.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{result.id}</td>
                <td className="border border-gray-300 px-4 py-2">{result.title}</td>
                <td className="border border-gray-300 px-4 py-2">{result.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleUpdate(result.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded mr-2"
                  >Update</button>
                  <button
                    onClick={() => handleDelete(result.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-1 rounded"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-5 mb-6">
          <label className="mr-2 font-bold text-green-400">ADD NEW ITEM:</label>
          <input type="text" placeholder="title" value={newItem.title} 
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, title: e.target.value }))
            } 
            className="border border-gray-300 px-4 py-2 rounded mr-4">
          </input>
          <label className="mr-4">Status:
              <select value={newItem.status}
                onChange={(e) =>
                   setNewItem((prev) => ({ ...prev, status: e.target.value }))
                }
                className="ml-2 border border-gray-300 px-2 py-1 rounded">
                <option value="active">Not completed</option>
              </select>
          </label>
          <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">Submit</button>
        </div>
    </>
  );
}

export default App;
