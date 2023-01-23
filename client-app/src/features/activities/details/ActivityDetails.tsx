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
    activityStore: { selectedActivity: activity, loadActivity, loadingInitial },
  } = useStore();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDetails);
