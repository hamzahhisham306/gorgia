import React from 'react';
import Menu from '../components/common/UserProfileMenu';
import SavedSection from '../components/userProfile/SavedSection';
import useAxios from "../hooks/useAxiosGet";
import style from '../assets/style/userProfile/userProfile.module.scss'

function SavedStorePage() {

  const url = `profile/favorite`;
  const [Data] = useAxios(url);
  const savedData = Data?.data;
  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='1' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <SavedSection savedData = {savedData} type='store' />
      </div>

    </div>
  )
}

export default SavedStorePage