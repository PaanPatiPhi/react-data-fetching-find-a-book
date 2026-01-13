import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  async function getData() {
    let response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q="${search}"`
    );
    console.log(response.data.items);
    setBooks(response.data.items);
    console.log(search)
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedSearch(search);
    },500);
    return ()=> clearTimeout(timer);
  },[search])
  useEffect(() => {
    if (debouncedSearch === "") {
      return;
    }
    getData(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="App">
      <h2>Book List</h2>
      <input
        type="text"
        placeholder="ค้นหาหนังสือ ..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <hr />
      <ul>
        {Array.isArray(books) &&
        books.map((item) => (
          <li key={item.id}>{item.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
