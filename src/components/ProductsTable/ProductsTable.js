import ProductRow from '../ProductRow/ProductRow'
import "./ProductsTable.css";

export default function ProductsTable({ products }) {

    const productsEls = products.map(function(p) {
        return <ProductRow key={p.productId} product={p} />
    })

    return (
        <table className="ProductsTable">
            <thead>
                <tr>
                    <th>Product Number</th>
                    <th>Product Name</th>
                    <th>Product Owner</th>
                    <th>Developer Names</th>
                    <th>Scrum Master</th>
                    <th>Start Date</th>
                    <th>Methodology</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { productsEls }
            </tbody>
        </table>
    );
  }
  