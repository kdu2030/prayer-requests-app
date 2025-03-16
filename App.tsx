import { router } from "expo-router";
import * as React from "react";

const App: React.FC = () => {
  React.useEffect(() => {
    router.push("/");
  });

  return <></>;
};

export default App;
