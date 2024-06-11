import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import ProductCartItem from './cartItems';

const ShopProduct = ({ shopName, products, selectedProducts, setSelectedProducts }) => {
    const [checked, setChecked] = React.useState(products.map(() => false));
    const [shopProducts, setShopProducts] = React.useState([])

    const handleParentChange = (event) => {
        const newChecked = products.map(() => event.target.checked);
        setChecked(newChecked);
        if (event.target.checked) {
            setSelectedProducts(prev => [...products]);
        } else {
            setSelectedProducts(prev => prev.filter(p => !products.includes(p)));
        }
    };

    const handleChildChange = (index, product) => (event) => {
        const newChecked = [...checked];
        newChecked[index] = event.target.checked;
        setChecked(newChecked);

        if (event.target.checked) {
            setSelectedProducts(prev => [...prev, product]);
        } else {
            setSelectedProducts(prev => prev.filter(p => p !== product));
        }
    };

    const allChecked = checked.every(Boolean);
    const someChecked = checked.some(Boolean);

    
    React.useEffect(()=>{
        const newProducts = products.filter((elem)=> elem.quantity > 0 )
        setShopProducts(newProducts)
    },[products])

    return (
        <>
        {shopProducts.length > 0 &&  <div className='d-flex flex-column' >
            <FormControlLabel
                label={
                    <Typography variant="h6">
                        {shopName}
                    </Typography>
                }
                control={
                    <Checkbox
                        checked={allChecked}
                        indeterminate={!allChecked && someChecked}
                        onChange={handleParentChange}
                    />
                }
                className='shop_control'
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {shopProducts.map((product, index) => {
                    if(product.quantity > 0 ) {
                        return (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked[index]}
                                            onChange={handleChildChange(index, product)}
                                        />
                                    }
                                />
                                <ProductCartItem
                                    key={index}
                                    src={product.imagePrimary}
                                    alt={product.name}
                                    name={product.name}
                                    size={"XL"}
                                    price={product.price}
                                    stock={999}
                                    discount={product.discount}
                                    shopName={shopName}
                                    isBought={false}
                                    quantity={product.quantity}
                                    cartItemId={product.cartItemId}
                                />
                            </Box>
                        )
                    }
                })}
            </Box>
        </div>}
        </>
    );
};

export default ShopProduct;
