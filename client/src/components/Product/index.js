import React from 'react';
import Icon1 from '../../images/Icon1.png';
import Icon2 from '../../images/Icon2.png';
import Icon3 from '../../images/Icon3.png';
import Icon4 from '../../images/Icon4.png';
import Icon5 from '../../images/Icon5.png';
import Icon6 from '../../images/Icon6.png';
import Icon7 from '../../images/Icon7.png';
import Icon8 from '../../images/Icon8.png';
import Icon9 from '../../images/Icon9.png';
import Icon10 from '../../images/Icon10.png';
import { 
    ProductContainer,
    ProductH1,
    ProductWrapper,
    ProductCard,
    ProductIcon,
    ProductH2,
    ProductLinks } from './ProductElements'

const Products = () => {
    // onclick button here
    return (
        <ProductContainer id='products'>
    <ProductH1></ProductH1>
    <ProductWrapper>
        {/* add the onclick to productLinks component */}
        {/* {array.map((product)=>(
              <ProductCard>
              <ProductIcon src={Icon1}/>
              <ProductH2>{product.productName}</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
          </ProductCard> 
        ))} */}
        <ProductCard>
            <ProductIcon src={Icon1}/>
            <ProductH2>S'more Maker</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon2}/>
            <ProductH2>Mini Desk Vacuum</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon3}/>
            <ProductH2>Egg Counter</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon4}/>
            <ProductH2>Mini Donut Factory</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon5}/>
            <ProductH2>Monogrammed Barbecue Branding Iron</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon6}/>
            <ProductH2>Musical Toilet Roll Device</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon7}/>
            <ProductH2>Wi-Fi Scent Dispenser</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon8}/>
            <ProductH2>Musical Cake Server</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon9}/>
            <ProductH2>Soft Pretzel Makes With Cheese Dip Warmer</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
        <ProductCard>
            <ProductIcon src={Icon10}/>
            <ProductH2>Smartphone Controlled Kitty Water Fountain</ProductH2>
            <ProductLinks>View Product Details</ProductLinks>
        </ProductCard>
    </ProductWrapper>
</ProductContainer>
  )
}

export default Products