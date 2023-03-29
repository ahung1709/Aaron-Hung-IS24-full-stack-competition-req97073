import { Link } from 'react-router-dom';
import ProductsTable from '../../components/ProductsTable/ProductsTable'

import './AllProductsPage.css';

export default function AllProductsPage({products}) {
    console.log("AllProductsPage/products:")
    console.log(products)

    return (        
        <main className="AllProductPage">
            <div className="product-list-container">
                <h1>List of Products</h1>
                <div className="new-product-link-container">
                    <button className="new-product-link-button">
                        <Link className="new-product-link" to="/product/new">New Product</Link>
                    </button>
                </div>
                <div className="total-container">
                    <span>Total number of all products at IMB: {products.length}</span>
                </div>
                <div className="table-container">
                    <ProductsTable products={products} />
                </div>
            </div>
        </main>
    )
}