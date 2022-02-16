import React, { useState } from "react";
import { Link } from "react-router-dom";
import tech_stack from "./TechStacks";
import axios from "axios";

const CreateStudentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const [resume, setResume] = useState("");
  const [checkedState, setCheckedState] = useState(
    new Array(tech_stack.length).fill(false)
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setNumber("");
    setPassword("");
    setConfirmPassword("");
    setDesignation("");
    setAbout("");
    setCity("");
    setProvince("");
    setGithubUrl("");
    setLinkedinUrl("");
    setAvatar("");
    setResume("");
    setCheckedState(new Array(tech_stack.length).fill(false));
    setTimeout(() => setSubmitted(false), 5000);
  };

  const validate = () => {
    if (firstName === "") {
      setError("First name cannot be blank");
      return;
    }
    if (lastName === "") {
      setError("Last name cannot be blank");
      return;
    }
    if (email === "") {
      setError("Email cannot be blank");
      return;
    }
    if (number === "") {
      setError("Number cannot be blank");
      return;
    }
    if (password === "") {
      setError("Password cannot be blank");
      return;
    }
    if (confirmPassword === "") {
      setError("Confirm password cannot be blank");
      return;
    }
    if (confirmPassword !== password) {
      setError("Confirm password and password inputs are different");
      return;
    }
    if (designation === "") {
      setError("Designation cannot be blank");
      return;
    }
    if (about === "") {
      setError("About cannot be blank");
      return;
    }
    if (city === "") {
      setError("City cannot be blank");
      return;
    }
    if (province === "") {
      setError("Province cannot be blank");
      return;
    }
    if (githubUrl === "") {
      setError("Github URL cannot be blank");
      return;
    }
    if (linkedinUrl === "") {
      setError("LinkedIn URL cannot be blank");
      return;
    }
    if (avatar === "") {
      setError("Avatar cannot be blank");
      return;
    }
    if (resume === "") {
      setError("Resume cannot be blank");
      return;
    }
    if (!checkedState.includes(true)) {
      setError("Make sure you to fill in your skills!");
      return;
    }
    setError("");
    onSubmitHandler();
  };

  const onChangeHandler = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const onSubmitHandler = () => {
    const stack = [];
    checkedState.forEach((item, index) => {
      if (item) {
        stack.push(tech_stack[index].name);
      }
    });
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      number,
      password,
      designation,
      about,
      city,
      province,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      resume,
      avatar,
      employer: false,
      skills: stack.toString(),
    };
    console.log(data);
    axios
      .post("http://localhost:8080/api/users", data)
      .then((response) => {
        setSubmitted(response.data);
        reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h3 className="text-center">Create Profile</h3>
      {submitted ? <p className="text-center">{submitted}</p> : ""}
      {error ? <p className="text-center">{error}</p> : ""}
      <form className="w-50 mx-auto" onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex flex-column">
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            name="designation"
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
          />
          <textarea
            name="about"
            rows="5"
            cols="33"
            placeholder="About me..."
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <input
            type="text"
            placeholder="Province"
            name="province"
            value={province}
            onChange={(event) => setProvince(event.target.value)}
          />
          <input
            type="text"
            placeholder="Github"
            name="github_url"
            value={githubUrl}
            onChange={(event) => setGithubUrl(event.target.value)}
          />
          <input
            type="text"
            placeholder="Linkedin"
            name="linkedin_url"
            value={linkedinUrl}
            onChange={(event) => setLinkedinUrl(event.target.value)}
          />
          {/* COME BACK TO THIS BELOW  */}
          <input
            type="text"
            placeholder="Choose Avatar"
            name="avatar"
            value={avatar}
            onChange={(event) => setAvatar(event.target.value)}
          />
          <input
            type="text"
            placeholder="Upload Resume"
            name="resume"
            value={resume}
            onChange={(event) => setResume(event.target.value)}
          />
        </div>
        <div className="d-flex flex-column">
          <h4>Add Skills</h4>

          {tech_stack.map(({ name }, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  name={name}
                  value={name}
                  id={name}
                  checked={checkedState[index]}
                  onChange={() => onChangeHandler(index)}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            );
          })}
        </div>
        <button onClick={validate}>Save</button>
        <Link to={"/"}>
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateStudentForm;