import React from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TasksType } from "../../../../shared/types/Tasks/TasksType";
import AppButton from "../../../../shared/ui/Button/Button";
import Edit from "../../../../features/Edit/ui/Edit/Edit";
import useFilterSearchParams from "../../../../shared/hooks/useFilterSearchParams";

interface TableTasksProps {
  items: TasksType[];
  totalItems: number;
  toggleStatus: (id: string) => void;
  handleEditTask: (id: string, formData: Record<string, unknown>) => void;
  handleDelete: (id: string) => void;
}

const TableTasks: React.FC<TableTasksProps> = ({
  items,
  totalItems,
  toggleStatus,
  handleEditTask,
  handleDelete,
}) => {
  const { page, pageSize, updateSearchParams } = useFilterSearchParams();
  const columns: TableColumnsType<TasksType> = [
    {
      title: "Task",
      dataIndex: "title",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "asd",
          value: "asd",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      onFilter: (value, record) => record.title.indexOf(value as string) === 0,
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      render: (_, record) => (
        <Tag color={record.status ? "green" : "red"}>
          {record.status ? "Completed" : "Processing"}
        </Tag>
      ),
    },
    {
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Edit
            type="edit"
            editConfig={{ title: record.title }}
            id={record._id}
            handleEdit={handleEditTask}
          />
          <AppButton
            variant="tertiary"
            size="small"
            onClick={() => handleDelete(record._id)}
          >
            delete
          </AppButton>
          <AppButton
            variant="tertiary"
            size="small"
            onClick={() => toggleStatus(record._id)}
          >
            status
          </AppButton>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TasksType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const paginationConfig = {
    current: page,
    pageSize,
    total: totalItems,
    onChange: (page: number) => {
      updateSearchParams({ page }, (value: number) => value !== 1);
    },
  };
  return (
    <Table
      columns={columns}
      dataSource={items.map((el) => ({ ...el, key: el._id }))}
      onChange={onChange}
      pagination={paginationConfig}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default TableTasks;
