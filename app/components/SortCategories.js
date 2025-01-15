import styles from './SortCategories.module.css';

const SortCategories = ({ selectionTitle, categories, selectedCategory, onCategorySelect }) => {
  const handleCategorySelect = (option) => {
    onCategorySelect(option); // Call the function passed as a prop
  };

  // Filter out 'Uncategorized' and add 'All' at the beginning
  const processedCategories = categories.filter(cat => cat.name !== 'Uncategorized');
  processedCategories.unshift({ name: 'All', id: null });

  return (
    <>
      <h4 className={styles.title}>{selectionTitle}</h4>
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

export default SortCategories;