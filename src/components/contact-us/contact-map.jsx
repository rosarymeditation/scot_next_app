import React from "react";

const ContactMap = () => {
  return (
    <div className="google-map-area">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            id="gmap_canvas"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Suite%201%20(First%20Floor),%20The%20Red%20Sandstone%20Office,%20132%20Leith%20Walk,%20Edinburgh,%20Scotland,%20EH6%205DT+(Scot-Study)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
