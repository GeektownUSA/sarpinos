import styles from './SortSpecials.module.css';

const SortSpecials = ({ selectionTitle, categories, selectedCategory, onCategorySelect }) => {
  const handleCategorySelect = (option) => {
    onCategorySelect(option); // Call the function passed as a prop
  };

  // Filter out 'Uncategorized' and add 'All' at the beginning
  const processedCategories = categories.filter(cat => cat.name !== 'Uncategorized');
  processedCategories.unshift({ name: 'All Specials', id: null });

  return (
    <>
      <h5 className={styles.title}>{selectionTitle}</h5>
      <div className={styles.container}>
        <div className={styles.categoryFilter}>
          {processedCategories.map((category, index) => (
            <button
              onClick={() => handleCategorySelect(category.name)} // Assuming 'name' is the property for the category name
              key={`term${index}`}
              value={category.id} // Assuming 'id' is the property for the category ID
              className={selectedCategory === category.name ? styles.active : ''}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SortSpecials;