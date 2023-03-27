import { useState, useEffect } from "react";
import { getAllProducts, prepopulateProducts} from '../../utilities/products-service';

import './App.css';

function App() {
  console.log("Inside App")

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {     
      console.log("prepopulateProducts(): ");
      prepopulateProducts().then(res => {
        setProducts(res)
      })
    }
    fetchData()
  }, [])

  console.log("products: ");
  console.log(products)

  return (
    <div className="App">
      <header className="App-header">
        <h1>List of Products</h1>
      </header>
    </div>
  );
}

export default App;
