const menu_data = [
  {
    title: "Home",
    link: "/",
    mega_menu: false,
  },

  {
    title: "Courses",
    link: "/courses",
    mega_menu: false,
  },
  {
    title: "Compare",
    link: "/compare",
    mega_menu: false,
  },
  {
    title: "Institutions",
    link: "/institutions",
    mega_menu: false,
  },
  {
    title: "About Us",
    link: "/about-us",
    mega_menu: false,
  },
  {
    title: "About Scotland",
    link: "/about-scotland",
    mega_menu: false,
  },
  {
    title: "Why Choose Us",
    link: "/why-choose-us",
    mega_menu: false,
  },
  {
    title: "Contact Us",
    link: "/contact-us",
    mega_menu: false,
  },
  {
    title: "Convert Currency",
    link: "/conversion",
    mega_menu: false,
  },
  {
    title: "Login",
    link: "/",
    mega_menu: false,
    submenus: [
      { title: "User Login", link: "/sign-in" },
      { title: "Agent Login", link: "/agent-sign-in" },
    ],
  },
];

export default menu_data;
export const email1 = "info@scotstudy.co.uk";
export const email2 = "admissions@scotstudy.co.uk";
export const phone1 = "+44(0)758-677-0652";
export const phone2 = "+44(0)758-677-0652";
export const default_course_img = "/assets/images/default_img.jpg";
export const phone3 = "+44(0)131-629-1290";
export const address =
  "Suite 1(First Floor), The Red Sandstone Office, 132 Leith Walk, Edinburgh, Scotland, EH6 5DT";
export const facebookUrl =
  "https://www.facebook.com/profile.php?id=100063705482193";
export const instagramUrl =
  "https://instagram.com/scotstudy_?igshid=MmJiY2I4NDBkZg==";
export const twitterUrl = "https://twitter.com/scotstudy?lang=en";
export const youtubeUrl = "https://www.youtube.com/@scot-study4479";
export const linkedInUrl = "https://www.linkedin.com/company/scot-study/";
export const RELATED_COURSES = "RELATED_COURSES";
export const CREATE_COURSE = "CREATE_COURSE";
export const REGISTER = "REGISTER";
export const IS_FOR_HIGHEST_QUALIFICATION = "IS_FOR_HIGHEST";
export const IS_FOR_PREVIOUS_QUALIFICATION = "IS_FOR_PREVIOUS";
export const LOGIN = "LOGIN_USER";
export const UPDATE_USER = "UPDATE_USER";
export const VALIDATION_TITLE = "Validation Error";
export const SUCCESS_TITLE = "Login Success";
export const ERROR_TITLE = "Submission Error";
export const GET_QUALIFICATION_YEAR = () => {
  const currentYear = new Date().getFullYear();
  const year = [];
  for (var i = 1940; currentYear >= i; i++) {
    year.push({
      key: i,
      text: i,
      value: i,
      id: i,
    });
  }
  year.push({
    key: "1",
    text: "Select Year",
    value: "",
    id: "",
  });
  return year.reverse();
};

export const DEGREE_TYPES = [
  { id: "ead37f16-9474-4c55-ab96-c798341d60f4", name: "Postgraduate" },
  { id: "1aad6011-8464-4c38-a84e-36442d64911c", name: "Undergraduate" },
];
export const FACULTIES = [
  {
    id: "250d2d75-7e69-49fa-8234-1cd565f57376",
    url: "assets/category/Business & Management-1.png",
    title: "6 Courses",
    name: "Business & Management",
    bgColor: "orange-bg",
  },
  {
    id: "36f19d62-ca16-4392-afc3-f6253d2da620",
    url: "assets/category/Engineering & Built Environment.png",
    title: "4 Courses",
    name: "Engineering & Built Environment",
    bgColor: "blue-bg",
  },
  {
    id: "3ef55fdd-6c8e-419f-9196-6053794b4095",
    url: "assets/category/Life Sciences & Health.png",
    title: "8 Courses",
    name: "Life Sciences & Health",
    bgColor: "pink-bg",
  },
  {
    id: "48478e98-42a6-4f08-9e49-8317870bfb44",
    url: "assets/category/Media & Design.png",
    title: "9 Courses",
    name: "Media & Design",
    bgColor: "green-bg",
  },
  {
    id: "4d9d1262-450a-4eb9-a6a4-cff838af42d1",
    url: "assets/category/Medicine & Surgery.png",
    title: "4 Courses",
    name: "Medicine & Surgery",
    bgColor: "blue-bg",
  },
  {
    id: "7fb12650-7615-4614-bbf2-797d885c7c40",
    url: "assets/category/Nursing.png",
    title: "8 Courses",
    name: "Nursing & Midwifery",
    bgColor: "pink-bg",
  },
  {
    id: "8d246951-4b16-44f6-8cfa-8bd736742825",
    url: "assets/category/Sciences & Computing.png",
    title: "9 Courses",
    name: "Sciences & Computing",
    bgColor: "green-bg",
  },
  {
    id: "a2059529-8766-4dd4-9bbb-dfa8f2540cc5",
    url: "assets/category/Social Sciences & Humanities.png",
    title: "4 Courses",
    name: "Social Sciences & Humanities",
    bgColor: "blue-bg",
  },
];
export const INSTITUTIONS = [
  {
    index: 0,
    city: "Dundee",
    id: "0171d165-959b-4647-8267-f426b6de165a",
    name: "University of Abertay Dundee",
    sellingPoint: `Abertay is right at the heart of Dundee, combining all the advantages of a close-knit campus with the buzz of city centre life. All of our buildings are within a quarter of a mile of each other, as are shops, bars, clubs, cinemas and theatres, and we’re just a few minutes' walk from the bus and train stations.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1567791607520_Uni Abertay Dundee logo.jpg",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/abertay.png",
  },
  {
    index: 1,
    city: "St. Andrews",
    id: "14022ef1-56d0-4742-a3d3-35e9cf7b6b04",
    name: "University of St. Andrews",
    sellingPoint: `Founded in the 15th century, St Andrews is Scotland's first university and the third oldest in the English speaking world. Teaching began in the community of St Andrews in 1410, and the University was formally constituted by the issue of a papal bull in 1413.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568111300611_St andrew logo NEW.jpg",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/andrew.png",
  },
  {
    index: 2,
    city: "Edinburgh",
    id: "1d03e8c8-54ad-4494-b74b-2372008d334a",
    name: "Queen Margaret University",
    sellingPoint: `Queen Margaret University was established as the Edinburgh School of Cookery in 1875. The main founders of the school were Christian Guthrie Wright and Louisa Stevenson (Louisa was sister of Flora Stevenson, the first female Chair of the Edinburgh School Board). These women were also largely responsible for leading the campaign to secure the admission of females to the University of Edinburgh`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1567705773710_Queen margaret uni logo.png",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/queen.png",
  },
  {
    index: 3,
    city: "Stirling",
    id: "445d5b0b-6b9d-4e1d-af32-a8ad4d91cc65",
    name: "University of Stirling ",
    sellingPoint: `Our history begins with a visionary who recognised that society was being transformed and it needed people skilled in navigating change. Lord Robbins, our first Chancellor, was an economist who changed the face of British higher education. He understood the importance of a skilled workforce to the future wealth and wellbeing of society.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1567792220773_Uni of stirling logo1.png",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/stirling.png",
  },
  {
    index: 4,
    city: "Highlands and Islands region of Scotland",
    id: "4b645b5f-aed7-4752-8f96-cf14914ce517",
    name: "University of the Highlands and Islands",
    sellingPoint: `The University of the Highlands and Islands is an integrated university encompassing both further and higher education. We are not a traditional university. We are different. We are part of a new breed of tertiary institutions, the only one in Scotland and one of only a few in Europe. Based in the Highlands and Islands of Scotland, our distinctive partnership of 13 independent colleges and research institutions is locally based and rooted in communities, but with national and international reach, as part of a regional university structure.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1567794112553_uni of the Highlands logo.jpg",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/highland.png",
  },
  {
    index: 5,
    city: "Aberdeen",
    id: "557fc39b-5901-4463-972f-3e6e3c111f36",
    name: "University of Aberdeen",
    sellingPoint: `Founded in 1495 by William Elphinstone, Bishop of Aberdeen and Chancellor of Scotland. The University of Aberdeen is Scotland's third oldest and the UK's fifth oldest university.

      William Elphinstone established King's College to train doctors, teachers and clergy for the communities of northern Scotland, and lawyers and administrators to serve the Scottish Crown. Much of the King's College still remains today, as do the traditions which the Bishop began.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1567791213096_Uni of aberdeen logo 2.png",
    banner:
      "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/uni_aberdeen.png",
  },
  {
    index: 6,
    id: "5a2355d3-c4a3-4ec2-aece-b5a0725964a9",
    city: "Edinburgh",
    name: "Edinburgh College",
    sellingPoint: `It was formed on 1 October 2012 as part of the merger of Edinburgh's Jewel and Esk, Telford, and Stevenson colleges. The college has four campuses, all of which were previously the campuses of the constituents of the merger: Jewel and Esk's College Milton Road (Jewel) Campus and Eskbank Campus (Now referred as "Edinburgh College, Milton Road Campus" and "Edinburgh College, Midlothian Campus"); Edinburgh Telford College (Now referred as Edinburgh College, Granton Campus); and Stevenson College Edinburgh (Now referred as Edinburgh College, Sighthill Campus)`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/edinburgh-college.jpg",
    banner:
      "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/edinburgh_college.png",
  },
  {
    index: 7,
    id: "5dcbbb7c-c1a4-4404-9887-6c18acb87ff5",
    city: "Edinburgh",
    name: "Edinburgh Napier University",
    sellingPoint: `Edinburgh Napier University is a public university located in the capital city of Scotland, Edinburgh. The institution was initially known as Napier Technical College and founded in 1964. The name ‘Napier’ was taken from 16th-century Scottish mathematician and philosopher John Napier who was the founder. John Napier was the inventor of logarithms and the decimal point, who was born in 1550 in the medieval tower house of Merchiston Castle (the site of the University's Merchiston campus).`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568112480888_Edinburgh Napier logo NEW.png",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/napier.png",
  },
  {
    index: 8,
    id: "8f69de01-c30c-4160-a804-51e92ea7936e",
    city: "Edinburgh",
    name: "University of Edinburgh",
    sellingPoint: `Founded in 1582, the University Of Edinburgh opened its doors to the world in 1583. Steeped in prestige and entangled with history, this esteemed institution is one of Scotland’s ancient universities and the sixth oldest university in the English-speaking world. Edinburgh University first begun as a college of law before expanding into a formally established college, under the Royal Charter of King James VI of Scotland on 14th April 1582.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1566504750195_download (3).jpg",
    banner:
      "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/uni_edinburgh.png",
  },
  {
    index: 9,
    city: "Paisley, Glasgow, Ayr, Dumfries",
    id: "a32b7926-8775-440d-973a-b79d6f7cf0d5",
    name: "University of the West of Scotland",
    sellingPoint: `Although classified as a new university, the University of the West of Scotland has a rich, diverse history inherited from the various institutions that preceded it, including the Paisley School of Art (1836–1897), University of Paisley, Bell College of Technology, Craigie College of Education and Dumfries and Galloway College of Nursing.

      At the time of the Industrial Revolution, Paisley was renowned for thread weaving. The Coats mill was run by two brothers, Peter and Thomas Coats. These men, children of the Scottish Enlightenment had liberal ideals and became noted philanthropists.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568107670089_UWS UNI LOGO.png",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/uws.png",
  },
  {
    index: 10,
    id: "c7f67d8b-b2f8-4f11-9fd9-fa870104c261",
    city: "Strathclyde",
    name: "University of Strathclyde",
    sellingPoint: `The university was founded in 1796 through the will of John Anderson, professor of Natural Philosophy at the University of Glasgow, who left instructions and the majority of his estate to create a second university in Glasgow to focus on "Useful Learning" – specialising in practical subjects – "for the good of mankind and the improvement of science, a place of useful learning". The University later named its city centre campus after him.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568105957633_strath uni logo 02.png",
    banner:
      "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/strathclyde.png",
  },
  {
    index: 11,
    id: "cd0b47a2-7c1a-40e9-88ed-ec7c72934035",
    city: "Dundee",
    name: "University of Dundee",
    sellingPoint: `On 1 August 1967, the University of Dundee came into formal existence by virtue of a Royal Charter. Those invested in the future of both UCD and the University of St Andrews had divergent views as to the best way to proceed, ranging from full incorporation to complete separation. The Royal Commission Report of 1952, chaired by Lord Tedder, aimed to resolve the differences. The commissioners believed there should be a single university with two colleges and that the Dundee college should incorporate the medical school.`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568111922585_University-of-Dundee-Logo NEW.jpg",
    banner:
      "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/uni_dundee.png",
  },
  {
    index: 12,
    id: "ce2c8633-147e-408d-9a72-dc7090f021a9",
    city: "Glasgow",
    name: "University of Glasgow",
    sellingPoint: `The University of Glasgow was founded in 1451 by a charter or papal bull from Pope Nicholas V, at the suggestion of King James II, giving Bishop William Turnbull, a graduate of the University of St Andrews, permission to add a university to the city's Cathedral. University of Glasgow is the second-oldest university in Scotland after St Andrews and the fourth-oldest in the English-speaking world. The universities of St Andrews, Glasgow and Aberdeen were ecclesiastical foundations, while Edinburgh was a civic foundation. `,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568110894714_university-of-glasgow-logo NEW.gif",
    banner:
      "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/uni_glasgow.png",
  },
  {
    index: 13,
    id: "e0efde4d-9619-44ac-be64-889a24d3ac0e",
    city: "Glasgow",
    name: "Glasgow Caledonian University",
    sellingPoint: `The University traces its origin from The Queen's College, Glasgow (founded 1875) and the Glasgow College of Technology (founded 1971). The Queen's College, which specialised in providing training in domestic science, received the Royal accolade of being named after Queen Elizabeth in its centenary celebrations in 1975. Queen Elizabeth was, herself, Patron of the College since 1944. `,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568105459137_Caledonia Uni logo.png",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/gcu.png",
  },
  {
    index: 14,
    id: "f50c7df5-48ee-4e4e-81aa-8d3ecd6b09a0",
    city: "Edinburgh",
    name: "Heriot-Watt University",
    sellingPoint: `We are proud that since our foundation in 1821, we have been outward looking pioneers of education, in pursuit of knowledge to the benefit of society and the world. Read the story of Heriot-Watt University`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568110442801_Heriot-Watt-University-Logo.png",
    banner: "https://scotsudy2.s3.eu-west-2.amazonaws.com/1621898780837.jpg",
  },
  {
    index: 15,
    id: "f932b8c6-8daa-4770-887f-4368bfdbdc54",
    city: "Aberdeen",
    name: "Robert Gordon University",
    sellingPoint: `The university derives from Robert Gordon's Hospital, an institution set up in the mid-18th century to provide the poor with a basic education and reasonable start in life, and the various educational institutions which developed in Aberdeen to provide adults with technical, vocational and artistic training, mostly in the evenings and part-time. Following numerous mergers between these establishments`,
    logo: "https://scotsudy.s3.eu-west-2.amazonaws.com/logo_1568109290620_RGU lojo.jpg",
    banner:
      "https://scotsudy2.s3.eu-west-2.amazonaws.com/school/robert_gordon.png",
  },
];
