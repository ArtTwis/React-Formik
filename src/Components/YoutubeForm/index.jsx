import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
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

const validationSchema = Yup.object({
  name: Yup.string().required("Field must required!"),
  email: Yup.string()
    .required("Field must required!")
    .email("Invalid email format!"),
  channel: Yup.string().required("Field must required!"),
});

const onSubmit = (values) => {
  console.log("values :>> ", values);
};

const YoutubeForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    // validate,
  });

  return (
    <div className="m-1 p-1">
      <h1 className="mt-1 mb-1">YoutubeForm</h1>
      <div className="mt-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched?.name && formik.errors?.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="name">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched?.email && formik.errors?.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <input
              type="text"
              name="channel"
              id="channel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
            />
            {formik.touched?.channel && formik.errors?.channel ? (
              <div className="error">{formik.errors.channel}</div>
            ) : null}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default YoutubeForm;
