import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";

const SERVER_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [payload, setPayLoad] = useState(null);
  const [socketUrl, setSocketUrl] = useState(null);
  const { lastMessage, readyState } = useWebSocket(socketUrl, { share: true });
  const [account, setAccount] = useState(null);
  const [log, setLog] = useState(null);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage && payload) {
      getAccountStatus();
    }
  }, [lastMessage, payload]);

  const onConnect = async () => {
    const res = await axios.post(`${SERVER_BASE_URL}/login`);
    if (res.status === 200) {
      setLog(res.data.status ? "connect success" : "connect failed");
      setPayLoad(res.data);
      setSocketUrl(res.data.data.wsUrl);
    } else setLog("connect failed");
  };

  const onDisconnect = async () => {
    const res = await axios.delete(
      `${SERVER_BASE_URL}/logout/${payload.data.uuid}`
    );
    if (res.status === 200) {
      setLog(res.data.status ? "disconnect success" : "disconnect failed");
      setPayLoad(null);
    } else setLog("disconnect failed");
  };

  const getAccountStatus = async () => {
    const res = await axios.get(
      `${SERVER_BASE_URL}/payload/${payload.data.uuid}`
    );
    if (res.status === 200) setAccount(res.data.data.response.account);
  };

  return (
    <div className="App">
      <button onClick={onConnect}>Connect Wallet</button>
      <p>{log && `Status: ${log}`}</p>
      {payload && payload.status && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={payload.data.qrUrl} alt="QR" width={300} />
          <a href={payload.data.next}>
            <button>Open XUMM</button>
          </a>
          <button onClick={onDisconnect}>Disconnect</button>
          <p>The WebSocket is currently {connectionStatus}</p>
          <p>uuid: {payload.data.uuid}</p>
          <p>account: {account}</p>
          <p>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
          </p>
          {/* {messageHistory &&
            messageHistory.map((message, i) => <p key={i}>{message}</p>)} */}
        </div>
      )}
    </div>
  );
}

export default App;
