export const formFields = {
  email: {
    label: "Email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Invalid email",
      },
    },
  },
};
