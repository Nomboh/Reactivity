import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

function ActivityDashboard() {
  const {
    activityStore: { loadActivities, loadingInitial },
  } = useStore();

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={"6"}>
        <h2>To implement Profile later</h2>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
