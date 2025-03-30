

export default function Cart(props) {
  
  
        return (
          <>
            <div className="cart-container">
            {props.showCheckOut?<div>{props.checkOut()}</div>:null}
              {Object.values(props.addCartComponent).map((cart) => (
                <div key={cart.id} className="cart-card" onClick={e => {
                  e.stopPropagation();
                  props.handleCheckOut(cart);
                }
                  }>
                  <img src={cart.image} alt={cart.title} className="cart-img" />
                  <p className="cart-category">{cart.category}</p>
                  <p className="cart-price">{`Price: $${cart.price}`}</p>
                  <p className="cart-count">{`Count: ${cart.rating.count}`}</p>
                  <button className="remove-btn" onClick={e => {
                    e.stopPropagation();
                    props.handleRemoveFromCart(cart.id,cart);
                  }}>Remove</button>
                </div>
              ))}
            </div>
          </>
        );
      }