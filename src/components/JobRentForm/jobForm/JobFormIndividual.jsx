import Select from "react-select";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "../../../assets/style/formStyle/jobForm.module.scss";
import Alert from "../../customAlert/Alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const JobForm = ({ setJobFormOpen, baseUrl, jobPageData }) => {
  const [t, i18n] = useTranslation();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState();
  
  const token = localStorage.getItem("arab_user_token");
  const navigate = useNavigate();

  const [jobFormData, setJobFormData] = useState({
    title: "",
    anonymous: "false",
    description: "",
    salary: "",
    salary_type: "",
    type: "",
    company: "",
    email: "",
    phone: "",
    place: "",
    short_desc: "",
    experience_level: "",
  });

  const options = jobPageData?.cities?.map((item) => ({
    value: item?.city,
    label: item?.city,
    name: "place",
  }));

  const typeOptions = jobPageData?.job_type?.map((item) => ({
    value: item?.value,
    label: item?.name,
    name: "type",
  }));

  const experienceOptions = jobPageData?.experience_level?.map((item) => ({
    value: item?.value,
    label: item?.name,
    name: "experience_level",
  }));

  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showTitleWarn, setShowTitleWarn] = useState(false);
  const [showLocationWarn, setShowLocationWarn] = useState(false);
  const [showTypeWarn, setShowTypeWarn] = useState(false);
  const [descriptionWarning, setDescriptionWarning] = useState(false);

  const formData = new FormData();
  jobFormData.title && formData.append("title", jobFormData?.title);
  jobFormData.anonymous && formData.append("anonymous", jobFormData?.anonymous);
  jobFormData.description &&
    formData.append("description", jobFormData?.description);
  jobFormData.salary && formData.append("salary", jobFormData?.salary);
  jobFormData.salary_type &&
    formData.append("salary_type", jobFormData?.salary_type);
  jobFormData.type && formData.append("type", jobFormData?.type);
  jobFormData.company && formData.append("company", jobFormData?.company);
  jobFormData.email && formData.append("email", jobFormData?.email);
  jobFormData.phone && formData.append("phone", jobFormData?.phone);
  jobFormData.place && formData.append("place", jobFormData?.place);
  formData.append("looking", 1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobFormData({ ...jobFormData, [name]: value });
    if (name === "place" && value !== "") {
      setShowLocationWarn(false);
    }
    if (name === "type" && value !== "") {
      setShowTypeWarn(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowTitleWarn(false);
    setShowLocationWarn(false);
    setShowTypeWarn(false);
    setDescriptionWarning(false);
    if (
      jobFormData.title === "" ||
      jobFormData.place === "" ||
      jobFormData.type === "" ||
      (jobFormData.phone === "" && jobFormData.email === "")
    ) {
      if (jobFormData.title === "") {
        setShowTitleWarn(true);
      }
      if (jobFormData.place === "") {
        setShowLocationWarn(true);
      }
      if (jobFormData.type === "") {
        setShowTypeWarn(true);
      }
      if (jobFormData.description === "") {
        setDescriptionWarning(true);
      }
      if (jobFormData.phone === "" && jobFormData.email === "") {
        setWarning(true);
        setShow(true);
        setCount(4);
      }
    } else {
      try {
        fetch(`${baseUrl}/jobs/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.log(error);
      }
      //commented to avoid re renders

      setJobFormData({});
      setShow(true);
      setSuccess(true);
      setCount(4);
      setTimeout(() => {
        navigate("/my-job")
      }, 3000);
    }
  };

  const anonymousClick = () => {
    if (jobFormData.anonymous === "false" || jobFormData.anonymous !== "true") {
      setJobFormData({ ...jobFormData, anonymous: "true" });
    } else {
      setJobFormData({ ...jobFormData, anonymous: "false" });
    }
  };
  // const [filters, setFilters] = useState({
  //   place: "",
  //   type: "",
  //   salary_type:""
  // });

  const filterChange = (event, type) => {
    const { name, value } = event;
    setJobFormData({ ...jobFormData, [name]: value });
  };

  return (
    <div>
      <h2 className={style.jobFormTitle}>Post as Individual </h2>
      <div className={style.jobContact}>
      <form className={style.formDiv}>
        <div className={style.inputDiv}>
          <label> {t("Job Title")}</label>
          <input
            name="title"
            type="text"
            id="title"
            placeholder={t("Job Title")}
            required
            onChange={handleChange}
            onKeyUp={() => setShowTitleWarn(false)}
            value={jobFormData.title}
            className={style.inputForm}
          />
        </div>
        {showTitleWarn && (
          <p className={style.contactValidation}>{t("Title is required")}</p>
        )}

        <div
          className={
            i18n.language === "ar"
              ? `${style.singleSelectDivAr} ${style.inputDiv} postSelectForm`
              : `${style.singleSelectDiv} ${style.inputDiv} postSelectForm`
          }
        >
          <label>{t("Experience Level")}</label>
          <Select
            options={experienceOptions}
            // value={jobFormData?.place}
            // onChange={filterChange}
            onChange={filterChange}
            isSearchable={true}
            placeholder={t("Select...")}
          />
        </div>

        <div className={style.selectSearchDiv}>
          <div
            className={
              i18n.language === "ar"
                ? `${style.selectDivAr} ${style.inputDiv} postSelectForm`
                : `${style.selectDiv} ${style.inputDiv} postSelectForm`
            }
          >
            <label>{t("City")}</label>
            <Select
              options={options}
              // value={jobFormData?.place}
              // onChange={filterChange}
              onChange={filterChange}
              isSearchable={true}
              placeholder={t("Select...")}
            />
            {showLocationWarn && (
              <p className={style.contactValidation}>{t("City is required")}</p>
            )}
          </div>
          <div
            className={
              i18n.language === "ar"
                ? `${style.selectDivAr} ${style.inputDiv} postSelectForm`
                : `${style.selectDiv} ${style.inputDiv} postSelectForm`
            }
          >
            <label>{t("Job Type")}</label>
            <Select
              options={typeOptions}
              onChange={filterChange}
              isSearchable={true}
              placeholder={t("Select...")}
            />
            {showTypeWarn && (
              <p className={style.contactValidation}>
                {t("Job Type is required")}
              </p>
            )}
          </div>
        </div>

        <div
          className={
            i18n.language === "en"
              ? style.selectOptionDiv
              : style.selectOptionDivAr
          }
        >
          <input
            type="text"
            id="salary"
            name="salary"
            onChange={handleChange}
            value={jobFormData.salary}
            placeholder={t("Salary")}
            className={style.firstInput}
          ></input>

          <select
            name="salary_type"
            id="salary_type"
            // className={style.fieldWidth}
            onChange={handleChange}
          >
            <option value="">{t("Salary Type")}</option>
            {jobPageData?.type_salary?.map((salaryType) => (
              <option key={salaryType.value} value={salaryType.value}>
                {salaryType.name}
              </option>
            ))}

            {/* <option value="d">{t("Day")}</option>
            <option value="w">{t("Week")}</option>
            <option value="m">{t("Month")}</option> */}
          </select>

        </div>

        <div className={style.inputDiv}>
          <label>{t("Phone Number")}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            placeholder={t("Phone number")}
            value={jobFormData.phone}
          />
        </div>

        <div className={style.inputDiv}>
          <label> {t("Email")} </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={jobFormData.email}
            placeholder={t("Email Address")}
          />
        </div>

        <div className={style.inputDiv}>
          <label>{t("Short Description")} </label>
          <input
            type="text"
            id="short_desc"
            name="short_desc"
            onChange={handleChange}
            value={jobFormData.short_desc}
            placeholder={t("Short Description")}
          />
        </div>

        <div className={style.txtAreaDiv}>
          {/* <label>{t("Description")}</label> */}
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={jobFormData.description}
            placeholder={t("Description")}
          ></textarea>
        </div>
        {descriptionWarning && (
          <p className={style.contactValidation}>
            {t("Description is required")}
          </p>
        )}
        <div className={style.checkboxDiv}>
          <input
            id="remember"
            name="anonymous"
            type="checkbox"
            className={`col-1`}
            onClick={anonymousClick}
          />
          <label htmlFor="remember" className={`col-11`}>
            {t("Anonymous post")}
          </label>
        </div>
        {success ? (
          <Alert
            type="success"
            message={t("Your post published successfully")}
            show={show}
            setShow={setShow}
            time="4000"
            count={count}
            setCount={setCount}
          />
        ) : (
          <Alert
            type="warning"
            message={t("Please fill phone number or email address")}
            show={show}
            setShow={setShow}
            time="4000"
            count={count}
            setCount={setCount}
          />
        )}
      </form>
      <div className={i18n.language==='en'?style.helpDiv:style.helpDivAr}>
        <h3 className={style.h3Help}>{t("Do You Need Any Help! Contact Us")}</h3>
        <Link to='/Contact'><button className={style.buttonHelp}>{t("Contact Us")}</button></Link>
      </div>
      </div>
      <div className={style.submitButton}>
        <button type="submit" onClick={handleSubmit}>
          {t("Post a Job")}
        </button>
      </div>
    </div>
  );
};

export default JobForm;
