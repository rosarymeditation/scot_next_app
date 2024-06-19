import "semantic-ui-css/semantic.min.css";
import React from "react";
import Cookies from "js-cookie";

import { useState, useEffect, useRef } from "react";
import SideNav, {
  Toggle,
  NavText,
  NavItem,
  SideNavActionContext,
  Navtext,
  NavIcon,
} from "@trendmicro/react-sidenav";
import { Dropdown, Menu, Container } from "semantic-ui-react";
import {
  FaUser,
  FaBuilding,
  FaCog,
  FaLock,
  FaUserEdit,
  FaSignOutAlt,
  FaHome,
  FaEdit,
  FaPowerOff,
} from "react-icons/fa";
import { RiMenuLine } from "react-icons/ri";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {
  TOKEN,
  ADMIN_ROLE,
  AGENT_ROLE,
  ROLE,
  SIGN_IN_AGENT_URL,
  SIGN_IN_URL,
  URL_AGENT_LIST,
  URL_APPLICATION_LIST,
  URL_BANNER_CREATE,
  URL_BANNER_LIST,
  URL_COURSE_CREATE,
  URL_COURSE_LIST,
  URL_FACULTY_CREATE,
  URL_FACULTY_LIST,
  URL_INSTITUTION_CREATE,
  URL_INSTITUTION_LIST,
  URL_PAYMENT_LIST,
  URL_PHD_LIST,
  URL_TESTIMONY_CREATE,
  URL_TESTIMONY_LIST,
  URL_USER_LIST,
  USER_DATA,
  USER_ROLE,
  getCookieAsync,
  removeCookieAsync,
} from "../utils/global";
import { useRouter } from "next/router";
import { LoginChecker } from "./components/login-checker";
function AdminLayout({ children }) {
  useEffect(() => {
    loadRole();
  }, []);
  const [role, setRole] = useState("");
  const router = useRouter();
  const handleClick = (e, { value, name }) => {
    if (name == "dashboard") {
      router.push("/user/dashboard");
    }
    if (name == "checklist") {
      router.push("/user/checklist");
    }
    if (value == "school-create") {
      router.push(URL_INSTITUTION_CREATE);
    } else if (value == "school-list") {
      router.push(URL_INSTITUTION_LIST);
    } else if (value == "course-create") {
      router.push(URL_COURSE_CREATE);
    } else if (value == "course-list") {
      router.push(URL_COURSE_LIST);
    } else if (value == "banner-create") {
      router.push(URL_BANNER_CREATE);
    } else if (value == "banner-list") {
      router.push(URL_BANNER_LIST);
    } else if (value == "faculty-create") {
      router.push(URL_FACULTY_CREATE);
    } else if (value == "faculty-list") {
      router.push(URL_FACULTY_LIST);
    } else if (value == "phd") {
      router.push(URL_PHD_LIST);
    } else if (value == "applications") {
      router.push(URL_APPLICATION_LIST);
    } else if (value == "users") {
      router.push(URL_USER_LIST);
    } else if (value == "agents") {
      router.push(URL_AGENT_LIST);
    } else if (value == "payments") {
      router.push(URL_PAYMENT_LIST);
    } else if (value == "testimonies") {
      router.push(URL_TESTIMONY_LIST);
    }
    //testimonies
  };

  const options = [
    // { key: 1, text: "My Profile", value: "profile" },
    { key: 2, text: "Logout", value: "logout" },
  ];
  const loadRole = async () => {
    const role = await getCookieAsync(ROLE);
    setRole(role);
  };
  const getUser = () => {
    const user = Cookies.get(USER_DATA);

    return "username";
  };
  const handleChange = async (_, { value }) => {
    if (value == "logout") {
      if (role == AGENT_ROLE) {
        await removeCookieAsync(TOKEN);
        router.push(SIGN_IN_AGENT_URL);
      } else {
        await removeCookieAsync(TOKEN);
        router.push(SIGN_IN_URL);
      }
    }
  };
  return (
    <>
      <LoginChecker />
      <Container>
        <br />
        <Menu>
          <Menu.Item name="dashboard" onClick={handleClick}>
            Dashboard
          </Menu.Item>
          {role === USER_ROLE && (
            <Menu.Item name="checklist" onClick={handleClick}>
              Checklist
            </Menu.Item>
          )}
          {role === ADMIN_ROLE && (
            <>
              <Dropdown text="Institution" pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item value="school-create" onClick={handleClick}>
                    Create
                  </Dropdown.Item>
                  <Dropdown.Item value="school-list" onClick={handleClick}>
                    List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text="Course" pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item value="course-create" onClick={handleClick}>
                    Create
                  </Dropdown.Item>
                  <Dropdown.Item value="course-list" onClick={handleClick}>
                    List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text="Faculty" pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item value="faculty-create" onClick={handleClick}>
                    Create
                  </Dropdown.Item>
                  <Dropdown.Item value="faculty-create" onClick={handleClick}>
                    List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text="Banner" pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item value="banner-create" onClick={handleClick}>
                    Create
                  </Dropdown.Item>
                  <Dropdown.Item value="banner-list" onClick={handleClick}>
                    List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown text="Others" pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item value="users" onClick={handleClick}>
                    Users
                  </Dropdown.Item>
                  <Dropdown.Item value="applications" onClick={handleClick}>
                    Applications
                  </Dropdown.Item>
                  <Dropdown.Item value="phd" onClick={handleClick}>
                    Phds
                  </Dropdown.Item>
                  <Dropdown.Item value="testimonies" onClick={handleClick}>
                    Testimonies
                  </Dropdown.Item>
                  <Dropdown.Item value="payments" onClick={handleClick}>
                    Payments
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}

          <Menu.Menu position="right">
            <Dropdown
              onChange={handleChange}
              item
              simple
              text={getUser()}
              direction="right"
              options={options}
            />
          </Menu.Menu>
        </Menu>
        <LoginChecker />

        {children}
      </Container>
    </>
  );
}

export default AdminLayout;
