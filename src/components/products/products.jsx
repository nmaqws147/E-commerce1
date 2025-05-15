import EmptyHeart from "./photos/like (1).png";
import FilledHeart from "./photos/Heart.png";

export default function Products(props) {
  return (
    <main>
      <div className="products-container">
        {props.showOverlay ? <div>{props.overlay()}</div> : null}
        {props.products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={(e) => {
              e.stopPropagation();
              props.handleClick(product);
            }}
            style={{ position: "relative" }}
          >
            <img
              className="products-img"
              src={product.image}
              alt={product.title}
            />
            <div className="product-content">
            <h3 className="product-category">{product.category}</h3>

            <p
              className="products-price"
            >
              Price: ${product.price}
            </p>
            </div>
            <p
              className="product-count"
            >
              Count: {product.rating.count}
            </p>

            <img
              src={
                props.addToTheBestIcon[product.id] ? FilledHeart : EmptyHeart
              }
              alt="heart"
              className="heart-icon"
              onClick={(e) => {
                e.stopPropagation();
                props.handleTheBestIcon(product.id);
                props.handleTheBestComponent(product.id, product);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "22px",
                height: "22px",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
