import { Layout, Image } from "antd";
import SideMenu from '../src/components/SideMenu';
import AppRoutes from "./components/AppRoutes";

import { Amplify, DataStore } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
// import awsconfig from './aws-exports';
import { useEffect } from "react";
import AuthContextProvider from "./Context/AuthContext";
import icon from './assets/data/icon.png'
import { aws } from "./util/useful_stuff";

Amplify.configure(aws);
// Amplify.configure(awsconfig);
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
          src="https://i.ibb.co/xF91LVF/Unify-Food1.png"
            // src={require('./assets/data/icon.png')}
            // src={icon}
            style={{ height: "20vh", width: "200px" }}
            preview={false}
          />
          <SideMenu />
        </Sider>
        <Layout>
          <Content>
              <AppRoutes />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            UnifyFoods Restaurant Dashboard ©2023.
          </Footer>
        </Layout>
      </Layout>
    </AuthContextProvider>
  );
}

export default withAuthenticator(App);
