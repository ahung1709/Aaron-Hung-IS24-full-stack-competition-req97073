import { Link } from 'react-router-dom';
import "./ProductRow.css";

export default function ProductRow({ product, handleDeleteProduct }) {

    // Generate a list of developers
    const developersEls = product.Developers.map(function(d, index) {
        return <div key={index} className="developer-container">{d}</div>
    })

    const editLink = "/product/" + product.productId

    return (
        <tr className="ProductRow">
            <td>{product.productId}</td>
            <td>{product.productName}</td>
            <td>{product.productOwnerName}</td>
            <td>{developersEls}</td>
            <td>{product.scrumMasterName}</td>
            <td>{product.startDate}</td>
            <td>{product.methodology}</td>
            <td>
                <Link className="new-product-link" to={editLink} >Edit</Link>
            </td>
            <td>
                <Link 
                    className="new-product-link" 
                    onClick={() => handleDeleteProduct(product.productId)}
                >
                    Delete
                </Link>
            </td>
        </tr>
    );
  }
  