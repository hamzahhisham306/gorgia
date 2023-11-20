import React from 'react';
import style from '../../../../assets/style/marketPlace/productFilter.module.css'
import useAxios from '../../../../hooks/useAxiosGet';
import { useTranslation } from "react-i18next";
import DropDownSearch from './DropDownSearch';

function ProductFilter({filterChange, filters}) {
    const [t, i18n] = useTranslation();
    const categoryId = localStorage.getItem('mainCategoryId') ? localStorage.getItem('mainCategoryId') : '';
    const subCategoryId = localStorage.getItem('subCategoryId') ? localStorage.getItem('subCategoryId') : '';
    const categoryTitle = localStorage.getItem('mainCategoryTitle') ? localStorage.getItem('mainCategoryTitle') : '';
    let url = `filter-market/all?main_id=${categoryId}&sub_id=${subCategoryId}`;
    const [Data] = useAxios(url); 
    console.log("Data>>>",Data?.data)
  return (
    <>
     <div className={style.mainFilterDiv}>

        <h1 className={style.filterTitle}>{categoryTitle}</h1>
            
            {
            Data?.data?.map((item, index) => (
                <div key={index} className={style.productDiv}>

                    <DropDownSearch index={index} title={item.title} id = {item.id} subData= {item.subtitle} filterChange = {filterChange} name = {item.name} nameTo = {item.name_to} fields_num = {item.fields_num} filter_type = {item.type} filters = {filters} />

                    {/* <Accordion index={index} title={item.name} id = {item.id} subData= {item.categories} filerAction = {filerActionCategory} categoryState = {categoryState} setCategoryState = {setCategoryState} filterType = {filterType} /> */} 
                </div>
                ))
            }


        </div>
    </>
  )
}

export default ProductFilter