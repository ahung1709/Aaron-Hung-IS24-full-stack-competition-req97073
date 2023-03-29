import NewEditProductForm from "../../components/NewEditProductForm/NewEditProductForm"

export default function EditProductPage( {handleEditProduct, products} ) {
    return (
        <main className="EditProductPage">
            <h1>Edit Product</h1>
            <NewEditProductForm handleEditProduct={handleEditProduct} newOrEdit="edit" products={products}/>
        </main>
    )
}