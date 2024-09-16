import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "../Common/TextError.jsx";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  hobbies: [""],
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Field must required";
  }

  if (!values.email) {
    errors.email = "Field must required";
  } else if (
    !/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i.test(values.email)
  ) {
    errors.email = "Invalid email format";
  }

  if (!values.channel) {
    errors.channel = "Field must required";
  }

  return errors;
};

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Field must required!";
  }

  return error;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Field must required!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Field must required!"),
  channel: Yup.string().required("Field must required!"),
});

const onSubmit = (values, onSubmitProps) => {
  console.log("values :>> ", values);
  console.log("onSubmitProps :>> ", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const YoutubeForm2 = () => {
  return (
    <div className="m-1 p-1">
      <h1 className="mt-1 mb-1">YoutubeForm 2</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        // validateOnMount
        onSubmit={onSubmit}
        className="mt-1"
      >
        {(formikProps) => {
          console.log("formikProps :>> ", formikProps);

          return (
            <Form>
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" id="name" />
                <ErrorMessage name="name" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="name">E-mail</label>
                <Field type="email" name="email" id="email" />
                <ErrorMessage name="email">
                  {(errorMessage) => {
                    <div className="error">{errorMessage}</div>;
                  }}
                </ErrorMessage>
              </div>

              <div className="form-control">
                <label htmlFor="channel">Channel</label>
                <Field
                  type="text"
                  name="channel"
                  id="channel"
                  placeholder="Enter youtube channel name"
                />
                <ErrorMessage name="channel" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="comments">Comments</label>
                <Field
                  as="textarea"
                  id="comments"
                  name="comments"
                  validate={validateComments}
                />
                <ErrorMessage name="comments" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="address">Address</label>
                <FastField name="address">
                  {(props) => {
                    const { field, form, meta } = props;
                    return (
                      <div>
                        <input type="text" id="address" {...field} />
                        {meta.touched && meta.error ? (
                          <div>{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </FastField>
              </div>

              <div className="form-control">
                <label htmlFor="facebook">Facebook profile</label>
                <Field type="text" id="facebook" name="social.facebook" />
              </div>

              <div className="form-control">
                <label htmlFor="twitter">Twitter profile</label>
                <Field type="text" id="twitter" name="social.twitter" />
              </div>

              <div className="form-control">
                <label htmlFor="primaryPhoneNumber">Primary phone number</label>
                <Field
                  type="text"
                  id="primaryPhoneNumber"
                  name="phoneNumbers[0]"
                />
              </div>

              <div className="form-control">
                <label htmlFor="secondaryPhoneNumber">
                  Altername phone number
                </label>
                <Field
                  type="text"
                  id="secondaryPhoneNumber"
                  name="phoneNumbers[1]"
                />
              </div>

              <div className="form-control">
                <label htmlFor="hobbies">List of Hobbies</label>
                <FieldArray name="hobbies">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { hobbies } = values;

                    return (
                      <div>
                        {hobbies.map((hobby, index) => (
                          <div key={index} className="fieldArray">
                            <Field type="text" name={`hobbies[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => push("")}>
                          Add
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <button type="button" onClick={() => formikProps.validateForm()}>
                Validate Form
              </button>

              <button
                type="button"
                onClick={() => {
                  formikProps.validateField("comments");
                }}
              >
                Validate comments
              </button>

              <button
                type="button"
                onClick={() => {
                  formikProps.setTouched({
                    name: true,
                    email: true,
                    comments: true,
                    channel: true,
                  });
                }}
              >
                Visit fields
              </button>

              <button
                type="button"
                onClick={() => formikProps.setFieldTouched("comments")}
              >
                Visit comments
              </button>

              <button type="reset">Default Reset</button>

              <button
                type="submit"
                disabled={
                  !(formikProps.dirty && formikProps.isValid) ||
                  formikProps.isSubmitting
                }
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default YoutubeForm2;
