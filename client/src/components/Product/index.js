import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import {
    ProductContainer,
    ProductH1,
    ProductWrapper,
    ProductCard,
    ProductIcon,
    ProductH2,
    ProductLinks
} from './ProductElements'

const Products = () => {
    const [state, dispatch] = useStoreContext();
    console.log(state)
    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_PRODUCTS);
console.log(data)
    useEffect(() => {
        console.log(data)
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products,
                });
            });
        }
    }, [data, loading]);

    function filterProducts() {
        if (!currentCategory) {
            return state.products;
        }

        return state.products.filter(
            (product) => product.category._id === currentCategory
        );
    }

    function viewDetails() {
        console.log('viewDetails', this);
    }
    return (
        <ProductContainer id='products'>
            <ProductH1>Products in stock:</ProductH1>
            <ProductWrapper>
                {state.products.length ? (
                    filterProducts().map((product) => (
                            <ProductCard>
                                <ProductIcon src={product.image} />
                                <ProductH2>{product.productName}</ProductH2>
                                <ProductLinks value={product._id} onClick={viewDetails}>View Product Details</ProductLinks>
                            </ProductCard>
                        ))
                ) : (
                    <h3>You haven't added any products yet!</h3>
                )}
            </ProductWrapper>
        </ProductContainer>
    )
}

export default Products