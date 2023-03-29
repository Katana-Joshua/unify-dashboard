import { Layout, Image } from "antd";
import SideMenu from '../src/components/SideMenu';
import AppRoutes from "./components/AppRoutes";

import { Amplify, DataStore } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from './aws-exports';
import { useEffect } from "react";
import AuthContextProvider from "./Context/AuthContext";
import icon from './assets/data/icon.png'

Amplify.configure(awsconfig);
// Storage.configure(awsconfig);

const { Sider, Content, Footer } = Layout;

function App() {

  // useEffect(() => {
  //   DataStore.configure({
  //     syncExpressions: false
  //   })
  // }, []);
  return (
    <AuthContextProvider>
      <Layout>
        <Sider style={{ height: "100vh", backgroundColor: "white" }}>
          <Image
            // src={require('./assets/data/icon.png')}
            src={icon}
            preview={false}
          />
          <SideMenu />
        </Sider>
        <Layout>
          <Content>
              <AppRoutes />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            UnifyFoods Restaurant Dashboard ©2023
          </Footer>
        </Layout>
      </Layout>
    </AuthContextProvider>
  );
}

export default withAuthenticator(App);
