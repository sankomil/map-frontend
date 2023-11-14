import React from "react";
import "./App.css";
import { Sidebar, Map } from "../components";
import { APIProvider } from "@vis.gl/react-google-maps";
import { GlobalContext } from "../context/GlobalContext";

function App() {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_ID || ""}>
      <GlobalContext>
        <div>
          <Sidebar />
          <Map />
        </div>
      </GlobalContext>
    </APIProvider>
  );
}

export default App;
