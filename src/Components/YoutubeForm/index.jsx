import React from "react";
import { useFormik } from "formik";

const YoutubeForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      channel: "",
    },
  });

  console.log("Form values :>> ", formik.values);

  return (
    <div className="m-1 p-1">
      <h1 className="mt-1 mb-1">YoutubeForm</h1>
      <div className="mt-1">
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <label htmlFor="name">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label htmlFor="name">Channel</label>
          <input
            type="text"
            name="channel"
            id="channel"
            onChange={formik.handleChange}
            value={formik.values.channel}
          />

          <button type="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default YoutubeForm;
