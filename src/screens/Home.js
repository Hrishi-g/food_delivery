import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Screens.css';

// Custom styles for the dots
const DotContainer = styled('div')({
  position: 'absolute',
  top: '375px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: 8,
  zIndex: 10,
});

const Dot = styled('div')(({ theme, active }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
  cursor: 'pointer',
}));

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const loadata = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadata();
  }, []);

  // Filter categories based on search
  const filteredCategories = foodCat.filter((category) =>
    foodItem.some(
      (item) =>
        item.CategoryName === category.CategoryName &&
        item.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Check if there are any items to display
  const hasMatchingItems = filteredCategories.length > 0;

  var items = [
    {
      name: "Random Name #1",
      img: "images/1.jpg"
    },
    {
      name: "Random Name #2",
      img: "images/2.jpg"
    },
    {
      name: "Random Name #3",
      img: "images/3.jpg"
    }
  ];

  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative' }}>
        <Carousel
          autoPlay={true}
          interval={5000}
          onChange={(index) => setActiveIndex(index)}
          style={{ maxHeight: '400px', width: '100%' }}
        >
          {
            items.map((item, i) =>
              <Paper key={i} style={{ position: 'relative', height: '400px' }}>
                <img src={item.img} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />
              </Paper>
            )
          }
        </Carousel>
        <DotContainer>
          {
            items.map((_, index) =>
              <Dot
                key={index}
                active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            )
          }
        </DotContainer>
      </div>
      <div className="container">
        {hasMatchingItems ? (
          filteredCategories.map((data) => (
            <div key={data._id} className="row m-3">
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItem
                .filter(
                  (item) =>
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filterItems) => (
                  <div
                    key={filterItems._id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    <Card
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                    />
                  </div>
                ))}
            </div>
          ))
        ) : (
          <div>Hello World</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
