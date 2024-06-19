import React from "react";
//import menu_data from "../menu-data";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { INSTITUTIONS } from "../menu-data";
let menu_data = [];
const MainMenu = () => {
  const [institutions, setInstitutions] = useState([]);
  const [subMenus, setSubMenus] = useState([]);
  const [institutionsOne, setInstitutionsOne] = useState([]);
  const [institutionsTwo, setInstitutionsTwo] = useState([]);
  const [institutionsThree, setInstitutionsThree] = useState([]);
  useEffect(() => {
    loadInstutions();
  }, []);
  function loadInstutions() {
    setInstitutionsOne([...INSTITUTIONS].slice(1, 6));
    setInstitutionsTwo([...INSTITUTIONS].slice(6, 12));
    setInstitutionsThree([...INSTITUTIONS].slice(12));

    menu_data = [
      {
        title: "Home",
        link: "/",
        mega_menu: false,

        submenus: [],
      },
      {
        title: "Institutions",
        link: "#",
        mega_menu: true,
        submenus: [
          {
            title: "Institutions",
            mega_submenu: [...INSTITUTIONS].slice(0, 6),
          },
          {
            title: "Institutions",
            mega_submenu: [...INSTITUTIONS].slice(6, 12),
          },
          {
            title: "Institutions",
            mega_submenu: [
              ...INSTITUTIONS.concat({
                index: 60,
                city: "",
                id: "",
                name: "All Institutions",
                sellingPoint: ``,
                logo: "",
              }),
            ].slice(12),
          },
        ],
      },
      {
        title: "Courses",

        link: "/courses",
        mega_menu: false,

        submenus: [],
      },
      {
        title: "Compare",
        link: "/compare",
        mega_menu: false,

        submenus: [],
      },
      {
        title: "About",
        link: "about-3",
        mega_menu: false,

        submenus: [
          {
            title: "About Us",
            link: "/about-us",
          },
          {
            title: "About Scotland",
            link: "/about-scotland",
          },
          {
            title: "Why Choose Us",
            link: "/why-choose-us",
          },
        ],
      },
      {
        title: "Contact Us",
        link: "/contact-us",
        mega_menu: false,

        submenus: [],
      },
      {
        title: "Sign In",
        link: "about-3",
        mega_menu: false,

        submenus: [
          {
            title: "User Sign In",
            link: "/sign-in",
          },
          {
            title: "Agent Sign In",
            link: "/agent-sign-in",
          },
        ],
      },
    ];
  }
  return (
    // <ul className="mainmenu">
    //   <li className="menu-title">
    //     <a href="#">Home</a>
    //   </li>

    //   <li className="has-droupdown">
    //     <a href="#">Intitutions</a>
    //     <ul className="submenu">
    //       {institutions &&
    //         institutions.map((nav, i) => (
    //           <li key={i}>
    //             <Link href={`${nav.link}`}>
    //               <a>{nav.name}</a>
    //             </Link>
    //           </li>
    //         ))}
    //     </ul>
    //   </li>
    //   <li className="menu-title">
    //     <a href="#">Courses</a>
    //   </li>
    //   <li className="menu-title">
    //     <a href="#">Compare</a>
    //   </li>
    //   <li className="menu-title">
    //     <a href="#">About</a>
    //   </li>
    //   <li className="menu-title">
    //     <a href="#">Contact Us</a>
    //   </li>
    //   <li className="menu-title">
    //     <a href="#">E-Pay</a>
    //   </li>
    //   {/* <li className="has-droupdown">
    //     <a href="#">Exchange Rate</a>
    //   </li> */}
    // </ul>
    <ul className="mainmenu">
      {menu_data.map((menu, i) => (
        <li
          key={i}
          className={menu.submenus.length == 0 ? "menu-title" : "has-droupdown"}
        >
          <a href={menu.link}>{menu.title}</a>
          {!menu.mega_menu && menu.submenus.length > 0 && (
            <ul className="submenu">
              {menu.submenus.map((nav, i) => (
                <li key={i}>
                  <Link href={`${nav.link}`}>
                    <a>
                      {nav.title}
                      {nav?.hot && <span className="badge-1">hot</span>}
                      {nav?.new && <span className="badge">new</span>}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {menu.mega_menu && (
            <ul className="mega-menu">
              {menu.submenus.map((nav, i) => (
                <li key={i}>
                  <h6 className="menu-title">{nav.title}</h6>
                  <ul className="submenu mega-sub-menu-01">
                    {nav.mega_submenu.map((m, i) => (
                      <li key={i}>
                        <Link
                          href={
                            m.id
                              ? `/institution-details/${m.id}`
                              : `/institutions`
                          }
                        >
                          <a>{m.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MainMenu;
