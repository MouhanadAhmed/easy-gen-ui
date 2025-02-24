import React from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authClient } from "../../../lib/auth/client";

export default function RegisterCard({toggleContainer}:Readonly<{ toggleContainer: () => void }>) {
  const [isPending, setIsPending] = React.useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Za-z]/, "Password must contain at least one letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
      .required("Password is required"),
  });

  const submit = async (values: { name: string; email: string; password: string }, { resetForm }: { resetForm: () => void }) => {
    setIsPending(true);

    try {
      const { error } = await authClient.signUp(values);


      if (error) {
        toast.error("Error: " + error.toString(), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsPending(false);
      }else{
       
          setIsPending(false);
          resetForm();
          toast.success(`Success! Registered as ${values.name}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toggleContainer()
      }
 
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }

    setIsPending(false);
  };

  return (
    <div className="form-box register">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => submit(values, { resetForm })}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1>Registration</h1>

            <div className="input-box">
              <Field type="text" name="name" placeholder="Username" />
              <ErrorMessage name="name" component="div" className="error-text" />
            </div>

            <div className="input-box">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="input-box">
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <button type="submit" className="btn" disabled={isPending || isSubmitting}>
              {isPending ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
