import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ActivityFormValue } from "../../../app/Model/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOption";
import MyDateInput from "../../../app/common/form/MyDateInput";

function ActivityForm() {
  const { id } = useParams();
  const {
    activityStore: {
      createActivity,
      updateActivity,
      loadActivity,
      loadingInitial,
    },
  } = useStore();
  /* 
  const initialState = {
    id: "",
    title: "",
    description: "",
    category: "",
    date: null,
    city: "",
    venue: "",
  }; */

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const [activity, setActivity] = useState<ActivityFormValue>(
    new ActivityFormValue()
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadActivity(id).then(a => {
        return setActivity(new ActivityFormValue(a));
      });
    }
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormValue) {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  }

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity" />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={value => handleFormSubmit(value)}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />
            <MyTextArea placeholder="Description" name="description" row={10} />
            <MySelectInput
              options={categoryOptions}
              name="category"
              placeholder="Category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />

            <Button
              floated="right"
              loading={isSubmitting}
              positive
              type="submit"
              content="Submit"
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              as={Link}
              to={`/activities`}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
