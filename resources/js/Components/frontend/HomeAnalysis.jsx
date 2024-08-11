import React, { useState, useEffect } from "react";

const HomeAnalysis = () => {
  const fixedData = {
    user: 100,
    hotel: 800,
    city: 70,
  };
  const [data, setData] = useState(fixedData);
  const [scroll, setScroll] = useState(0);
  const [enableScroll, setEnableScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(Math.ceil(window.scrollY));
      if (scroll > 2600) {
        setEnableScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  useEffect(() => {
    if (scroll >= 200) {
      setEnableScroll(true);
      setData({
        user: 0,
        hotel: 0,
        city: 0,
      });
      const interval = setInterval(() => {
        setData((prevData) => {
          if (prevData.user > 1000) {
            clearInterval(interval);
            return fixedData;
          }
          return {
            ...prevData,
            user: prevData.user + 5,
            hotel: prevData.hotel + 5,
            city: prevData.city + 1,
          };
        });
      }, 10);
      return () => {
        clearInterval(interval);
      };
    }
  }, [enableScroll, scroll]);

  return (
    <>
    <div className="user_tabulation_table_container bg-blue-50">
      <div className="tabulation_internal_container">
        <div className="total header_container">
          <h1 className="tabulation_header">Our Services</h1>
        </div>
        <div className="total user_data">
          <h1 className="data">{data.user}K+</h1>
          <h1 className="title">Blood Distributions</h1>
        </div>
        <div className="total hotel_data">
          <h1 className="data">{data.hotel}+</h1>
          <h1 className="title">Donors</h1>
        </div>
        <div className="total city_data">
          <h1 className="data">{data.city}+</h1>
          <h1 className="title">Places</h1>
        </div>
      </div>
    </div>

    <style>{`
        .user_tabulation_table_container{
    margin-top: 20px;
    height: 400px;
    width:100%;
    overflow: hidden;
    background-image: linear-gradient(90deg,white,#e5e7eb,white);
    display: flex;
    place-content: center;
    background-color:white;
    .tabulation_internal_container{
        display: flex;
        place-items: center;
        justify-content:space-between;
        padding: 20px;
        column-gap: 20px;
        width:100%;
        .total{
            height: 200px;
            width: 300px;
            display: flex;
            place-content: center;
            place-items: center;
            flex-direction: column;
            .data{
                font-size: 50px;
                font-weight:bold;
                color:black;
                background: linear-gradient(to right,red,rgb(135, 12, 149));
                background-clip: text;
                color: transparent;
                
            }
            .title{
                font-size: 20px;
                // color:white;
                color:black;
            }
        }
        .header_container{
            display: flex;
            width: 400px;
            .tabulation_header{
                font-size: 40px;
                place-self: center;
                color:black;
            }
        }
    }
}

      `}</style>
      </>
  );
};

export default HomeAnalysis;
