import classes from './product-list.module.css';

import {FaHeart} from 'react-icons/fa';

import Img1 from '../../public/images/products/spinach.jpg'
import {useEffect, useState} from "react";
import Image from "next/image";

const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080";

const ProductList = (props) => {

    const [productsList, setProductsList] = useState(props.products);
    const [productToPresent, setProductToPresent] = useState([]);

    // const products = [
    //     {
    //         name: "Spinach",
    //         calories: 15,
    //         carbs: 5,
    //         fat: 0,
    //         protein: 2,
    //         image: Img1
    //     },
    //     {
    //         name: "Bread",
    //         calories: 120,
    //         carbs: 74,
    //         fat: 0.5,
    //         protein: 4.5,
    //         image: Img2
    //     },
    //     {
    //         name: "Brown rice",
    //         calories: 75,
    //         carbs: 40,
    //         fat: 0.6,
    //         protein: 4,
    //         image: Img3
    //     },
    //     {
    //         name: "White rice",
    //         calories: 82,
    //         carbs: 32,
    //         fat: 1.5,
    //         protein: 8,
    //         image: Img4
    //     },
    // ]

    const createImage = (product) => {
        const productImage = product.image;

        const imageBlob = _dataURItoBlob(productImage.data, productImage.type);

        return new File([imageBlob], productImage.name, {type: productImage.type});
    }

    const _dataURItoBlob = (picBytes, imageType) => {
        const byteString = window.atob(picBytes);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }

        return new Blob([int8Array], {type: imageType});
    }

    useEffect(() => {

        const newProductsToPresent = [];

        productsList.map(product => {
            newProductsToPresent.push({
                id: product.id,
                name: product.name,
                description: product.description,
                calories: product.calories,
                carbs: product.carbs,
                fat: product.fat,
                protein: product.protein,
                water: product.water,
                vitamins: product.vitaminList,
                image: createImage(product)
            })
        })

        setProductToPresent(newProductsToPresent);

    }, [productsList])

    return (
        <div className={classes.container}>
            <ul className={classes.content}>
                <li className={classes.header}>
                    <div>Image</div>
                    <div>Title</div>
                    <div>Calories</div>
                    <div>Carbs</div>
                    <div>Fat</div>
                    <div>Protein</div>
                    <div>
                        <select>
                            <option>Fiber</option>
                            <option>Sodium</option>
                            <option>Potassium</option>
                            <option>Cholesterol</option>
                        </select>
                    </div>
                    <div>Favourite</div>
                </li>

                {productToPresent.map(product =>

                <li className={classes.item} key={product.name}>
                    <div>
                        <Image className={classes.image} src={URL.createObjectURL(product.image)} alt='/' width={40} height={40} />
                    </div>
                    <div>{product.name}</div>
                    <div>{product.calories}</div>
                    <div>{product.carbs}</div>
                    <div>{product.fat}</div>
                    <div>{product.protein}</div>
                    <div>
                        20
                    </div>
                    <div><FaHeart/></div>
                </li>
                )}
            </ul>

        </div>
    )
}

export default ProductList;