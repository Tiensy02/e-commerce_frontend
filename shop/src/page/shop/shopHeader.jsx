import ShopInfoBanner from "./shopInfoBanner";

export default function ShopHeader({shopEntity}) {
    return <div>
    <ShopInfoBanner user={shopEntity.user} imageBackground={shopEntity.image}></ShopInfoBanner>
    </div>
}