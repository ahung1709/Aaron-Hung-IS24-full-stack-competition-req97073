import { useState } from "react";

import "./SearchProductsByDeveloperNameForm.css";

export default function SearchProductsByDeveloperNameForm({ handleFindProductsByDeveloperName, getAllProducts}) {

    let developerSearch = {"developerName": ""}
    const [formData, setFormData] = useState(developerSearch);

    // Handle change of input fields (other than developers, methodology, and start date) in the form
    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(newFormData);
    }

    // Handle form submittion
    function handleSubmit(evt) {
        evt.preventDefault();
        handleFindProductsByDeveloperName(formData)
    }

    // Handle form reset
    function handleReset(evt) {
        evt.preventDefault();
        const newFormData = { ...formData, "developerName": "" };
        setFormData(newFormData);
        getAllProducts();
    }

  return (
    <>
        <div className="form-container">
            <form className="NewEditProductForm" onSubmit={handleSubmit} onReset={handleReset}>
                <table className="form-table">
                    <tbody>
                        <tr className="form-table-row">
                            <th className="form-table-field-title">
                                <label>Search by Developer Name: </label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="developerName"
                                    name="developerName"
                                    value={formData.developerName}
                                    onChange={handleChange}
                                />
                                <button type="submit">SEARCH</button>
                                <button type="reset" value="Reset">RESET</button>
                            </td>
                        </tr>                
                    </tbody>
                </table>
            </form>
        </div>
    </>
  );
}
