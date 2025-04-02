
export default function Side(props){
    const allowedIds = [3, 7, 14, 17];
    const filteredProducts = props.products.filter(product => 
        allowedIds.includes(product.id)
    );
    return(
        <>
        <div className="side-card">
            <h2 className="best-sellers-heading">BEST SELLERS</h2>
            <div >{filteredProducts.map(filteredProduct => 
            <div className="filteredProduct-card" key={filteredProduct.id} onClick={() => props.handleClick(filteredProduct)}>
                <img src={filteredProduct.image} alt={filteredProduct.title} className="filtered-img"/>
                <h2 className="filtered-cate">{filteredProduct.category}</h2>
                <p className="filtered-price">{`Price: $${filteredProduct.price}`}</p>
                <p className="filtered-count">{`Count: ${filteredProduct.rating.count}`}</p>
            </div>
            )}
            </div>
        </div>
        </>
    );
}