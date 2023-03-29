import { Link } from 'react-router-dom';
import "./ProductRow.css";

export default function ProductRow({ product }) {

    const developersEls = product.Developers.map(function(d) {
        return <p>{d}</p>
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
        </tr>
    );
  }
  