import {Fragment} from "react";
import AddProductForm from "../../components/form/add-product-form";

const ProductsCard = () => {

    return (
        <Fragment>
            <div style={{
                minHeight: '100vh'
            }}>
                <AddProductForm/>
            </div>
        </Fragment>
    )

}

export default ProductsCard;