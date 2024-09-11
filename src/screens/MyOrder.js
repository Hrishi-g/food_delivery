import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [myOrderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrder = async () => {
    console.log("Fetching order data...");
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Verify the data structure

      // Flatten the order_data array to a single array of order items
      const flattenedOrders = data.orderData.order_data.flatMap(orderGroup =>
        orderGroup.map(orderItem => ({
          order_date: orderItem.Order_date,
          name: orderItem.name,
          qty: orderItem.qty,
          size: orderItem.size,
          price: orderItem.price
        }))
      );

      setOrderData(flattenedOrders); // Update state with flattened data
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError(error.message); // Set error state
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>My Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Date</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Size</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {myOrderData.length === 0 ? (
              <tr>
                <td colSpan="5">No orders found.</td>
              </tr>
            ) : (
              myOrderData.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_date}</td>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.size}</td>
                  <td>{order.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
