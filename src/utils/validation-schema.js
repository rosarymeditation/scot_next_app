import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  phone: Yup.string().required().label("Phone"),
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  // terms: Yup.bool().oneOf([
  //   true,
  //   "You need to accept the terms and conditions",
  // ]),
});
export const phdSchema = Yup.object().shape({
  phone: Yup.string().required().label("Phone"),
  firstname: Yup.string().required().label("Firstname"),
  middlename: Yup.string(),
  lastname: Yup.string().required().label("Lastname"),
  email: Yup.string().required().email().label("Email"),
  topic: Yup.string().required().min(6).label("Topic"),
});
export const agentRegisterSchema = Yup.object().shape({
  phone: Yup.string().required().label("Phone"),
  agentName: Yup.string().required().label("Agency's name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
export const userSchema = Yup.object().shape({
  phone: Yup.string().required().label("Phone"),
  email: Yup.string().required().email().label("Email"),
  userName: Yup.string().required().label("Username"),
  firstName: Yup.string().required().label("First name"),
  middleName: Yup.string().required().label("Middle name"),
  lastName: Yup.string().required().label("Last name"),
  contactName: Yup.string().required().label("Contact name"),
  homeAddress: Yup.string().required().label("Home address"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required().label("Email or username"),
  password: Yup.string().required().min(6).label("Password"),
});

export const resetPostSchema = Yup.object().shape({
  password: Yup.string().required().min(6).label("Password"),
  repeatPassword: Yup.string().required().min(6).label("Repeat password"),
});
export const resetSchema = Yup.object().shape({
  email: Yup.string().required().label("Email"),
});

export const blogCommentSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const contactSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const courseSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  msg: Yup.string().required().min(20).label("Summery"),
});
