import { Link } from 'react-router-dom';
import ProductsTable from '../../components/ProductsTable/ProductsTable'
import SearchProductsByScrumMasterNameForm from '../../components/SearchProductsByScrumMasterNameForm/SearchProductsByScrumMasterNameForm'
import SearchProductsByDeveloperNameForm from '../../components/SearchProductsByDeveloperNameForm/SearchProductsByDeveloperNameForm'

import './AllProductsPage.css';

export default function AllProductsPage({products, handleFindProductsByScrumMasterName, handleFindProductsByDeveloperName, getAllProducts}) {
    return (
        <main className="AllProductPage">
            <div className="product-list-container">
                <h1>List of Products</h1>
                <div className="new-product-link-container">
                    <button className="new-product-link-button">
                        <Link className="new-product-link" to="/product/new">New Product</Link>
                    </button>
                </div>
                <div className="search-container">
                    <SearchProductsByScrumMasterNameForm handleFindProductsByScrumMasterName={handleFindProductsByScrumMasterName} getAllProducts={getAllProducts}/>
                </div>
                <div className="search-container">
                    <SearchProductsByDeveloperNameForm handleFindProductsByDeveloperName={handleFindProductsByDeveloperName} getAllProducts={getAllProducts}/>
                </div>
                <div className="total-container">
                    <span>Total number of products: {products.length}</span>
                </div>
                <div className="table-container">
                    <ProductsTable products={products} />
                </div>
            </div>
        </main>
    )
}