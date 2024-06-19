import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import MainMenu from "../headers/component/main-menu";
import HeaderTopRight from "../headers/component/header-top-right";
import HeaderTopLeft from "../headers/component/header-top-left";
import SearchPopup from "../../components/common/popup-modal/search-popup";
import useSticky from "../../hooks/use-sticky";
import { wishlistItems } from "../../redux/features/wishlist-slice";
import useCartInfo from "../../hooks/use-cart-info";
import OffCanvas from "../../components/common/sidebar/off-canvas";
import Cart from "./component/cart";
import { FACULTIES } from "./menu-data";



const Header = ({
  header_style,
  no_top_bar,
  disable_full_width,
  disable_category,
}) => {
  const [faculties, setFaculties] = useState([]);
  useEffect(() => {
    loadFaculties();
  }, []);
  function loadFaculties() {
    setFaculties([...FACULTIES]);
  }

  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const wishlists = useSelector(wishlistItems);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className={`edu-header header-style-${
          header_style ? header_style : "1"
        } ${
          disable_full_width ? "disbale-header-fullwidth" : "header-fullwidth"
        } ${no_top_bar ? "no-topbar" : ""}`}
      >
        {!no_top_bar && (
          <div className="header-top-bar">
            <div className="container-fluid">
              <div className="header-top">
                <div className="header-top-left">
                  <HeaderTopLeft />
                </div>
                <div className="header-top-right">
                  <HeaderTopRight />
                </div>
              </div>
            </div>
          </div>
        )}
        <div id="edu-sticky-placeholder"></div>
        <div className={`header-mainmenu ${sticky ? "edu-sticky" : ""}`}>
          <div className="container-fluid">
            <div className="header-navbar">
              <div className="header-brand">
                <div className="logo">
                  <Link href={"/"}>
                    <a>
                      <img
                        className="logo-light"
                        src="/assets/images/logo/logoMain.png"
                        alt="logo"
                      />
                      <img
                        className="logo-dark"
                        src="/assets/images/logo/logoMain.png"
                        alt="logo"
                      />
                    </a>
                  </Link>
                </div>

                {!disable_category && (
                  <div className="header-category">
                    <nav className="mainmenu-nav">
                      <ul className="mainmenu">
                        <li className="has-droupdown">
                          <a href="#">
                            <i className="icon-1"></i>Category
                          </a>
                          <ul className="submenu">
                            {faculties.map((category, i) => (
                              <li key={i}>
                                <Link href={`/faculty-courses/${category.id}`}>
                                  <a>{category.name}</a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
              <div className="header-mainnav">
                <nav className="mainmenu-nav">
                  {/* main menu start */}
                  <MainMenu />
                  {/* main menu end */}
                </nav>
              </div>
              <div className="header-right">
                <ul className="header-action">
                  {/* <li className="header-btn">
                    <Link href="/sign-in">
                      <a className="edu-btn btn-medium">
                        Apply Now
                        <i className="icon-4"></i>
                      </a>
                    </Link>
                  </li> */}
                  <li className="mobile-menu-bar d-block d-xl-none">
                    <button
                      className="hamberger-button"
                      onClick={() => setIsOpen(true)}
                    >
                      <i className="icon-54"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Start Search Popup  --> */}
        <SearchPopup
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
        {/* <!-- End Search Popup  --> */}
      </header>

      {/* sidebar start */}
      <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* sidebar end */}
    </>
  );
};

export default Header;
