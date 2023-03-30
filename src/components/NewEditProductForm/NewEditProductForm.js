import { Link } from 'react-router-dom';
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./NewEditProductForm.css";

export default function NewEditProductForm({ handleAddProduct, handleEditProduct, newOrEdit, products }) {

    let { productId } = useParams();
    const navigate = useNavigate()

    let productEdit = { productId: "", productName: "", productOwnerName: "", Developers: ["", "", "", "", ""], scrumMasterName: "", startDate: "", methodology: "" }

    if (productId) {
        const productFound = products.find((product) => product.productId === productId); 
        productEdit = { 
            productId: productId, 
            productName: productFound.productName, 
            productOwnerName: productFound.productOwnerName, 
            Developers: productFound.Developers, 
            scrumMasterName: productFound.scrumMasterName,
            startDate: productFound.startDate,
            methodology: productFound.methodology,
        }
    } 

    const [formData, setFormData] = useState(productEdit);


    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(newFormData);
    }

    function handleChangeDevelopers(evt) {
        const newDevelopers = formData.Developers
        newDevelopers[evt.target.name.slice(-1)] = evt.target.value
        const newFormData = { ...formData, Developers: newDevelopers };
        setFormData(newFormData);
    }

    function handleSelect(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(newFormData);
    }

    function handleSelectDate(evt) {
        const formattedDate = evt.target.value.split("-").join("/")
        const newFormData = { ...formData, [evt.target.name]: formattedDate };
        setFormData(newFormData);
    }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (newOrEdit === "new") {
      handleAddProduct(formData);
      setFormData({ productId: "", productName: "", productOwnerName: "", Developers: [], scrumMasterName: "", startDate: "", methodology: "" });
      navigate('/')
    } else if ((newOrEdit === "edit")) {
      handleEditProduct(formData);
      navigate('/')
    }
  }

  return (
    <>
        <div className="form-container">
            <form className="NewEditProductForm" onSubmit={handleSubmit}>
                <table className="form-table">
                    <tbody>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                { newOrEdit === "new" ? "" : <label>Product Number</label>}
                            </th>
                            <td className="form-table-field-input">
                                { 
                                    newOrEdit === "new" ? 
                                    <span>New Product</span> 
                                    : 
                                    <span>{formData.productId}</span>
                                }
                            </td>
                        </tr>

                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Product Name</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="productName"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Product Owner</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="productOwnerName"
                                    name="productOwnerName"
                                    value={formData.productOwnerName}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>

                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Developer Names</label>
                            </th>
                            <td className="form-table-field-input">
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Developer Name 1 *</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="Developers0"
                                    name="Developers0"
                                    value={formData.Developers[0]}
                                    onChange={handleChangeDevelopers}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Developer Name 2 *</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="Developers1"
                                    name="Developers1"
                                    value={formData.Developers[1]}
                                    onChange={handleChangeDevelopers}
                                />
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Developer Name 3 *</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="Developers2"
                                    name="Developers2"
                                    value={formData.Developers[2]}
                                    onChange={handleChangeDevelopers}
                                />
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Developer Name 4 *</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="Developers3"
                                    name="Developers3"
                                    value={formData.Developers[3]}
                                    onChange={handleChangeDevelopers}
                                />
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Developer Name 5 *</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="Developers4"
                                    name="Developers4"
                                    value={formData.Developers[4]}
                                    onChange={handleChangeDevelopers}
                                />
                            </td>
                        </tr>
                        
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Scrum Master</label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="scrumMasterName"
                                    name="scrumMasterName"
                                    value={formData.scrumMasterName}
                                    onChange={handleChange}
                                    required
                                />    
                            </td>
                        </tr>
                        
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Start Date</label>
                            </th>
                            <td className="form-table-field-date">
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate.split("/").join("-")}
                                    onChange={handleSelectDate}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Methodology</label>
                            </th>
                            <td className="form-table-field-select">
                                <select
                                    id="methodology"
                                    name="methodology"
                                    onChange={handleSelect}
                                    value={formData.methodology}
                                    required
                                >
                                    <option className="choose-title" value="" >
                                        -- Choose a methodology --
                                    </option>
                                    <option value="Agile" >
                                        Agile
                                    </option>
                                    <option value="Waterfall" >
                                        Waterfall
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title"></th>
                            <td className="form-table-button-link">
                                    <button type="submit">SAVE</button>
                                    <Link className="cancel-link" to="/">CANCEL</Link>
                            </td>
                        </tr>
                        <tr className="form-table-row">
                            <th className="form-table-field-title"></th>
                            <td className="form-table-notes">
                                * Up to 5 developer names can be entered.  <br />At least 1 developer (Developer Name 1) needs to be entered.
                            </td>
                        </tr>
                    </tbody>
                </table>

            </form>
        </div>
    </>
  );
}
