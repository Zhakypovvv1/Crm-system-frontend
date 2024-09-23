interface FormConfig {
  [key: string]: Record<string, string>;
}

export const formConfig = {
  login: {
    title: "Login",
    buttonText: "Log In",
    fields: [
      { name: "email", type: "email", placeholder: "Email" },
      { name: "password", type: "password", placeholder: "Password" },
    ],
  },
  register: {
    title: "Register",
    buttonText: "Sign Up",
    fields: [
      { name: "name", type: "text", placeholder: "Name" },
      { name: "email", type: "email", placeholder: "Email" },
      { name: "password", type: "password", placeholder: "Password" },
    ],
  },
  create: {
    title: "Task",
    buttonText: "Create task",
    fields: [
      { name: "title", type: "text", placeholder: "Title" },
      {
        name: "category",
        type: "select",
        placeholder: "Select Category",
        options: [], // Это будет заполняться в компоненте формы
      },
    ],
  },
  edit: {
    title: "Edit Task",
    buttonText: "Save Changes",
    fields: [{ name: "title", type: "text", placeholder: "Title" }],
  },
  notes: {
    text: "Notes",
    buttonText: "Create Note",
    fields: [{ name: "text", type: "text", placeholder: "Text" }],
  },
  editNote: {
    text: "Edit Note",
    buttonText: "Save Changes",
    fields: [{ name: "text", type: "text", placeholder: "text" }],
  },
  details: {
    title: "Details",
    buttonText: "Create Details",
    fields: [{ name: "description", type: "text", placeholder: "Description" }],
  },
  detailsEdit: {
    text: "Edit Detail",
    buttonText: "Save Changes",
    fields: [{ name: "text", type: "text", placeholder: "text" }],
  },
};
