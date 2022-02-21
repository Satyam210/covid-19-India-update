import React, { useEffect, useState } from "react";
import { Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "./index.scss";

const colorArray = {
  Active: "activeCard",
  Discharged: "recovered",
  Deaths: "deaths",
};

const Cards = ({ data }) => {
  return (
    <div className="card-wrapper">
      {data &&
        data.map((ele, index) => (
          <Card
            key={index}
            title={Object.keys(ele)[0].toUpperCase()}
            bordered={false}
            className={colorArray[Object.keys(ele)[0].split("(")[0]]}
          >
            <Statistic
              title={`Last Updated at : ${new Date().toDateString()}`}
              value={Object.values(ele)[0].value}
              precision={2}
              valueStyle={{
                color: Object.values(ele)[0].label.includes("down")
                  ? "#cf1322"
                  : "#3f8600",
              }}
              prefix={
                Object.values(ele)[0].label.includes("up") ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
            />
          </Card>
        ))}
    </div>
  );
};
export default Cards;
