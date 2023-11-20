import React, { useState, useEffect } from "react";
import filterStyle from "../assets/style/common/filteredPage.module.css";
import useAxios from "../hooks/useAxiosGet";
import ProductsSection from "../components/marketPlace/MarketPlaceProductSection";
import Pagination from "../components/common/Pagination";
import AdvBanner from "../components/common/banner/Banner";
import { useTranslation } from "react-i18next";
import CategoryNav from "../components/common/marketPlace/marketNav/CategoryNav";
import ProductFilter from "../components/common/marketPlace/marketProductFilter/ProductFilter";
import HeroMobileButtons from "../components/common/marketPlace/HeroMobileButtons/HeroMobileButtons";

function CategoryPage() {
  const [t] = useTranslation();
  const token = localStorage.getItem('arab_user_token');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const nextPage = () => {
    if (total / limit > activeIndex + 1) {
      setPage(page + 1);
      setActiveIndex(activeIndex + 1);
    }
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const categoryId = localStorage.getItem("mainCategoryId")
    ? localStorage.getItem("mainCategoryId")
    : "";
  const subCategoryId = localStorage.getItem("subCategoryId")
    ? localStorage.getItem("subCategoryId")
    : "";
  const categoryTitle = localStorage.getItem("mainCategoryTitle")
    ? localStorage.getItem("mainCategoryTitle")
    : "";
  const subCategoryTitle = localStorage.getItem("subCategoryTitle")
    ? localStorage.getItem("subCategoryTitle")
    : "";

  const [mobileFilter, setMobileFilter] = useState(false);
  const [filters, setFilters] = useState({
    sort_by: "",
    year_from: "",
    yearto: "",
    color: "",
    model_id: "",
    place: "",
    condition: "",
    looking: "",
    price_from: "",
    price_to: "",
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const [categoryState, setCategoryState] = useState({
    mainId: categoryId,
    subId: subCategoryId,
    activeFilterTitle: categoryTitle,
    activeSubFilterTitle: subCategoryTitle,
  });

  let customApi = `filter-market?main_id=${categoryState.mainId}&sub_id=${categoryState.subId}&page=${page}&limit_by=${limit}&model_id=${filters.model_id}&sort_by=${filters.sort_by}&condition=${filters.condition}&looking=${filters.looking}&place=${filters.place}&year_from=${filters.year_from}&year_to=${filters.yearto}&color=${filters.color}`;

  useEffect(() => {
    customApi = `filter-market?main_id=${categoryState.mainId}&sub_id=${categoryState.subId}&page=${page}&limit_by=${limit}&model_id=${filters.model_id}&sort_by=${filters.sort_by}&condition=${filters.condition}&looking=${filters.looking}&place=${filters.place}&year_from=${filters.year_from}&year_to=${filters.yearto}&color=${filters.color}`;
  }, [filters]);
  console.log("customApi>>>", customApi)
  console.log("customApi>>>", filters)
  const [Data] = useAxios(customApi);
  const categoryData = Data?.data;
  const total = Data?.total;
  const [activeItem, setActiveItem] = useState(null);


  const [yearData] = useAxios(`year`);
  const [colorData] = useAxios(`color`);
  const [cityData] = useAxios(`cities`);
  const [modelData] = useAxios(
    `product-model?sub_id=${subCategoryId}`
  );
  console.log("modelData>>>>>", modelData);


  const scrollPagination = () => { };
  // const filterChange = (event, type) => {
  //   console.log("type>>>", type, "event>>", event);
  //   setFilters(prevFilters => {
  //     if (type === 2) {
  //       const { name, value } = event.target;
  //       return { ...prevFilters, [name]: value };
  //     } else {
  //       return { ...prevFilters, [event.name]: event.value };
  //     }
  //   });
  // };
  const filterChange = (event, type) => {
    console.log("type>>>", type, "event>>", event)
    if (type === 2) {
      const { name, value } = event.target;
      setFilters({ ...filters, [name]: value });
    } else {
      setFilters({ ...filters, [event.name]: event.value });
    }
  };
  const handleItemClick = (catId) => {
    setActiveItem(catId);
    setFilters({ ...filters, model_id: catId });
  };
  const [openMobileCategory, setOpenMobileCategory] = useState(false);

  return (
    <>
      <div className={filterStyle.bannerMarketPlace}>
        <AdvBanner bannerUrl="sliders/page?page=App\Models\MarketPlacePage" />

        <HeroMobileButtons setOpenMobileCategory={setOpenMobileCategory} />
      </div>
      <CategoryNav
        openMobileCategory={openMobileCategory}
        setOpenMobileCategory={setOpenMobileCategory}
        categoryState={categoryState}
        setCategoryState={setCategoryState}
        token={token}

      />
      <div className={filterStyle.sublistCatge}>
        {modelData.data?.map((cat) => {
          return <li className={cat?.id === activeItem ? filterStyle.activeLi : ''} key={cat?.id} onClick={() => handleItemClick(cat.id)}>{cat?.name}</li>
        })}
      </div>

      <div className={`row ${filterStyle.pageContainer}`}>
        <div className={`col-sm-1 col-md-3 col-lg-3 ${filterStyle.filterHide}`}>
          <ProductFilter filterChange={filterChange} filters={filters} />
        </div>

        <div className={`col-sm-12 col-md-9 col-lg-9 ${filterStyle.pageRow}`}>

          <div className={filterStyle.addProductBtnDiv}>
            <button
              onClick={() => setMobileFilter(!mobileFilter)}
              className={`col-lg-1 col-md-1 col-sm-1 ${filterStyle.filterShowProduct}`}
            >
              <i className="fas fa-filter"></i>
            </button>

          </div>

          <div className={`col-sm-12 mt-3 ${filterStyle.filterShow}`}>
            {mobileFilter && (

              <ProductFilter filterChange={filterChange} filters={filters} />
            )}
          </div>
          <div hidden className={filterStyle.filterDiv}>
            <div className={filterStyle.filterSelect}>
              <span>{t("Sort By")}: </span>

              <select name="sortBy" onChange={filterChange}>
                <option value="">{t("select")}</option>
                <option value="price">{t("Price")}</option>
                <option value="year">{t("Year")}</option>
                <option value="title">{t("name")}</option>
                <option value="condition">{t("Condition")}</option>
              </select>
            </div>

            <div className={filterStyle.filterSelect}>
              <select name="year_from" onChange={filterChange}>
                <span>{t("Year from")}: </span>

                <option value="">{t("All")}</option>
                {yearData?.data?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>




            <div className={filterStyle.filterSelect}>
              <span> {t("Year to")}: </span>

              <select name="yearto" onChange={filterChange}>
                <option value="">{t("All")}</option>
                {yearData?.data?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={filterStyle.filterSelect}>
              <span>{t("Condition")}: </span>

              <select name="condition" onChange={filterChange}>
                <option value="">{t("All")}</option>
                <option value="new">{t("New")}</option>
                <option value="used">{t("Used")}</option>
              </select>
            </div>
            <div className={filterStyle.filterSelect}>
              <span>{t("Post type")}: </span>

              <select name="looking" onChange={filterChange}>
                <option value="">{t("All")}</option>
                <option value="sell">{t("For sale")}</option>
                <option value="buy">{t("For buy")}</option>
              </select>
            </div>

            <div className={filterStyle.filterSelect}>
              <span> {t("Color")}: </span>

              <select name="color" onChange={filterChange}>
                <option value="">{t("All")}</option>
                {colorData?.data?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={filterStyle.filterSelect}>
              <span> {t("Model")}: </span>

              <select name="model" onChange={filterChange}>
                <option value="">{t("All")}</option>
                {modelData?.data?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={filterStyle.filterSelect}>
              <span> {t("City")}: </span>

              <select name="place" onChange={filterChange}>
                <option value="">{t("All")}</option>
                {cityData?.data?.map((item, index) => {
                  return (
                    <option key={index} value={item.city}>
                      {item.city}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <ProductsSection
            categoryData={categoryData}
            total={total}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            scrollPagination={scrollPagination}
            categoryState={categoryState}
            setCategoryState={setCategoryState}
            token={token}

          />
        </div>
      </div>

      <div className={filterStyle.PaginationBackground}>
        {limit < total && (
          <Pagination
            totalPosts={total}
            postsPerPage={limit}
            setCurrentPage={setPage}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={page}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            scrollPagination={scrollPagination}
          />
        )}
      </div>
    </>
  );
}

export default CategoryPage;
