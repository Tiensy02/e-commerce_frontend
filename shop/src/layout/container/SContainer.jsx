import { useEffect, useState } from "react"
import { LoadingComponent } from "../../components/Loadding.jsx"
import SCart from "../../components/SCart/SCart.jsx"
import { useFetchProductsQuery, useFetchShopProductsQuery } from "../../redux/product/apiSlice.jsx"
import './index.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js"
const containerWitdh = 1280
/**
 * 
 * @param {Object} param0  : {userId, categoryId, name, images, description, tags, subTitle, price, discount,ratting,customField};
 */
export default function SContainer({ setProducts, userId, isShop }) {

    const history = useHistory()

    const [pageNumber, setSageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(50);

    const { data: productPageable, isFetching, isLoading, isError } = useFetchProductsQuery({ pageNumber, pageSize }, { skip: isShop })
    const { data: shopProducts, isLoading: shopProductLoading, isError: shopProductError, isSuccess: successShopProduct } = useFetchShopProductsQuery({ ownId: userId }, { skip: !isShop })

    const handleClickCart = (product) => {
        history.push(`/product/${product.id}`)
    }

    useEffect(() => {
        if (shopProducts && isShop && setProducts)
            setProducts(shopProducts)
    }, [successShopProduct])
    return (
        <>
            {!isShop && <>
                {!isLoading && !isError && <div className="container" style={{ maxWidth: { containerWitdh } }}>
                    {productPageable.data.map((elem, index) => {
                        return (
                            <div key={index} onClick={() => handleClickCart(elem)}>
                                <SCart
                                    discount={elem.discount} name={elem.name}
                                    image={elem.imagePrimary} price={elem.price - Math.round((elem.price * elem.discount) / 100)}
                                    subTitle={elem.subTitle}
                                    sold={elem.sold}
                                >
                                </SCart>
                            </div>
                        )
                    })}
                </div>}
                {isLoading && <LoadingComponent></LoadingComponent>}
                {isError && <> loi oi</>}
            </>}
            {isShop && <>

                {!shopProductLoading && !shopProductError && <div className="container" style={{ maxWidth: { containerWitdh } }}>
                    {shopProducts.map((elem, index) => {
                        return (
                            <div key={index} onClick={() => handleClickCart(elem)}>
                                <SCart
                                    discount={elem.discount} name={elem.name}
                                    image={elem.imagePrimary} price={elem.price - Math.round((elem.price * elem.discount) / 100)}
                                    subTitle={elem.subTitle}
                                    sold={elem.sold}
                                >
                                </SCart>
                            </div>
                        )
                    })}
                </div>}
                {shopProductLoading && <LoadingComponent></LoadingComponent>}
                {shopProductError && <> loi oi</>}
            </>}
        </>

    )
}