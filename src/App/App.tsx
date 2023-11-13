import React from "react";
import "./App.css";
import { Sidebar, Map } from "../components";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    <APIProvider apiKey="AIzaSyCkeHuKEKJ28mBJHppYkZ4jqQ8vZl9GVsY">
      <Sidebar />
      <Map />
    </APIProvider>
  );
}

export default App;
