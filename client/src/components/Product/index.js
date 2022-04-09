import React from 'react';
import { 
    ProductContainer,
    ProductH1,
    ProductWrapper,
    ProductCard,
    ProductIcon,
    ProductH2,
    ProductP } from './ProductElements'

const Products = () => {
  return (
    <ProductContainer id='products'>
    <ProductH1></ProductH1>
    <ProductWrapper>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>S'more Maker</ProductH2>
            <ProductP>This is a great thing when you want a s`more but don`t want to start a fire!</ProductP>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Mini Desk Vacuum</ProductH2>
            <ProductP>No excuses to have your workspace dirty.</ProductP>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Egg Counter</ProductH2>
            <ProductP>Have your smartphone notify you when you are running low on eggs or when your eggs are going bad!</ProductP>
        </ProductCard>
    </ProductWrapper>
</ProductContainer>
  )
}

export default Products