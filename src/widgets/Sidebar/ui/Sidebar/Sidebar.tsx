import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { BiCategory } from "react-icons/bi";
import { BsTag } from "react-icons/bs";

const { Sider } = Layout;

interface MenuItem {
  label: string;
  key: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const items: MenuItem[] = [
  { label: "Tasks", key: "1", icon: <PieChartOutlined />, path: "/" },
  { label: "Category", key: "2", icon: <BiCategory />, path: "/categories" },
  {
    label: "Tags",
    key: "3",
    icon: <BsTag />,
    path: "/tags",
  },
  // {
  //   label: "Team",
  //   key: "sub2",
  //   icon: <TeamOutlined />,
  //   children: [
  //     { label: "Team 1", key: "6" },
  //     { label: "Team 2", key: "8" },
  //   ],
  // },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick: MenuProps["onClick"] = ({ keyPath }): void => {
    const key = keyPath[0];
    const item = findItemByKey(items, key);
    if (item?.path) {
      navigate(item.path);
    }
  };

  const findItemByKey = (items: MenuItem[], key: string): MenuItem | null => {
    for (let item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = findItemByKey(item.children, key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={handleClick}
      />
    </Sider>
  );
};

export default Sidebar;
