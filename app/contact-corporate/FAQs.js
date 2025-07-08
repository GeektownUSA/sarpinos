'use client';
import { useState } from 'react';
import styles from './FAQs.module.css';
const FAQs = ({ data }) => {
  const faqs = data.acf?.faqs || [];
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className={`page-container ${styles.container}`}>
      <h2 className={styles.headline} dangerouslySetInnerHTML={{ __html: data.acf.faqs_headline || 'FAQs' }} />
      <div className={styles.faqs}>
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div key={index}>
              <h4 className={styles.title}
                onClick={() => setActiveIndex(isActive ? null : index)}>
                <span>{faq.title}</span>
                <span>{isActive ? '-' : '+'}</span>
              </h4>
              {isActive && <div className={styles.description} dangerouslySetInnerHTML={{ __html: faq.description || '' }} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FAQs