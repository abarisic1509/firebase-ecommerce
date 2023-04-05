import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductList.module.scss";
import Search from "../../Search/Search";
import { useEffect } from "react";
import {
  filterProducts,
  setSearchTerm,
  setSortBy,
} from "../../../redux/features/filterSlice";
import Pagination from "../../Pagination/Pagination";

const ProductList = ({ productsData }) => {
  const dispatch = useDispatch();
  const { searchTerm, sortBy, filterByCategory, filterByBrand, priceRange } =
    useSelector((state) => state.filters);
  const [grid, setGrid] = useState(true);

  const filteredProducts = useSelector(
    (state) => state.filters.filteredProducts
  );

  useEffect(() => {
    dispatch(filterProducts({ productsData }));
  }, [
    dispatch,
    productsData,
    searchTerm,
    sortBy,
    filterByCategory,
    filterByBrand,
    priceRange,
  ]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={22} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
        </div>
        <div>
          <Search
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className={styles.sort}>
          <label htmlFor="sortOpt">Sort by</label>
          <select
            name="sortOpt"
            id="sortOpt"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="latest">Latest</option>
            <option value="low-to-high">Price: low to high</option>
            <option value="high-to-low">Price: high to low</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {filteredProducts.lenght === 0 ? (
          <p>No products found</p>
        ) : (
          <>
            {currentProducts.map((product) => (
              <div key={product.id}>
                <ProductCard {...product} grid={grid} />
              </div>
            ))}
          </>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
