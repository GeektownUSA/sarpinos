'use client';
import React, { useState } from 'react';
import styles from './ItemInfo.module.css';

const ItemInfo = ({ post }) => {
  const [activeSize, setActiveSize] = useState("size1");

  // Check that post and post.acf are defined
  if (!post || !post.acf || !post.acf.nutritional_info_by_size) {
    return null;  // Or some fallback UI
  }
  const nutritional_info_by_size = post.acf.nutritional_info_by_size;
  const nutritional_info_with_label = nutritional_info_by_size.filter(size => size.size_label);
  const nutritional_info_length = nutritional_info_with_label.length;

  // Map over the nutritional_info_by_size array to generate the buttons
  const sizeButtons = nutritional_info_with_label.map((size, index) => {
    if (!size.size_label) {
      return null; // Skip this iteration if size_label is empty
    }
    const sizeId = `size${index + 1}`;
    const handleSize = () => {
      setActiveSize(sizeId);
    };
    return (
      <button
        key={sizeId}
        onClick={handleSize}
        className={`${styles.sizeBtn} ${activeSize === sizeId ? styles.active : ""} ${nutritional_info_length === 1 ? styles.singleSize : ""}`}
      >
        {size.size_label}
      </button>
    );
  });

  // Map over the nutritional_info_by_size array to generate the table rows
  const sizeRows = nutritional_info_by_size.map((size, index) => {

    const sizeId = `size${index + 1}`;

    // Only render the row if it's the active size
    if (activeSize === sizeId) {
      return (
        <React.Fragment key={sizeId}>
          <tbody>
            <tr>
              <td className={styles.title}>CALORIES</td>
              <td>{size.total_calories} Cals</td>
            </tr>
            <tr>
              <td>Fat Cals</td>
              <td>{size.fat_calories} Cals</td>
            </tr>
            <tr>
              <td>Saturated Cals</td>
              <td>{size.saturated_calories} Cals</td>
            </tr><tr>
              <th colSpan="2"><hr className={styles.hr} /></th>
            </tr>
            <tr>
              <td className={styles.title}>TOTAL FAT</td>
              <td>{size.total_fat} g</td>
            </tr>
            <tr>
              <td>Saturated Fat</td>
              <td>{size.saturated_fat} g</td>
            </tr>
            <tr>
              <td>Trans Fat</td>
              <td>{size.trans_fat} g</td>
            </tr>
            <tr>
              <th colSpan="2"><hr className={styles.hr} /></th>
            </tr>
            <tr>
              <td>Cholesterol</td>
              <td>{size.cholesterol} mg</td>
            </tr>
            <tr>
              <td>Sodium</td>
              <td>{size.sodium} mg</td>
            </tr>
            <tr>
              <th colSpan="2"><hr className={styles.hr} /></th>
            </tr>
            <tr>
              <td className={styles.title}>Total Carbohydrates</td>
              <td>{size.total_carbohydrate} g</td>
            </tr>
            <tr>
              <td>Fiber</td>
              <td>{size.fiber} g</td>
            </tr>
            <tr>
              <td>Sugar</td>
              <td>{size.sugar} g</td>
            </tr>
            <tr>
              <th colSpan="2"><hr className={styles.hr} /></th>
            </tr>
            <tr>
              <td>Protein</td>
              <td>{size.protein} g</td>
            </tr>
            <tr>
              <td>Vitamin A</td>
              <td>{size.vitamin_a} IU</td>
            </tr>
            <tr>
              <td>Vitamin C</td>
              <td>{size.vitamin_c} mg</td>
            </tr>
            <tr>
              <td>Calcium</td>
              <td>{size.calcium} mg</td>
            </tr>
            <tr>
              <td>Iron</td>
              <td>{size.iron} mg</td>
            </tr>
          </tbody>
        </React.Fragment>
      );
    }
    return null;
  });

  // Render the table with the size rows
  // Check if all fields are blank
  const allFieldsBlank = nutritional_info_by_size.every(size =>
    !size.size_total_calories &&
    !size.total_fat
  );

  if (allFieldsBlank) {
    return (
      <div className={styles.table}>
        <p>No nutritional information available for this item.</p>
      </div>
    );
  } else {
    return (
      <div className={styles.itemInfo}>
        <div className={styles.sizes}>
          {sizeButtons}
        </div>
        <table className={styles.table}>
          {sizeRows}
        </table>
      </div>
    );
  }

}

export default ItemInfo;