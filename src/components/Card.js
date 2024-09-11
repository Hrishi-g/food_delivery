import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from 'react-router-dom'
import './Card.css'; // Import the CSS file

export default function Card(props) {

  let navigate = useNavigate();
  let data = useCart();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const[qty,setQty] = useState(1);
  const[size,setSize] = useState("");
  let priceRef = useRef();
  let foodItem = props.foodItem;

  let finalPrice = qty*parseInt(options[size]);

  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  const handleClick = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login")
    }
  }

  const handleOptions = (e) => {
    setSize(e.target.value);
  }

  const handleAddCart = async() => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
  }

  return (
    <div className="card mt-3 card-container">
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="Food Image"
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="d-flex flex-column align-items-start">
          <select className="form-select mb-2 bg-light" onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="form-select mb-2 bg-light" ref={priceRef}
          onClick={handleClick} onChange={handleOptions}>
            {priceOptions.map((i) => {
              return <option key={i} value={i}>{i}</option>
            })}
          </select>
          <div className="w-100 text-start fs-5">
            Total Price: {finalPrice}
          </div>
          <hr />
          <button className="btn btn-primary w-100 mt-2" onClick={handleAddCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
