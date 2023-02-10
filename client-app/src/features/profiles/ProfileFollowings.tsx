import { observer } from "mobx-react-lite";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, loadingProfile, activeTab } = profileStore;

  return (
    <Tab.Pane loading={loadingProfile}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon={"user"}
            content={
              activeTab === 3
                ? `people following ${profile?.displayName}`
                : `people ${profile?.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map(pf => (
              <ProfileCard profile={pf} key={profile?.username} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileFollowings);
