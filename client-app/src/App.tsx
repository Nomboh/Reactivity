import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { List } from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <List>
          {activities &&
            activities.map((activity: any) => (
              <List.Item key={activity.id}>{activity.title}</List.Item>
            ))}
        </List>

        <Button content="click me!" />
      </header>
    </div>
  );
}

export default App;
