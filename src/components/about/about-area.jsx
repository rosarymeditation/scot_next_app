import React from "react";
import { instructors_data } from "../../data";
import Time from "../../utils/time";
import TeamOne from "../team-member/team-one";
import {
  FOR_ABOUT_SCOTLAND,
  FOR_ABOUT_US,
  FOR_WHY_CHOOSE_US,
} from "../../utils/global";

const AboutArea = ({ event, type }) => {
  return (
    <>
      {type == FOR_ABOUT_US && (
        <section className="event-details-area edu-section-gap">
          <div className="container">
            <div className="event-details">
              <div className="main-thumbnail">
                <img
                  style={{ objectFit: "contain" }}
                  src="/assets/images/about/about_us.png"
                  alt="Study in Scotland"
                />
              </div>
              <div className="row row--30">
                <div className="col-lg-12">
                  <div className="details-content">
                    <h3>About Us</h3>
                    <p>
                      Scot-Study is an innovative business venture set-up to
                      help international students with intentions of studying
                      and living in Scotland achieve their dreams through a
                      seamless-technological process. We are committed to
                      helping international students choose perfect courses to
                      suit their careers, as well as providing a range of top
                      ranked academic institutions in Scotland to put them on a
                      right path. We are associated with the best universities
                      in Scotland to help secure admission easily and monitor
                      your enrolment process through our seamless technology.
                    </p>
                    <p>
                      Scot-Study is a Mobile app designed to provide you with
                      relevant information about Scotland High Education (HE)
                      and to give you the platform to apply to any Scottish
                      institutions of your choice, monitor your application
                      while waiting for decisions, step-by-step enrolment
                      progression, and pre-departure briefing from your mobile
                      phones at your convenience without any charges.
                    </p>
                    <p>
                      With the privilege of having access to join our
                      international students network across all institutions in
                      Scotland, we can guarantee home-away-from-home experience
                      throughout your study in Scottish territories. Moreover,
                      combining our professional experience of over a decade in
                      recruitment and counselling, with our seamless Mobile app
                      for recruitment- we can guarantee smooth process and
                      experience towards your enrolment. In addition, our staff
                      are committed to helping students throughout their student
                      journey.
                    </p>
                    <p>
                      We also arrange tours to Scotland territories for tourists
                      from West Africa for summer, events and during festive
                      seasons. This is prepared to help tourists experience and
                      understand Scottish cultures, heritage, history and
                      environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {type == FOR_ABOUT_SCOTLAND && (
        <section className="event-details-area edu-section-gap">
          <div className="container">
            <div className="event-details">
              <div className="main-thumbnail">
                <img
                  style={{ width: "100%", height: 400, objectFit: "cover" }}
                  src="/assets/images/about/about_scot.jpeg"
                  alt="About Scotland"
                />
              </div>
              <div className="row row--30">
                <div className="col-lg-12">
                  <div className="details-content">
                    <h3>About Scotland</h3>
                    <p>
                      Ancient Scotland was made up of four separate groups:
                      Angles, Britons, Picts and Gaels (also known as Scoti). In
                      1967, the drilling of the first North Sea oil well was
                      considered a major industrial achievement of the time,
                      creating a huge supporting industry in Scotland and giving
                      the whole of UK access to oil made at home for the first
                      time. Moreover, films like Braveheart and Trainspotting
                      helped to establish Scotland as a cultural powerhouse; for
                      example, J.K. Rowling wrote the global phenomenon ‘Harry
                      Potter’ in Edinburgh. The scientists that successfully
                      cloned the first mammal from an adult cell, Dolly the
                      Sheep were from the Scotland. John Napier was the inventor
                      of logarithms and the decimal point, to mention few
                      prominent from Scotland.
                    </p>
                    <p>
                      Scotland is a country located up north of United Kingdom.
                      Scotland comprises of seven cities; Aberdeen, Dundee,
                      Edinburgh (the capital), Glasgow, Inverness, Perth and
                      Stirling. Its nature is impressive, the history rich and
                      many other aspects of Scottish life are quite fascinating
                      and unique. Living in Scotland will give you the
                      opportunities to find some more practical information such
                      as facts about Scotland, culture and politics, whisky
                      production and distilleries (well known for that), our
                      dynamic weather, webcams in Scotland and many other
                      aspects about daily life in Scotland which you will find
                      both interesting and handy.
                    </p>
                    <p>
                      Visiting one of the seven cities in Scotland should really
                      be part of everyone’s itinerary when holidaying here.
                      There is a wealth of culture, historic buildings,
                      beautiful squares, castles, museums, restaurants and other
                      fascinating attractions to be found in all of our cities.
                      Edinburgh might top the charts if we talk visitor numbers
                      but Glasgow, Stirling and the others all played their own
                      significant role in history, have their own unique
                      identities and they all have many attractions on offer.
                    </p>
                    <p>
                      The Scottish education system is distinctly different from
                      those in the other countries of the United Kingdom. In
                      2014, research by the Office for National Statistics found
                      that Scotland was the most highly educated country in
                      Europe and among the most well-educated in the world in
                      terms of tertiary education attainment. Qualifications at
                      the secondary school and post-secondary (further
                      education) level are provided by the Scottish
                      Qualifications Authority, which is the national awarding
                      and accrediting body in Scotland. Post study permit
                      (Scottish Talent Hunt) was initiated in Scotland with the
                      aim of allowing international students to stay back after
                      studies in order to develop their skills and knowledge,
                      before it was expanded to other parts of the United
                      Kingdom and was later scrapped off.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {type == FOR_WHY_CHOOSE_US && (
        <section className="event-details-area edu-section-gap">
          <div className="container">
            <div className="event-details">
              <div className="main-thumbnail">
                <img
                  style={{ width: "100%", height: 400, objectFit: "cover" }}
                  src="/assets/images/about/why_choose_us.png"
                  alt="Why Choose Us"
                />
              </div>
              <div className="row row--30">
                <div className="col-lg-12">
                  <div className="details-content">
                    <h3>Why Choose Us</h3>
                    <p>
                      Our business directors and staff are alumni of prestigious
                      universities in Scotland. Therefore, our services are
                      embedded in Scottish educational system, culture and
                      heritage as well as working closely with all Scottish
                      institutions in order to make sure international students
                      feel warmly accepted into Scottish environment. Our Mobile
                      app is designed through our first-hand experience in
                      providing solutions to international students’ concerns in
                      terms of application for admission, acceptance, visa
                      application, pre-departure as well as enrolment.
                    </p>
                    <p>
                      We understand the challenges international students faced
                      in settling down in a new environment and the feel of
                      loneliness when away from home, and that is why we are
                      providing ‘everything’ necessary for students to settle-in
                      into the new life in Scotland with ease and without any
                      charges. We are determined to create an easy and awesome
                      experience for our the international students from start
                      to finish. Our Mobile app will help students experience a
                      seamless journey from applying from their various homes to
                      beginning a new life in Scotland just by the touch of a
                      button.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutArea;
