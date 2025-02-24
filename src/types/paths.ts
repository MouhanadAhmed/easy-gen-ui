// todo need to change this
export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    overview: "/dashboard",
    account: "/dashboard/account",
    users: "/users",
    newUser: "/dashboard/user/new-user",
    user: "/user",
    settings: "/dashboard/settings",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
