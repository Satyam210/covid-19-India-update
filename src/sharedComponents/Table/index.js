import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Card, Table, Input, Badge } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";

const columns = [
  {
    title: "S.No",
    dataIndex: "sno",
    width: "10%",
  },
  {
    title: "State/UT",
    dataIndex: "state_name",
    width: "25%",
  },
  {
    title: "Active",
    dataIndex: "new_active",
    sorter: {
      compare: (a, b) => a.new_active - b.new_active,
      multiple: 1,
    },
    render: (new_active) => <span style={{ color: "blue" }}>{new_active}</span>,
  },
  {
    title: "Change Since Yesterday",
    dataIndex: "change_since_yesterday",
    sorter: {
      compare: (a, b) => a.change_since_yesterday - b.change_since_yesterday,
      multiple: 1,
    },

    width: "20%",
  },
  {
    title: "Cured",
    dataIndex: "new_cured",
    sorter: {
      compare: (a, b) => a.new_cured - b.new_cured,
      multiple: 1,
    },
    render: (new_cured) => <span style={{ color: "green" }}>{new_cured}</span>,
  },
  {
    title: "Death",
    dataIndex: "new_death",
    sorter: {
      compare: (a, b) => a.new_death - b.new_death,
      multiple: 1,
    },
    render: (new_death) => <span style={{ color: "red" }}>{new_death}</span>,
  },
];
export default function StateTable({ data }) {
  const [stateList, setStatelist] = useState();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    setStatelist(data?.stateTable?.slice(0, data?.stateTable.length - 6));
  }, [data]);

  useEffect(() => {
    onSearch(searchString);
  }, [searchString]);

  const updateQuery = (query) => {
    setSearchString(query);
  };

  const onSearch = (search) => {
    console.log(search);
    setStatelist(
      data?.stateTable
        ?.slice(0, data?.stateTable.length - 6)
        .filter((ele) =>
          ele.state_name?.toLowerCase().includes(search.toLowerCase())
        )
    );
  };
  const headerNode = (
    <div className="header">
      <div className="tableHeaderTitle">
        STATE-WISE COVID CASES
        <Badge
          count={stateList?.length}
          overflowCount={999999}
          style={{
            backgroundColor: "#fff",
            color: "black",
            boxShadow: "0 0 0 1px #d9d9d9 inset",
            fontWeight: 600,
            margin: 5,
          }}
        />
      </div>

      <div className="searchBar">
        <Input
          prefix={<SearchOutlined />}
          style={{ width: 280 }}
          placeholder="Search By State/UT name .."
          onChange={(e) => updateQuery(e.target.value)}
        />
      </div>
    </div>
  );
  return (
    <div style={{ width: "80%", margin: 20 }}>
      <Card style={{ width: "100%" }}>
        {headerNode}
        <Table
          rowKey="sno"
          columns={columns}
          dataSource={stateList}
          pagination={false}
        />
        <ol>
          {data?.stateTable?.slice(-5).map((ele, index) => {
            return <li key={index}>{ele.replaceAll("*", "")}</li>;
          })}
        </ol>
      </Card>
    </div>
  );
}
