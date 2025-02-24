import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { authClient } from "../../../lib/auth/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const navigate=useNavigate()
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Za-z]/, "Password must contain at least one letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      )
      .required("Password is required"),
  });

  const submit = async (values: { email: string; password: string }, { resetForm }: { resetForm: () => void }) => {
    setIsPending(true);
    const { error } = await authClient.signInWithPassword(values);

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
        toast.success("Success! Logged in as " + values.email, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/application");
    }

    
    // Refresh the auth state
    // router.replace("/");
    // router.refresh();
  };

  return (
    <div className="form-box login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => submit(values, { resetForm })}
      >
        {({ isSubmitting }) => (
          <Form >
            <h1>Login</h1>
            <div className="input-box">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="input-box">
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <button type="submit"  className="btn"  disabled={isPending || isSubmitting}>
              {isPending ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}
