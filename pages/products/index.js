import {Fragment} from "react";
import ProductList from "../../components/tables/product-list";
import axios from "axios";

const ProductsCard = (props) => {

    const {products} = props;

    return (
        <Fragment>
            <div style={{
                minHeight: '100vh',
                margin: 0,
                padding: 0
            }}>
                <ProductList products={products}/>
            </div>
        </Fragment>
    )

}

export async function getStaticProps() {
    const allProducts = await axios.get("http://localhost:8080/products")

    return {
        props: {
            products: allProducts.data
        }
    }
}

export default ProductsCard;