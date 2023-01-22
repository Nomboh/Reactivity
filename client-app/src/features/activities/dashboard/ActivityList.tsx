import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { Activity } from "../../../app/Model/activity";
import { useStore } from "../../../app/stores/store";

function ActivityList() {
  const [target, setTarget] = useState("");

  const {
    activityStore: { loading },
  } = useStore();

  const {
    activityStore: { getActivitiesByDate, deleteActivity },
  } = useStore();

  function handleDeleteActivitity(
    event: SyntheticEvent<HTMLButtonElement>,
    activity: Activity
  ) {
    const { name } = event.currentTarget;
    deleteActivity(activity);
    setTarget(name);
  }

  return (
    <Segment>
      <Item.Group divided>
        {getActivitiesByDate().map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as={"a"}>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={NavLink}
                  to={`/activities/${activity.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={e => handleDeleteActivitity(e, activity)}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={loading && target === activity.id}
                  name={activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

export default observer(ActivityList);
