import { Layout, Menu, Typography } from "antd";
import {
  FolderOpenOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const { Header, Content, Footer } = Layout;

const menuItems = [
  { key: "/", label: "Home", icon: <HomeOutlined /> },
  { key: "/about", label: "About", icon: <UserOutlined /> },
  { key: "/projects", label: "Projects", icon: <FolderOpenOutlined /> },
];

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKeys = useMemo(() => {
    const path =
      location.pathname === "/" ? "/" : `/${location.pathname.split("/")[1]}`;
    return [path];
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          paddingInline: 24,
        }}
      >
        <Typography.Title level={4} style={{ margin: 0, color: "#fff" }}>
          Portfolio
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={menuItems}
          style={{ flex: 1, minWidth: 0, justifyContent: "flex-end" }}
          onClick={({ key }) => navigate(key)}
        />
      </Header>
      <Content style={{ padding: "24px 48px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Built with React, TypeScript, Vite, and Ant Design.
      </Footer>
    </Layout>
  );
}
