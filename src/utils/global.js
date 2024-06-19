import axios from "axios";
import Cookies from "js-cookie";
import emailjs from "emailjs-com";
import { IS_FOR_HIGHEST_QUALIFICATION } from "../layout/headers/menu-data";
export const GLOBAL_URL = `https://scotstudy.onrender.com/api/`;
//export const GLOBAL_URL = `http://localhost:8001/api/`;
export const headers = {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};
export const PAYMENT_URL = (param) => `https://scotstudy.co.uk/${param}`;
const serviceID = "service_eyccimy"; // Replace with your service ID from EmailJS
const templateID = "template_dej0iuj"; // Replace with your template ID from EmailJS
const userID = "cdbABP3v8YXsqTqzK";
export const sendEmail2 = (templateParams) => {
  return emailjs.send(serviceID, templateID, templateParams, userID);
};
export const header = async () => {
  const token = await getCookieAsync(TOKEN);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const checkLogin = async (routerFunction) => {
  const token = await getCookieAsync(TOKEN);
  if (!token) {
    routerFunction;
  }
};
export const SIGN_IN_URL = "/sign-in";
export const SIGN_IN_AGENT_URL = "/agent_sign-in";
export const USER_DATA = "user";
export const TOKEN = "token";
export const REF_ID = "refId";
export const COURSE_FACULTY_ID = "course_faculty";
export const COURSE_SEARCH = "course_search";
export const COURSE_INSTITUTION_ID = "course_institution";
export const COURSE_DEGREE_ID = "course_degree";
export const COURSE_OFFSET = "course_offset";

export const COMPARE_FACULTY_ID = "compare_faculty";
export const COMPARE_INSTITUTION_ID = "compare_institution";
export const COMPARE_DEGREE_ID = "compare_degree";
export const FOR_ABOUT_US = "about-us";
export const FOR_ABOUT_SCOTLAND = "about-scotland";
export const FOR_WHY_CHOOSE_US = "why_choose_us";
export const IS_ADMIN = "is_admin";
export const ROLE = "role";
export const ADMIN_ROLE = "admin_role";
export const USER_ROLE = "user_role";
export const AGENT_ROLE = "agent_role";
export const COURSE_ONE = "course_one";
export const COURSE_TWO = "course_two";
export const YES = "YES";
export const NO = "NO";
export const DEFAULT_COLOR = "#034694";
export const REQUIRED_MSG = (inputName) => {
  return `${inputName} is required!`;
};
export const INSTITUTION_END = function loadInstitutions() {
  return axios.get(GLOBAL_URL``);
};

export const GET_COURSE_BY_ID = (id) => axios.get(`${GLOBAL_URL}course/${id}`);
export const GET_COURSE_BY_NAME = (name) =>
  axios.post(`${GLOBAL_URL}courseByName`, { slug:name }, headers);
export const POST_RELATED_COURSES = (data) =>
  axios.post(`${GLOBAL_URL}relatedCourses`, data);

export const POST_POPULAR_COURSES = () =>
  axios.post(`${GLOBAL_URL}popularCourses`, {}, headers);

export const POST_GET_INSTITUTION_BY_ID = (id) =>
  axios.post(`${GLOBAL_URL}findInstitutionById`, { id }, headers);

export const POST_INSTITUTIONS = () =>
  axios.post(`${GLOBAL_URL}institutionsForMobile`, {}, headers);

export const DELETE_INSTITUTION = (id) =>
  axios.delete(`${GLOBAL_URL}institution/${id}`, {}, headers);

export const DELETE_BANNER = (id) =>
  axios.delete(`${GLOBAL_URL}banner/${id}`, {}, headers);

export const POST_FACULTIES = () =>
  axios.post(`${GLOBAL_URL}facultiesLight`, {}, headers);

export const POST_DEGREE_TYPES = () =>
  axios.post(`${GLOBAL_URL}degreeTypes`, {}, headers);

export async function POST_FACULTIES_SAVE(data) {
  const innerHead = await header();
  axios.post(`${GLOBAL_URL}faculty`, data, innerHead);
}
//verifyManually

export async function PATCH_VERIFY_EMAIL_MANUALLY(id, data) {
  return axios.patch(`${GLOBAL_URL}verifyManually/${id}`, data, headers);
}
// export const POST_GET_USERS = (data) => {
//   return axios.post(`${GLOBAL_URL}allUsers`, data, headers);
// };
export async function POST_FACULTIES_UPDATE(data, id) {
  const innerHead = await header();
  axios.patch(`${GLOBAL_URL}faculty/${id}`, data, innerHead);
}

export async function POST_TOTAL_APPLICATIONS() {
  return axios.post(`${GLOBAL_URL}applicationCounter`, {}, headers);
}
export async function POST_TOTAL_USERS() {
  return axios.post(`${GLOBAL_URL}userCounter`, {}, headers);
}

// export async function SEND_EMAIL_VERIFICATION() {
//   return axios.post(`${GLOBAL_URL}sendEmailVerification`, {}, headers);
// }

export const SEND_EMAIL_VERIFICATION = async (data) => {
  return axios.post(`${GLOBAL_URL}sendEmailVerificationForWeb`, data);
};
//sendEmailVerification
export const GET_FIND_FACULTY_BY_ID = (id) =>
  axios.get(`${GLOBAL_URL}facultyLight/${id}`, {}, headers);

export const DELETE_FACULTY = (id) =>
  axios.delete(`${GLOBAL_URL}faculty/${id}`, {}, headers);

export const POST_COURSE_SEARCH = (data) =>
  axios.post(`${GLOBAL_URL}courseByParams`, data);
export const POST_SIGN_UP = (data) =>
  axios.post(`${GLOBAL_URL}signUpForMobile`, data);

export const POST_PHD_APPLICATION_SAVE = (data) =>
  axios.post(`${GLOBAL_URL}savePhdApplication`, data);

export async function POST_PHD_APPLICATIONS(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findPhdApplications`, data, innerHead);
}
export async function POST_CHECK_EMAIL_VERIFIED() {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}checkIfEmailVerify`, {}, headers);
}
//checkIfEmailVerify
export async function POST_EMAIL_VERIFICATION_FOR_UPDATE(data) {
  return axios.post(
    `${GLOBAL_URL}sendEmailVerificationForRegUpdateForWeb`,
    data
  );
}
//sendEmailVerificationForRegUpdate
export const GET_PHD_APPLICATION_BY_ID = (data) =>
  axios.post(`${GLOBAL_URL}findPhdApplicationById`, data);

export const POST_PHD_QUALIFCATION_TYPES = () =>
  axios.post(`${GLOBAL_URL}findPhdQualifications`, {});
//findPhdQualifications

export const POST_AGENT_SIGN_UP = (data) =>
  axios.post(`${GLOBAL_URL}agentSignUp`, data);

export const POST_AGENT_SIGN_IN = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}agentSignIn`, data);
};
export const POST_FORGOT_PASSWORD = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}forgotPassword`, data, innerHead);
};

export const POST_RESET_PASSWORD = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}resetPassword`, data, innerHead);
};

export const POST_RESET_PASSWORD_POST = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}resetPasswordPost`, data, innerHead);
};
//resetPassword
export async function POST_USER_PROFILE(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}userByIdMobile`, data, innerHead);
}

export const POST_AGENT_USER_REGISTER = (data) =>
  axios.post(`${GLOBAL_URL}createAgentUser`, data, headers);

export const POST_ALL_PAYMENT_PURPOSE = () =>
  axios.post(`${GLOBAL_URL}findAllPaymentPurpose`, {}, headers);

export const POST_PAYMENT_SAVE = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}makePaymentForNewWeb`, data, innerHead);
};

export const UPDATE_PAYMENT = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}updatePayment`, data, innerHead);
};

export const GET_PAYMENTS_BY_USER = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findUserPayments`, data, innerHead);
};

export const GET_ALL_USERS_PAYMENTS = async (data) => {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findAllByParams`, data, innerHead);
};
//

export const POST_AGENT_USER_FIND = (data) =>
  axios.post(`${GLOBAL_URL}findUserById`, data, headers);

export const POST_CITIES = (data) =>
  axios.post(`${GLOBAL_URL}allCities`, data, headers);

export async function POST_INSTITUTION_SAVE(data) {
  const innerHead = await header();
  axios.post(`${GLOBAL_URL}saveInstitution`, data, innerHead);
}

export async function POST_COURSE_SAVE(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}saveCourse`, data, innerHead);
}

export const DELETE_COURSE = (id) =>
  axios.delete(`${GLOBAL_URL}course/${id}`, {}, headers);

export const GET_COURSE = (id) =>
  axios.get(`${GLOBAL_URL}course/${id}`, {}, headers);

export async function POST_COURSE_UPDATE(data, id) {
  const innerHead = await header();
  axios.patch(`${GLOBAL_URL}updateCourse/${id}`, data, innerHead);
}

export const POST_TESTIMONY_SAVE = (data) =>
  axios.post(`${GLOBAL_URL}testimonial`, data, headers);

export async function POST_TESTIMONIES() {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}testimonials`, {}, innerHead);
}

export async function POST_GET_TESTIMONY_BY_ID(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findTestimonialById`, data, innerHead);
}

export const DELETE_TESTIMONY = (id) =>
  axios.delete(`${GLOBAL_URL}testimonial/${id}`, {}, headers);
//testimonial

export async function POST_BANNER_SAVE(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}banner`, data, innerHead);
}

export async function POST_BANNERS(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}banners`, data, innerHead);
}

export async function POST_GET_BANNER_BY_ID(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findBannerById`, data, innerHead);
}

//findBannerById

export const POST_COUNTRIES = () => axios.post(`${GLOBAL_URL}countries`);

export async function POST_PROFILE_SAVE(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}user/update`, data, innerHead);
}

export async function POST_DECISION_UPDATE(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}decisionUpdate`, data, innerHead);
}
//decisionUpdate

export async function POST_APPLICATION_LIST() {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}findApplicationsByUserForMobile`,
    {},
    innerHead
  );
}

export async function POST_FIND_AGENT_USERS() {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findAllUsersByAgent`, {}, innerHead);
}

//findAllUsersByAgent
export async function POST_APPLICATION_ID(id) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findApplicationById`, { id }, innerHead);
}

export async function POST_NEWSLETTER_SAVE(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}newsletter`, data, innerHead);
}
//newsletter
export async function POST_VISA_STATUS_LIST() {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}visaApplyStatuses`, {}, innerHead);
}
//visaApplyStatuses

export const POST_QUALIFICATION_TYPES = (data) =>
  axios.post(`${GLOBAL_URL}qualificationTypes`);

export async function POST_HIGHEST_QUALIFICATION(data = {}) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}findHighestQualificationByUserForMobile`,
    data,
    innerHead
  );
}
//relationships

export const POST_RELATIONSHIPS_TYPES = () =>
  axios.post(`${GLOBAL_URL}relationships`, {}, header());
export async function POST_PREVIOUS_QUALIFICATION(data = {}) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}findPreviousQualificationByUserForMobile`,
    data,
    innerHead
  );
}
// export const POST_QUALIFICATION_SAVE = (data) =>
//   axios.post(
//     `${GLOBAL_URL}create-previous-qualification-Mobile`,
//     data,
//     header()
//   );

export async function POST_QUALIFICATION_SAVE(data, applicationType) {
  const innerHead = await header();
  if (applicationType == IS_FOR_HIGHEST_QUALIFICATION) {
    return axios.post(
      `${GLOBAL_URL}create-qualification-Mobile`,
      data,
      innerHead
    );
  } else {
    return axios.post(
      `${GLOBAL_URL}create-previous-qualification-Mobile`,
      data,
      innerHead
    );
  }
}
export const setCookieAsync = (name, value) => {
  return new Promise((resolve, reject) => {
    try {
      Cookies.set(name, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const getCookieAsync = (name) => {
  return new Promise((resolve, reject) => {
    try {
      const cookie = Cookies.get(name);
      resolve(cookie);
    } catch (error) {
      reject(error);
    }
  });
};
export const removeCookieAsync = (name) => {
  return new Promise((resolve, reject) => {
    try {
      const cookie = Cookies.remove(name);
      resolve(cookie);
    } catch (error) {
      reject(error);
    }
  });
};

export async function POST_ENGLISH_TEST(data = {}) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}findEnglishByUser-for-mobile`,
    data,
    innerHead
  );
}

export async function POST_ENGLISH_TEST_SAVE(data) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}create-englishTest-for-mobile`,
    data,
    innerHead
  );
}

export async function POST_DOCUMENT_SAVE(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}uploadDocumentForMobile`, data, innerHead);
}
export async function DELETE_DOCUMENT(id) {
  const innerHead = await header();
  return axios.delete(`${GLOBAL_URL}documentDelete/${id}`, innerHead);
}

export async function POST_COMPARE_COURSES(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}compareForMobileNew`, data, innerHead);
}
//compareForMobileNew
export async function POST_DOCUMENT(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findUserDocumentsForMobile`, data, innerHead);
}
//findUserDocumentsForMobile
export async function POST_HIGH_SCHOOL(data = {}) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}findHighSchoolByUserForMobile`,
    data,
    innerHead
  );
}

export async function POST_HIGH_SCHOOL_SAVE(data) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}create-highSchool-for-mobile`,
    data,
    innerHead
  );
}

export async function POST_SPONSOR(data = {}) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}findSponsorshipByUser-for-mobile`,
    data,
    innerHead
  );
}

export async function POST_FIND_ALL_APPLICATION_BY_USER(data) {
  const innerHead = await header();
  return axios.post(`${GLOBAL_URL}findApplicationsByUserWeb`, data, innerHead);
}

//findApplicationsByUserWeb
export async function POST_SPONSOR_SAVE(data) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}create-sponsorship-for-mobile`,
    data,
    innerHead
  );
}

export async function POST_VISA_HISTORY(data = {}) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}findVisaHistoryByUser-for-mobile`,
    data,
    innerHead
  );
}

export async function POST_VISA_HISTORY_SAVE(data) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}create-visaHistory-for-mobile`,
    data,
    innerHead
  );
}

export const POST_COURSE_PARAM = (data) => {
  return axios.post(`${GLOBAL_URL}courseByParams`, data, headers);
};

export const POST_GET_AGENCIES = (data = {}) => {
  return axios.post(`${GLOBAL_URL}findAgentApplications`, data, headers);
};

export const POST_GET_ALL_AGENCIES = () => {
  return axios.post(`${GLOBAL_URL}findAllAgents`, {}, headers);
};

export const POST_TOTAL_MALE = () => {
  return axios.post(`${GLOBAL_URL}findMale`, {}, headers);
};

export const POST_TOTAL_FEMALE = () => {
  return axios.post(`${GLOBAL_URL}findFemale`, {}, headers);
};
//findMale
export const POST_GET_APPLICATIONS_FOR_DASH = () => {
  return axios.post(`${GLOBAL_URL}findAllForDashboard`, {}, headers);
};

export const POST_GET_APPLICATIONS = (data) => {
  return axios.post(`${GLOBAL_URL}allApplications`, data, headers);
};

export const POST_GET_USERS = (data) => {
  return axios.post(`${GLOBAL_URL}allUsers`, data, headers);
};
export const POST_GET_USERS_FOR_DASH = () => {
  return axios.post(`${GLOBAL_URL}findAllUserForDash`, {}, headers);
};

export async function POST_APPLICATION_SAVE(data) {
  const innerHead = await header();
  return axios.post(
    `${GLOBAL_URL}create-application-for-mobile`,
    data,
    innerHead
  );
}
export async function DELETE_APPLICATION(id) {
  const innerHead = await header();
  return axios.delete(`${GLOBAL_URL}application/${id}`, {}, innerHead);
}
const INSTITUTION_URL = "/admin/institution/";
const FACULTY_URL = "/admin/faculty/";
const BANNER_URL = "/admin/banner/";
const COURSE_URL = "/admin/course/";
const TESTIMONY_URL = "/admin/testimony/";
const PHD_URL = "/admin/phd/";

export const URL_INSTITUTION_CREATE = `${INSTITUTION_URL}create`;
export const URL_INSTITUTION_LIST = `${INSTITUTION_URL}list`;
export const URL_INSTITUTION_EDIT = (id) => `${INSTITUTION_URL}update/${id}`;

export const URL_FACULTY_CREATE = `${FACULTY_URL}create`;
export const URL_FACULTY_LIST = `${FACULTY_URL}list`;
export const URL_FACULTY_EDIT = (id) => `${FACULTY_URL}update/${id}`;

export const URL_BANNER_CREATE = `${BANNER_URL}create`;
export const URL_BANNER_LIST = `${BANNER_URL}list`;
export const URL_BANNER_EDIT = (id) => `${BANNER_URL}update/${id}`;

export const URL_COURSE_CREATE = `${COURSE_URL}create`;
export const URL_COURSE_LIST = `${COURSE_URL}list`;
export const URL_COURSE_EDIT = (id) => `${COURSE_URL}update/${id}`;

export const URL_TESTIMONY_CREATE = `${TESTIMONY_URL}create`;
export const URL_TESTIMONY_LIST = `${TESTIMONY_URL}list`;
export const URL_TESTIMONY_EDIT = (id) => `${TESTIMONY_URL}update/${id}`;

export const URL_PHD_LIST = `${PHD_URL}list`;
export const URL_PHD_EDIT = (id) => `${PHD_URL}list/${id}`;

export const URL_APPLICATION_LIST = `/admin/applications`;
export const URL_USER_LIST = `/admin/users`;
export const URL_PAYMENT_LIST = `/admin/payments`;
export const URL_AGENT_LIST = `/admin/agents`;

//create-application-for-mobile
