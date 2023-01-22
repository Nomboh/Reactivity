import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

function ActivityDetails() {
  const {
    activityStore: {
      selectedActivity: activity,
      openForm,
      cancelSelectedActivity,
    },
  } = useStore();

  if (!activity) return <LoadingComponent />;
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
            onClick={cancelSelectedActivity}
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
