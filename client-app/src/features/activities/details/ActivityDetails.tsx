import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

function ActivityDetails() {
  const { id } = useParams();
  const {
    activityStore: {
      selectedActivity: activity,
      clearSelectedActivity,
      loadActivity,
      loadingInitial,
    },
  } = useStore();

  useEffect(() => {
    if (id) loadActivity(id);

    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDetails);
