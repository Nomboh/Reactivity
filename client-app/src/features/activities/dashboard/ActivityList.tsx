import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { Activity } from "../../../app/Model/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (activity: Activity) => void;
  submitting: boolean;
}

function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

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
        {activities &&
          activities.map(activity => (
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
                    onClick={() => selectActivity(activity.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    onClick={e => handleDeleteActivitity(e, activity)}
                    floated="right"
                    content="Delete"
                    color="red"
                    loading={submitting && target === activity.id}
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

export default ActivityList;
