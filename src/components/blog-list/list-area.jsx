import Link from "next/link";
import React from "react";
import { blog_data } from "../../data";
import PaginationTwo from "../../ui/paginatio-2";
import BlogSidebar from "../blog/blog-sidebar";

//const blog_items = blog_data.filter((blog) => blog.blog_list);

const ListArea = ({ institutions }) => {
  return (
    <section className="section-gap-equal">
      {institutions.length > 0 && (
        <div className="container">
          <div className="row row--30">
            <div className="col-lg-12">
              {institutions.map((item) => (
                <div key={item.id} className="edu-blog blog-style-list">
                  <div className="">
                    <div className="thumbnail">
                      <Link href={`/institution-details/${item.id}`}>
                        <a>
                          <img src={item.banner} alt="Blog Images" />
                        </a>
                      </Link>
                    </div>
                    <br />
                    <div className="content">
                      <h5 className="name">
                        <Link href={`/institution-details/${item.id}`}>
                          <a>{item.name}</a>
                        </Link>
                      </h5>
                      <ul className="blog-meta">
                        {/* <li>
                          <i className="icon-27"></i>
                          {"date"}
                        </li> */}
                        <li>
                          <i className="icon-40"></i> {item.city}
                        </li>
                      </ul>
                      <p>{item.sellingPoint}</p>
                      <br />
                      <div class="d-flex flex-wrap justify-content-start">
                        <Link href={`/institution-details/${item.id}`}>
                          <a className="edu-btn btn-border btn-medium me-2 mb-2">
                            Postgraduate <i className="icon-34"></i>
                          </a>
                        </Link>
                        <Link href={`/institution-details/${item.id}`}>
                          <a className="edu-btn btn-border btn-medium me-2 mb-2">
                            Undergraduate <i className="icon-34"></i>
                          </a>
                        </Link>
                        <Link href={`/institution-details/${item.id}`}>
                          <a className="edu-btn btn-border btn-medium me-2 mb-2">
                            Research <i className="icon-34"></i>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <ul className="edu-pagination top-space-30 justify-content-start">
                {/* pagination start */}
                {/* <PaginationTwo /> */}
                {/* pagination end */}
              </ul>
            </div>

            {/* <div className="col-lg-4">
              <BlogSidebar />
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default ListArea;
