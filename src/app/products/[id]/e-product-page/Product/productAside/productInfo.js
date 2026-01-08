export default function ProductInfo({objOpt}){
    return(
        <div className="product-info">
            <h1 className="product-title w-full"> 
                {objOpt.title||objOpt.name}
            </h1>
            <h2 className="product-price">
                ${objOpt.price}
            </h2>
            <div className="product-desc">
                {objOpt.desc||objOpt.description}
            </div>
        </div>
    )
}