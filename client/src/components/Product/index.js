import React from 'react';
import { 
    ProductContainer,
    ProductH1,
    ProductWrapper,
    ProductCard,
    ProductIcon,
    ProductH2,
    ProductLinks } from './ProductElements'

const Products = () => {
  return (
    <ProductContainer id='products'>
    <ProductH1></ProductH1>
    <ProductWrapper>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>S'more Maker</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Mini Desk Vacuum</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Egg Counter</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Mini Donut Factory</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Monogrammed Barbecue Branding Iron</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Musical Toilet Roll Device</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Wi-Fi Scent Dispenser</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Musical Cake Server</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Soft Pretzel Makes With Cheese Dip Warmer</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={""}/>
            <ProductH2>Smartphone Controlled Kitty Water Fountain</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
    </ProductWrapper>
</ProductContainer>
  )
}

export default Products