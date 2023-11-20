import React, { useEffect, useState } from 'react';
import style from "../../../assets/style/job/jobCard.module.scss";
import Alert from "../alert/Alert";
import { Link } from 'react-router-dom';
import Share from "../../../Utils/Share";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useFetch from "../../../hooks/useFetch";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from "react-i18next";

function JobCard({ jobData, isMyPost, baseUrl, urlId, page }) {
  const [t, i18n] = useTranslation();

  const [send, setSend] = useState(false);
  const [count, setCount] = useState(4);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [isFav, setIsFav] = useState(jobData?.save_job);
  const token = localStorage.getItem("arab_user_token")
  const [showShareModal, setShowShareModal] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;

  let formData = new FormData();
  formData.append('id', jobData.id);
  const [Res] = useFetch('favorite/job', formData, send);
  let favoriteIcon = isFav ? 'fas fa-bookmark' : 'far fa-bookmark';

  const handleClick = () => {
    setShowShareModal(true);
  };
  useEffect(() => {
    if (jobData.saved) {
      setIsFav(true);
    }
    else {
      setIsFav(false);
    }
  }, [jobData.saved])

  const addToFavorite = (id) => {
    if (token) {
      setIsFav(!isFav);
      setSend(true);
      deleteDiv(id)
      setTimeout(() => {
        setSend(false);
      }, 100);
    } else {
      setShowAlert(true);
      setCount(4);
    }
  }
  const deleteDiv = (id) => {
    const element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
  }
  const deletePostJob = async (id) => {
    let url = `user/jobs/delete/${id}`;
    let backend_url = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0/${url}`
    const token = localStorage.getItem('arab_user_token')
    await axios.delete(backend_url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) =>{
      deleteDiv(id)
    }).catch((err) => console.log("errorJobCard",err));
  }
  return (
    <>
      <div className={style.card} id={jobData.id}>
        <div className={style.cardTop}>
          {pathName === "/my-job" ? <button onClick={()=>deletePostJob(jobData?.id)} className={style.deletePostJob}>delete</button> : ''}
          <Link to={`/show-job/${jobData.slug}/${jobData?.id}`} state={(urlId = { id: jobData?.id })}>
            <LazyLoadImage src={jobData.company_image ? jobData.company_image : jobData.user_image} alt='scs' />
          </Link>
          <div className={style.iconsCard}>
            <i className={`fas fa-share-square ${style.favIconColor}`} onClick={() => handleClick()}></i>
            {!jobData.is_user_post ? <i className={`${favoriteIcon} ${style.favIconColor}`} onClick={() => addToFavorite(jobData.id)}></i> : <></>}
          </div>
        </div>
        <Link to={`/show-job/${jobData.slug}/${jobData?.id}`} state={(urlId = { id: jobData?.id })}>
          <div className={style.cardBottom}>
            <div className={style.textTitle}>
              <h3 >{jobData.title}</h3>
              <p><i className="fas fa-map-marker-alt"></i>{jobData.place}</p>
            </div>
            <div className={pathName === "/saved-job" || pathName === '/jobs' ? style.parCardPublished : style.parCard}>
              <h3>{jobData.looking_for_text}</h3>
              <p>{jobData.description}</p>
            </div>
            <div className={style.timeCard}>
              <p>{jobData.type}</p>
              {pathName === "/saved-job" || pathName === "/jobs" ? <></> : <div>
                {jobData.status ? <p className='publishingClass'>Published</p> : <p className='publishingClass'>Waiting for approval</p>}
              </div>}
            </div>
            <div className={style.boxandPublished}>
              <div className={style.boxsCard}>
                <div className={style.box1}></div>
                <div className={style.box2}></div>
                <div className={style.box3}></div>
                <div className={style.box4}></div>
              </div>
              <p>{jobData.created_at}</p>

            </div>

          </div>
        </Link>
      </div>
      {showAlert && (<Alert type='warning' message='Please login first.' showAlert={showAlert} setShowAlert={setShowAlert} count={count} setCount={setCount} />)}
      {showAlertDelete && (<Alert type='success' message='Your post deleted successfully.' showAlert={showAlertDelete} setShowAlert={setShowAlertDelete} count={count} setCount={setCount} />)}
      {showShareModal && <Share url={`/job/${jobData.id}`} setShowShareModal={setShowShareModal} />}

    </>

  )
}

export default JobCard