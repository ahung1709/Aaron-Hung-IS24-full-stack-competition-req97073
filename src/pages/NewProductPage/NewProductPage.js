import NewEditProductForm from "../../components/NewEditProductForm/NewEditProductForm"
// import NewEditAttractionForm from "../../components/NewEditAttractionForm/NewEditAttractionForm"

export default function NewProductPage( {handleAddProduct} ) {
    return (
        <main className="NewProductPage">
            <h1>Create New Product</h1>
            <NewEditProductForm handleAddProduct={handleAddProduct} newOrEdit="new" />
        </main>
    )
}