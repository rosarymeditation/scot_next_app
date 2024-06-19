import Head from "next/head";

const SEO = ({ pageTitle, font }) => (
  <Head>
    <title>{pageTitle && `${pageTitle} || ScotStudy`}</title>
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta
      name="description"
      content="Your Gateway to Scottish Universities. Discover a world of educational opportunities in Scotland. Explore prestigious universities, find the perfect courses, and simplify your enrollment process. Trust Scotstudy to help you achieve your academic dreams in Scotland"
    />
    <meta name="robots" content="noindex, follow" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    {font && <link href={font} rel="stylesheet" />}
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default SEO;
