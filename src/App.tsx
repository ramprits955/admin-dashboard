import { Refine } from "@pankod/refine-core";
import routerProvider, {
  HashRouterComponent,
} from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Layout } from "./components";
import { Common } from "./constants/common";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { axiosInstance } from "./utils/agent";
import { authProvider } from "./utils/authProvider";

function App() {
  return (
    <Refine
      Layout={Layout as any}
      routerProvider={{
        ...routerProvider,
        RouterComponent: HashRouterComponent,
      }}
      dataProvider={dataProvider(Common.API_URL, axiosInstance)}
      authProvider={authProvider(axiosInstance)}
      DashboardPage={Home}
      resources={[{ name: "settings" }]}
      LoginPage={Login}
    />
  );
}

export default App;
