import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/Model/profile";

interface Props {
  profile: Profile;
}

function ProfileCard({ profile }: Props) {
  return (
    <Card>
      <Image as={Link} to={`/profiles/${profile.username}`}>
        <Card.Content>
          <Card.Header>{profile.displayName}</Card.Header>
          <Card.Description>Bio goes here!!!</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          20 followers
        </Card.Content>
      </Image>
    </Card>
  );
}

export default observer(ProfileCard);
