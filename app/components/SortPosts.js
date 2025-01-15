import styles from './SortCategories.module.css';

const PostSort = ({ selectionTitle, postTypes, selectedPostType, onPostTypeSelect }) => {
  const handlePostTypeSelect = (option) => {
    onPostTypeSelect(option); // Call the function passed as a prop
  };

  // Add 'All' at the beginning
  const processedPostTypes = ['All', ...postTypes];
  return (
    <>
      <h4 className={styles.title}>{selectionTitle}</h4>
      <div className={styles.container}>
        <div className={styles.categoryFilter}>
          {processedPostTypes.map((item, index) => (
            <button
              onClick={() => handlePostTypeSelect(item)} // 'item' is the post type name
              key={`term${index}`}
              value={item} // 'item' is the post type name
              className={selectedPostType === item ? styles.active : ''}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default PostSort;