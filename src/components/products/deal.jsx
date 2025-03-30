
export default function Deal(props){
    const filterDeal = props.products.filter(deal => {
        return deal.id === 15;
    });
    return(
        <>
        <div className="deal-card">
            <h3 className="deal-heading">Deal of the day</h3>
            {filterDeal.map(deal => {
                return(
                    <div className="deal-item" key={15}>
                        <img src={deal.image} alt={deal.title} className="deal-image"/>
                        <div className="deal-content">
                        <h3 className="deal-category">{deal.category}</h3>
                        <p className="deal-title">{deal.title}</p>
                        <p className="deal-price">{`Price: $${deal.price}`}<span>$90</span></p>
                        <button className="cart-deal-btn" onClick={() => props.handleAddToCartClick(deal.id,deal)}>ADD TO CART</button>
                        </div>
                        
                    </div>
                );
            })}
        </div>
        </>
    );
}