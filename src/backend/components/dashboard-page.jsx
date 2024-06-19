import React from "react";
import styles from "../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import Link from "next/link";
import AdminLayout from "../AdminLayout";
import { useRouter } from "next/router";
import {
  ADMIN_ROLE,
  AGENT_ROLE,
  DEFAULT_COLOR,
  GLOBAL_URL,
  POST_APPLICATION_LIST,
  POST_COUNTRIES,
  POST_DOCUMENT,
  POST_ENGLISH_TEST,
  POST_FIND_AGENT_USERS,
  POST_HIGHEST_QUALIFICATION,
  POST_HIGH_SCHOOL,
  POST_PREVIOUS_QUALIFICATION,
  POST_PROFILE_SAVE,
  POST_SPONSOR,
  POST_USER_PROFILE,
  POST_VISA_HISTORY,
  POST_CHECK_EMAIL_VERIFIED,
  ROLE,
  SIGN_IN_URL,
  TOKEN,
  USER_ROLE,
  checkLogin,
  setCookieAsync,
  getCookieAsync,
} from "../../utils/global";
import AgentDashboard from "./dashboards/agent_dashboard";
import UserDashboard from "./dashboards/user_dashboard";
import AdminDashboard from "./dashboards/admin_dashboard";

function dashboardPage({ agentUserId = "" }) {
  const router = useRouter();

  const [applications, setApplications] = useState([]);
  const [agentUsers, setAgentUsers] = useState([]);
  const [highestQualification, setHighestQualification] = useState("");
  const [previousQualification, setPreviousQualification] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [documents, setDocuments] = useState([]);
  const [englishTest, setEnglishTest] = useState("");
  const [profile, setProfile] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [visaHistory, setVisaHistory] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [hasEmailVerified, setHasEmailVerified] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  //activeIndex

  useEffect(() => {
    loadRole();
  }, []);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const loadRole = async () => {
    await setCookieAsync("next_url", "/user/dashboard");
    const token = await getCookieAsync(TOKEN);

    if (!token) {
      console.log("Not token ----------------------");
      router.push(SIGN_IN_URL);
    }
    const role = await getCookieAsync(ROLE);
    if (role == USER_ROLE) {
      loadApplications();

      loadProfile();
      loadQualification();
      loadPreviousQualification();
      loadHighSchool();
      loadEnglishTest();
      loadSponsor();
      loadVisaHistory();
      loadDocuments();
      loadIsEmailVerified();
    } else if (role == AGENT_ROLE) {
      loadAgentusers();
    } else if (role == ADMIN_ROLE) {
    }
    setRole(role);
  };
  const loadApplications = async () => {
    const result = await POST_APPLICATION_LIST();

    setApplications(result.data.data);
  };
  const loadAgentusers = async () => {
    try {
      const result = await POST_FIND_AGENT_USERS();

      setAgentUsers(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadDocuments = async () => {
    try {
      const result = await POST_DOCUMENT({});

      setDocuments(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadProfile = async () => {
    const result = await POST_USER_PROFILE({});

    setProfile(result.data);
  };
  const loadIsEmailVerified = async () => {
    POST_CHECK_EMAIL_VERIFIED({})
      .then((result) => {
        //console.log(result.hasEmailVerified);
        setHasEmailVerified(true);
      })
      .catch((error) => {
        setHasEmailVerified(false);
      });
  };
  const loadQualification = async () => {
    try {
      const result = await POST_HIGHEST_QUALIFICATION();

      setHighestQualification(result.data.data);
    } catch (err) {
      setHighestQualification("");
    }
  };
  const loadPreviousQualification = async () => {
    try {
      const result = await POST_PREVIOUS_QUALIFICATION();

      setPreviousQualification(result.data.data);
    } catch (err) {
      setPreviousQualification("");
    }
  };

  const loadHighSchool = async () => {
    try {
      const result = await POST_HIGH_SCHOOL();

      setHighSchool(result.data.data);
    } catch (err) {
      console.log("High school is empty");
      setHighSchool("");
    }
  };
  const loadEnglishTest = async () => {
    try {
      const result = await POST_ENGLISH_TEST();

      setEnglishTest(result.data.data);
    } catch (err) {
      setEnglishTest("");
    }
  };

  const loadSponsor = async () => {
    try {
      const result = await POST_SPONSOR();

      setSponsor(result.data.data);
    } catch (err) {
      setSponsor("");
    }
  };

  const loadVisaHistory = async () => {
    try {
      const result = await POST_VISA_HISTORY({});

      setVisaHistory(result.data.data);
    } catch (err) {
      console.log(err);

      setVisaHistory("");
    }
  };

  return (
    <>
      {role == USER_ROLE && (
        <UserDashboard
          isEmailVerified={hasEmailVerified}
          applications={applications}
          highestQualification={highestQualification}
          previousQualification={previousQualification}
          highSchool={highSchool}
          englishTest={englishTest}
          sponsor={sponsor}
          visaHistory={visaHistory}
          documents={documents}
          userId={profile.id}
        />
      )}
      {role == ADMIN_ROLE && <AdminDashboard />}

      {role == AGENT_ROLE && (
        <>
          <AgentDashboard application={agentUsers} />
        </>
      )}
    </>
  );
}

export default dashboardPage;
