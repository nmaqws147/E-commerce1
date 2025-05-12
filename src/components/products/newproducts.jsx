export default function NewProducts(props) {
    const newproductId = [4, 5, 13, 15];
    const filterNewProducts = props.products.filter(newProduct =>
      newproductId.includes(newProduct.id)
    );
  
    return (
      <div className="newProducts-wrapper">
        <h2 className="newProducts-heading">NEW PRODUCTS</h2>
        {filterNewProducts.map(newProduct => (
          <div
            key={newProduct.id}
            onClick={() => props.handleClick(newProduct)}
            className="newProducts-card"
          >
            <img
              className="newProducts-img"
              src={newProduct.image}
              alt={newProduct.title}
            />
            <h2 className="newProducts-category">{newProduct.category}</h2>
            <p className="newProducts-price">{`Price: $${newProduct.price}`}</p>
            <p className="newProducts-count">{`Count: ${newProduct.rating.count}`}</p>
          </div>
        ))}
      </div>
    );
  }
  