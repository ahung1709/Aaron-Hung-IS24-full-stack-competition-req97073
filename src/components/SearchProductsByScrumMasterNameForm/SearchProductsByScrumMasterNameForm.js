import { useState } from "react";

import "./SearchProductsByScrumMasterNameForm.css";

export default function SearchProductsByScrumMasterNameForm({ handleFindProductsByScrumMasterName, getAllProducts}) {

    let scrumMasterSearch = {"scrumMasterName": ""}
    const [formData, setFormData] = useState(scrumMasterSearch);

    // Handle change of input fields (other than developers, methodology, and start date) in the form
    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(newFormData);
    }

    // Handle form submittion
    function handleSubmit(evt) {
        evt.preventDefault();
        handleFindProductsByScrumMasterName(formData)
    }

    // Handle form reset
    function handleReset(evt) {
        evt.preventDefault();
        const newFormData = { ...formData, "scrumMasterName": "" };
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
                                <label>Search by Scrum Master Name: </label>
                            </th>
                            <td className="form-table-field-input">
                                <input
                                    className="field-input"
                                    id="scrumMasterName"
                                    name="scrumMasterName"
                                    value={formData.scrumMasterName}
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
