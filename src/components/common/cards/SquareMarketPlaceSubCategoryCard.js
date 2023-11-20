import React from "react";
import style from "../../../assets/style/common/marketPlaceCard.module.css";
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../../redux/CategoryRedux';
import { setSubCategoryId } from '../../../redux/CategoryRedux';
import { setCategoryTitle } from '../../../redux/CategoryRedux';
import { setSubCategoryTitle } from '../../../redux/CategoryRedux';
import {useNavigate} from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function SquareMarketPlaceSubCategoryCard({data}) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const Navigate = (main_id, main_category, id, name) => {
        dispatch(setCategoryId(id));
        dispatch(setSubCategoryId(''));
        dispatch(setCategoryTitle(name));
        dispatch(setSubCategoryTitle(''));
        localStorage.setItem('mainCategoryId', main_id);
        localStorage.setItem('subCategoryId', id);
        localStorage.setItem('mainCategoryTitle', main_category);
        localStorage.setItem('subCategoryTitle', name);
        navigate('/market-place/products');
    }

  return (
    <>
      <div className={style.mainCircleDiv}>
        <div onClick={() => Navigate(data.main_id, data.main_category, data.id, data.name)} className={style.cardBody}>
          <LazyLoadImage
            className={style.listImg}
            src={`${data.image}`}
            alt={`list ${data.name}`}
          />
          <h3 className={style.cardListTitle}>{data.name}</h3>
        </div>
      </div>
    </>
  );
}

export default SquareMarketPlaceSubCategoryCard;
