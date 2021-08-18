import React, { useEffect } from 'react';
import * as signalR from "@microsoft/signalr";
import 'antd/dist/antd.css';
import "./styles/_main.scss";

const App = () => {

  const makeConnection = async () => {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://notifysignalr.azurewebsites.net/api", {
        withCredentials: true,
      })
      .build();
    try {
      await connection.start();
      connection.on("ReceiveMessage", function (message) {
        console.log("msg", message);
      });
      const res = await connection.invoke("SendMessage", "Hello world");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    makeConnection();
  }, []);
  return (
      <div className="App">
        microsoft/signalr test
      </div>

  );
}

export default App;
