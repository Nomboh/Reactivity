import axios, { AxiosError, AxiosResponse } from "axios";
import { toast, ToastContent } from "react-toastify";
import { Activity, ActivityFormValue } from "../Model/activity";
import { Photo, Profile } from "../Model/profile";
import { ServerError } from "../Model/serverError";
import { User, UserFormValue } from "../Model/user";
import { router } from "../router/Router";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async response => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status, config } = error.response;
      const dataErr = data as { errors: any };
      switch (status) {
        case 400:
          if (config.method === "get" && dataErr.errors.hasOwnProperty("id")) {
            router.navigate("not-found");
          }
          if (dataErr.errors) {
            const modelStateErrors = [];
            for (const key in dataErr.errors) {
              if (dataErr.errors[key]) {
                modelStateErrors.push(dataErr.errors[key]);
              }
            }

            throw modelStateErrors.flat();
          } else {
            toast.error(data as ToastContent<unknown>);
          }
          break;
        case 401:
          toast.error("unauthorized");
          break;

        case 403:
          toast.error("forbiden");
          break;

        case 404:
          router.navigate("/not-found");
          break;

        case 500:
          store.commonStore.setServerError(data as ServerError);
          router.navigate("/server-error");
          break;
      }

      return Promise.reject(error);
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => request.get<Activity[]>("/activities"),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValue) =>
    request.post<void>("/activities", activity),
  update: (activity: ActivityFormValue) =>
    request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/activities/${id}`),
  attend: (id: string) => request.post<void>(`/activities/${id}/attend`, {}),
};

const Account = {
  current: () => request.get<User>("/account"),
  login: (user: UserFormValue) => request.post<User>("/account/login", user),
  register: (user: UserFormValue) =>
    request.post<User>("/account/register", user),
};

const Profiles = {
  get: (username: string) => request.get<Profile>(`/profile/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  setMainPhoto: (id: string) => request.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => request.del(`/photos/${id}`),
};

const agent = {
  Activities,
  Account,
  Profiles,
};

export default agent;
