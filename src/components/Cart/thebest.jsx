
export default function Thebest(props) {
    return (
      <>
        {Object.values(props.addToTheBestIcon).some(Boolean) && (
          <div className="thebest-container">
            {props.showOverlay ? <div>{props.overlay()}</div> : null}
            {Object.values(props.addTheBestComponent).map(thebest => (
              <div key={thebest.id} className="product-card" onClick={() => props.handleClick(thebest)}>
                <img 
                  src={thebest.image} 
                  alt={thebest.title} 
                  className="thebest-img"
                />
                <h3 className="thebest-category">{thebest.category}</h3>
                <p className="thebest-price">
                  {`Price: $${thebest.price}`}
                </p>
                <p className="thebest-count">
                  {`Count: ${thebest.rating.count}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }