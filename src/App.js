import {  useEffect, useState } from "react";
import {   Route , Routes   } from "react-router-dom";
import ProductsBar from "./components/products/productsBar.jsx";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Products from "./components/products/products.jsx";
import ProductsWallpaper from "./components/products/ProductsWallpaper.jsx";
import BestSellers from "./components/products/bestsellers.jsx";
import NewProducts from "./components/products/newproducts.jsx";
import Cart from "./components/Cart/cart.jsx";
import Deal from "./components/products/deal.jsx";
import Thebest from "./components/Cart/thebest.jsx";
import CreditCard from "./components/products/photos/images.png";
import Incorrect from "./components/products/photos/remove.png";
import Correct from "./components/products/photos/checked.png";

export default function App() {
  const [products, setProducts] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCheckOut,setShowCheckOut] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addToCartIcon, setAddToCartIcon] = useState(0);
  const [addToTheBestIcon, setAddToTheBestIcon] = useState({});
  const [addToTheBestIconCount, setAddToTheBestIconCount] = useState(0);
  const [addTheBestComponent, setAddTheBestComponent] = useState({});
  const [addCartComponent, setAddCartComponent] = useState({});
  const[count,setCount] = useState(0);
  const[phoneNumber,setPhoneNumber] = useState(null);
  const[email,setEmail] = useState(null);
  const[nameOnCard,setNameOnCard] = useState(null);

  useEffect(() => {
    const storedCartIcon = safeParse(localStorage.getItem("addToCartIcon"));
    const storedTheBestIcon = safeParse(localStorage.getItem("addToTheBestIcon"));
    const storedAddTheBestComponent = safeParse(localStorage.getItem("addTheBestComponent"));
    const storedAddCartComponent = safeParse(localStorage.getItem("addCartComponent"));

    function safeParse(jsonString, defaultValue) {
      try {
        return jsonString ? JSON.parse(jsonString) : defaultValue;
      } catch {
        return defaultValue;
      }
    }

    if (storedCartIcon) {
      setAddToCartIcon(storedCartIcon);
    }
    if (storedTheBestIcon) {
      setAddToTheBestIcon(storedTheBestIcon);
      const count = Object.values(storedTheBestIcon).filter(Boolean).length;
      setAddToTheBestIconCount(count);
    }
    if (storedAddTheBestComponent) {
      setAddTheBestComponent(storedAddTheBestComponent);
    }
    if(storedAddCartComponent){
      setAddCartComponent(storedAddCartComponent);
    }
  }, []);
  const handleTheBestIcon = (productId) => {
    setAddToTheBestIcon(prev => {
      const newFav = { ...prev, [productId]: !prev[productId] };
      setAddToTheBestIconCount(prevCount =>
        newFav[productId] ? prevCount + 1 : prevCount - 1
      );
      return newFav;
    });
  };
  const handleCheckOut = (product) => {
    setShowCheckOut(prev => !prev);
    setSelectedProduct(product);
  };
  function handleRemoveFromCart(productId,product){
    setAddToCartIcon(prev => prev - 1);
    setAddCartComponent(prev => {
      const removeProduct = {...prev};
      delete removeProduct[productId];
      return removeProduct;
    });
  }
  function handleAddToCartClick(productId, product) {
    if(addCartComponent[productId]){
      return null;
    }else{
      setAddToCartIcon(prev => prev + 1);
    }
    setAddCartComponent(prev => {
      const updated = {...prev,[productId]:product};
      return updated;
    });
  }
  

  function handleTheBestComponent(productId, product) {
    setAddTheBestComponent(prev => {
      if (prev[productId]) {
        const newBest = { ...prev };
        delete newBest[productId];
        return newBest;
      } else {
        return { ...prev, [productId]: product };
      }
    });
  }
  function handleSubmit(e){
  e.preventDefault();
  const formData = new FormData(e.target);
  const jsonData = Object.fromEntries(formData);
  console.log(jsonData);
  try{
  fetch("https://fakestoreapi.com/products/",{
    method: "POST",
    headers: {
          "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });
}
  catch(error){
    console.error("error:", error);
  }
  const validationCondition = /^\w+@(gmail|com|yahoo|outlook)\.(com|org|edu|sa)$/.test(email)
  &&  /^[A-z']+(?:[ .'&-/][A-z']+)*$/.test(nameOnCard)
  && /^\d{16}$/.test(phoneNumber) ? setShowCheckOut(false) : null;
  return validationCondition;
  }
  const overlay = () => {
    return (
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-content">
            <img src={selectedProduct.image} alt={selectedProduct.title} className="popup-img" />
            <h3 className="popup-category">{selectedProduct.category}</h3>
            <p className="popup-title">{selectedProduct.title}</p>
            <p className="popup-desc">{selectedProduct.description}</p>
            <p className="popup-price">{`Price: $${selectedProduct.price}`}</p>
            <button className="cta-btn" onClick={() => handleAddToCartClick(selectedProduct.id, selectedProduct)}>Add to Cart</button>
            <button className="close-btn" onClick={handleHassan}>No Thanks</button>
          </div>
        </div>
      </div>
    );
  };
  const checkOut = () => {
    return(
            <div className="checkout-overlay">
              <div className="checkout-container">
                <div className="checkout-text">
                <h2 className="checkout-heading">STYLE HAVEN</h2>
                <p className="paris">EGYPT</p>
                </div>
                <form className="payment-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label className="form-label">
      Contact Information
      <input 
        type="email" 
        placeholder="Email" 
        className="form-input email-input"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {
        !email 
        ? <span className="hint">Enter your email</span>
        : email.length < 5 
        ? <span className="warning">Too Short</span>
        : !email.includes("@")
        ? <span className="warning">Missing @ sympol</span>
        : /^\w+@(gmail|com|yahoo|outlook)\.(com|org|edu|sa)$/.test(email)
        ? <img src={Correct} alt="correct" className="validation"/>
        : <img src={Incorrect} alt="incorrect" className="validation" />
      }
    </label>
  </div>

  <div className="form-group">
    <label className="form-label">
      Card Information
      <input 
        type="text" 
        placeholder="Name on card" 
        className="form-input name-on-card"
        name="text"
        onChange={(e) => setNameOnCard(e.target.value)}
      />
      {
        !nameOnCard 
        ? <span className="hint-nameof-card">Name on card</span>
        : nameOnCard.length < 5 
        ? <span className="warning-nameof-card">Too Short</span>
        : /^[A-z']+(?:[ .'&-/][A-z']+)*$/.test(nameOnCard)
        ? <img src={Correct} alt="correct" className="validation-nameof-card"/>
        : <img src={Incorrect} alt="incorrect" className="validation-nameof-card" />
      }
    </label>
    
    <div className="credit-card-group">
      <label className="form-label">
        Card Number
        <div className="credit-card-input-wrapper">
          <input
            type="text"
            className="form-input credit-card-number"
            maxLength="19"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
      {
        !phoneNumber 
        ? <span className="hint-phone">Enter your phone number</span>
        : phoneNumber.length < 4 
        ? <span className="warning-phone">Too Short</span>
        : /^\d{16}$/.test(phoneNumber)
        ? <img src={Correct} alt="correct" className="validation-phone"/>
        : <img src={Incorrect} alt="incorrect" className="validation-phone" />
      }
          <img 
            src={CreditCard} 
            alt="credit-card" 
            className="credit-card-icon"
          />
        </div>
      </label>
    </div>
  </div>
              <div className="checkout-btns">
              <button className="place-order-btn">Place order</button>
              <button onClick={removeCheckOut} className="closecheckout-btn">No Thanks</button>
              </div>
</form>
              
              </div>
              <div className="order-card">
                    <img src={selectedProduct.image} alt={selectedProduct.title} className="order-img"/>
                    <p className="order-cate">{selectedProduct.category}</p>
                    <p className="order-title">{selectedProduct.title}</p>
                    <p className="order-price">{`$${selectedProduct.price}`}</p>
                    <div className="count-div">
                      <button className="Increament" onClick={
                      () => count === selectedProduct.rating.count ? 
                      setCount(selectedProduct.rating.count) : 
                        setCount(prev => prev + 1)}>+</button>
                      <p className="count">{count}</p>
                      <button className="Decreament" onClick={() => count === 0 ? setCount(0) :  setCount(prev => prev - 1)}>-</button>
                    </div>
                    <p className="subtotal">Subtotal <span>{`$${selectedProduct.price}`}</span></p>
                    <p className="tax">Tax <span>$0.00</span></p>
                    <p className="shipping">Shipping <span>$0.00</span></p>
                    <br/>
                    <p className="total">Total <span>{`$${selectedProduct.price}`}</span></p>
              </div>
              </div>
    );
  };

  useEffect(() => {
    localStorage.setItem("addToCartIcon", JSON.stringify(addToCartIcon));
  }, [addToCartIcon]);

  useEffect(() => {
    localStorage.setItem("addToTheBestIcon", JSON.stringify(addToTheBestIcon));
  }, [addToTheBestIcon]);

  useEffect(() => {
    localStorage.setItem("addTheBestComponent", JSON.stringify(addTheBestComponent));
  }, [addTheBestComponent]);
  useEffect(() => {
    localStorage.setItem("addCartComponent", JSON.stringify(addCartComponent));
  },[addCartComponent]);
  function handleClick(product) {
    setSelectedProduct(product);
    setShowOverlay(!showOverlay);
  }

  function handleHassan() {
    setShowOverlay(!showOverlay);
  }
  function removeCheckOut(){
    setShowCheckOut(!showCheckOut);
  }
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <>
      <Navbar
        addToCartIcon={addToCartIcon}
        addToTheBestIcon={addToTheBestIcon}
        addToTheBestIconCount={addToTheBestIconCount}
      />
      <Routes>
        <Route path="/" element = {
          <>
      <ProductsWallpaper />
      <ProductsBar/>
      <Products
        products={products}
        handleClick={handleClick}
        showOverlay={showOverlay}
        addToTheBestIcon={addToTheBestIcon}
        setAddToTheBestIcon={setAddToTheBestIcon}
        handleTheBestIcon={handleTheBestIcon}
        handleTheBestComponent={handleTheBestComponent}
        handleAddToCartClick={handleAddToCartClick}
        overlay={overlay}
      /> 
        <BestSellers products={products} handleClick={handleClick} />
        <NewProducts products={products} handleClick={handleClick} />
        <Deal products={products} handleAddToCartClick={handleAddToCartClick} />
          </>
        } />
      
        <Route 
        path="/thebest" 
        element={<Thebest
        selectedProduct={selectedProduct}
        addToTheBestIcon={addToTheBestIcon}
        addTheBestComponent={addTheBestComponent}
        handleClick={handleClick}
        showOverlay={showOverlay}
        overlay={overlay}
        />}
        />
      <Route 
      path="/cart" 
      element={<Cart 
        addCartComponent={addCartComponent}
        setAddCartComponent={setAddCartComponent}
        handleRemoveFromCart={handleRemoveFromCart}
        showCheckOut={showCheckOut}
        handleCheckOut={handleCheckOut}
        handleClick={handleClick}
        checkOut = {checkOut}
      />} />
      </Routes>
    </>
  );
}
