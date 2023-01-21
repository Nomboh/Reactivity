import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/Model/activity";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={"2"}>
          <Button
            onClick={() => openForm(activity.id)}
            content="Edit"
            color="blue"
            basic
          />
          <Button
            onClick={cancelSelectActivity}
            content="Cancel"
            color="grey"
            basic
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default ActivityDetails;
