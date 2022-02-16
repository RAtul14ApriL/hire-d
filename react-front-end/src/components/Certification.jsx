import React from "react";
import { FaUserGraduate } from "react-icons/fa";
const Certification = (props) => {
  const { title, institution, startDate, endDate, province, city } = props;
  return (
    <div className="card text-dark bg-light mb-3">
      <div>
        <FaUserGraduate classname="bs-icon" />
      </div>
      <div>{title}</div>
      <div>{institution}</div>
      <div>
        {city}, {province}
      </div>
      <div>
        {startDate} - {endDate}
      </div>
    </div>
  );
};

export default Certification;
