import React from 'react';
import {
    NavbarContainer,
    NavMenu,
    NavItem,
    NavLinks,
} from './CategoryElements';

const Categories = () => {
    return (
        <>
            <NavbarContainer>
                <NavMenu>
                    <h5>Categories</h5>
                    <NavItem>
                        <NavLinks to="adults">
                            Adults</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="kids">
                            Kids</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="pets">
                            Pets</NavLinks>
                    </NavItem>
                </NavMenu>
            </NavbarContainer>
        </>
    )
}

export default Categories;