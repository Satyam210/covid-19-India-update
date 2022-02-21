import React from "react";
import "antd/dist/antd.css";
import { Card, Table } from "antd";

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
  },
  {
    title: "Death",
    dataIndex: "new_death",
    sorter: {
      compare: (a, b) => a.new_death - b.new_death,
      multiple: 1,
    },
  },
];
export default function StateTable({ data }) {
  return (
    <div style={{ width: "80%", margin: 20 }}>
      <Card>
        <Table
          rowKey="sno"
          columns={columns}
          dataSource={data?.stateTable?.slice(0, data?.stateTable.length - 6)}
          pagination={false}
        />
      </Card>
    </div>
  );
}
