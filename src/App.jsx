import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [book, setBook] = useState([]);
  console.log(book);
  
  const fetchBooks = async () => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}}`);
    setBook(response.data.items);

  };
  useEffect(() => {
    fetchBooks();
  }, [text]);

  return (
    <>
      <div className="App">
        <h1>Find a Book</h1>
        <input type="text" onChange={(e) => setText(e.target.value)} />
      </div>
      <ul>
        {book.map((n) => (
          <li value={n.id}>
            {n.volumeInfo.title}
          </li>
        )
          
        )}
      </ul>
    </>
  );
}

export default App;