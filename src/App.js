import React, { useEffect, useState } from "react";
import "./App.scss";
import { Card, message } from "antd";
import Cards from "./sharedComponents/Cards";
import StateTable from "./sharedComponents/Table";
import { Map } from "./map";
import axios from "axios";
import coronaImage from "./images/image.png";
import { cloneDeep } from "lodash";

const App = () => {
  const [data, setData] = useState([]);
  const [highState, setHighState] = useState({});
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://calm-ocean-08446.herokuapp.com/")
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => message.error("Failed to Fetch the records from server"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (data?.stateTable?.length > 0) {
      let tempData = cloneDeep(data);
      let res = tempData.stateTable.sort(
        (a, b) => b.new_active - a.new_active
      )[0];
      setHighState(res);
    }
  }, [data]);

  const showData = (id) => {
    let [selectedState] = data.stateTable.filter(
      (item) => item.state_name && item.state_name.toLowerCase().includes(id)
    );
    if (!!selectedState) {
      let divElem = document.getElementById("info-box");
      divElem.innerHTML = `<p>State: ${selectedState.state_name}</p><p>New Active: ${selectedState.new_active}</p>`;
    }
  };

  return (
    <div className="rootContainer">
      <img className="image" src={coronaImage} alt="COVID-19" />
      <h2>India and State Wise Cases of Corona Virus</h2>
      <Cards data={data?.covidData} />
      <h3 style={{ color: "blue" }}>
        ** Tap on the Map to view state-wise covid cases **
      </h3>
      <Card>
        {
          <div id="info-box" className="info-box">
            <p>State: {highState?.state_name?.replaceAll("*", "")}</p>
            <p>New Active: {highState?.new_active}</p>
          </div>
        }
        <Map showData={showData} />
      </Card>
      <StateTable data={data} />
    </div>
  );
};

export default App;
