import React from "react";
import "./App.css";
import { Sidebar, Map, Alert } from "../components";
import { APIProvider } from "@vis.gl/react-google-maps";
import { GlobalContext } from "../context/GlobalContext";

function App() {
  return (
    <APIProvider
      apiKey={process.env.REACT_APP_GOOGLE_API_ID || ""}
      libraries={["places"]}
    >
      <GlobalContext>
        <div style={{ position: "relative" }}>
          <Sidebar />
          <Map />
          <Alert />
        </div>
      </GlobalContext>
    </APIProvider>
  );
}

export default App;
