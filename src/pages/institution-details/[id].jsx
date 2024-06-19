import { useRouter } from "next/router";
import React from "react";
import SEO from "../../components/seo";
import { blog_data } from "../../data";
import { Wrapper } from "../../layout";
import { useEffect, useState } from "react";

import axios from "axios";
import BlogDetailsMain from "../../components/blog-details";
import { GLOBAL_URL } from "../../utils/global";

const DynamicBlogDetails = () => {
  const [institution, setInstitution] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.post(`${GLOBAL_URL}findInstitutionById`, { id }).then((response) => {
      setInstitution(response.data.data);
    });
  }, [id]);
  return (
    <Wrapper>
      <SEO pageTitle={institution?.name} />
      <BlogDetailsMain institution={institution} />
    </Wrapper>
  );
};

export default DynamicBlogDetails;

// export async function getStaticPaths() {
//   const paths = blog_data.map((blog) => {
//     return {
//       params: {
//         id: `${blog.id}`,
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   return {
//     props: {},
//   };
// }
