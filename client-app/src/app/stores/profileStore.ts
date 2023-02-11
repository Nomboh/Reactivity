import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile, UserActivity } from "../Model/profile";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loadingImages = false;
  loading = false;
  loadingFollowers = false;
  followings: Profile[] = [];
  activeTab = 0;
  userActivities: UserActivity[] = [];
  loadingActivities = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  setActiveTab = (activeTab: any) => {
    this.activeTab = activeTab;
  };

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }
  uploadPhoto = async (file: Blob) => {
    this.uploading = true;

    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.loadingImages = true;

    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find(p => p.isMain)!.isMain = false;
          this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loadingImages = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingImages = false;
      });
    }

    this.loadingImages = false;
  };

  deletePhoto = async (photo: Photo) => {
    this.loadingImages = true;

    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            p => p.id !== photo.id
          );
          this.loadingImages = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.loadingImages = false));
      console.log(error);
    }
  };

  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;

    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          following
            ? this.profile.followerCount++
            : this.profile.followerCount--;
          this.profile.following = !this.profile.following;
        }

        if (
          this.profile &&
          this.profile.username === store.userStore.user?.username
        ) {
          following
            ? this.profile.followingCount++
            : this.profile.followingCount--;
        }

        this.followings.forEach(profile => {
          if (profile.username === username) {
            profile.following
              ? profile.followerCount--
              : profile.followerCount++;
            profile.following = !profile.following;
          }
        });

        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  loadFollowings = async (predicate: string) => {
    this.loadingFollowers = true;
    try {
      const currentUserFollowings = await agent.Profiles.listFollowings(
        this.profile!.username,
        predicate
      );
      runInAction(() => {
        this.followings = currentUserFollowings;
        this.loadingFollowers = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingFollowers = false));
    }
  };

  loadUserActivities = async (username: string, predicate?: string) => {
    this.loadingActivities = true;

    try {
      const activities = await agent.Profiles.listActivities(
        username,
        predicate!
      );
      runInAction(() => {
        this.userActivities = activities;
        this.loadingActivities = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingActivities = false;
      });
    }
  };
}
