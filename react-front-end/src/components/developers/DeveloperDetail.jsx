import axios from "axios";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import ProjectListItem from "../projects/ProjectListItem";
import Certification from "../certifications/Certification";
import { Link, useParams } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import "./DeveloperDetail.css";

const DeveloperDetail = () => {
  const [state, setState] = useState({
    user: {},
    projects: [],
    certifications: [],
  });

  let url_id = useParams();

  const getUsers = axios.get("/api/users");
  const getProjects = axios.get("/api/projects");
  const getCertifications = axios.get("/api/certifications");

  const userDetails = (users, id) => {
    const singleUser = users.filter((user) => user.id === id);

    return singleUser[0];
  };

  const getProjectsByUser = (projects, id) => {
    const projectByUser = projects.filter((project) => project.owner_id === id);

    return projectByUser;
  };

  const getCertificationsByUser = (certifications, id) => {
    const certificates = certifications.filter(
      (certification) => certification.jobseeker_id === id
    );
    return certificates;
  };

  useEffect(() => {
    Promise.all([getUsers, getProjects, getCertifications]).then((response) => {
      console.log("response", response);
      setState((prev) => ({
        ...prev,
        user: userDetails(response[0].data, Number(url_id.id)),
        projects: getProjectsByUser(response[1].data, Number(url_id.id)),
        certifications: getCertificationsByUser(
          response[2].data,
          Number(url_id.id)
        ),
      }));
    });
  }, []);

  const mappedProjects = state.projects.map((project) => {
    return (
      <div className="projects-block">
        <ProjectListItem
          key={project.id}
          id={project.id}
          title={project.title}
          screenshot={project.screenshot}
          likes={project.likes}
        />
      </div>
    );
  });

  const mappedCertification = state.certifications.map((certification) => {
    return (
      <div className="certification-block">
        <Certification
          key={certification.id}
          title={certification.title}
          institution={certification.institution}
          city={certification.city}
          province={certification.province}
          startDate={certification.startDate}
          endDate={certification.endDate}
        />
      </div>
    );
  });

  return (
    <div className="developer-detail">
      <div className="profile-section">
        <Profile user={state.user} />
      </div>
      <div className="section-right">
        <div className="project-section">{mappedProjects}</div>
        <h5>Certifications</h5>
        <Link to={`certifications/new`}>
          <GoPlus />
        </Link>
        <div className="certification-section">{mappedCertification}</div>
      </div>
    </div>
  );
};

export default DeveloperDetail;
