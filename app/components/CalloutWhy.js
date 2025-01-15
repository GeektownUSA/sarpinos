import Link from 'next/link';
import Car from './svgs/drawing-car.jsx'
import Moon from './svgs/drawing-moon.jsx'
import Calendar from './svgs/drawing-calendar.jsx'
import styles from './CalloutWhy.module.css'

const CalloutWhy = ({ containerClasses, gridClasses }) => {
  return (
    <div className={containerClasses}>
      <div className="responsive-three-column-container" style={{ margin: '3rem 0 0', gridGap: '1.5rem' }}>
        <Link href="/blog/fast-and-free-pizza-delivery-is-sarpinos-specialty" className={`grid-item ${gridClasses && gridClasses || ''}`} style={{ borderRadius: '10px' }}>
          <div className={styles.hoverCar}>
            <div style={{ padding: '2rem 1rem 1rem' }}>
              <Car />
            </div>
          </div>
          <h2 className='slide-up-in' style={{ padding: '1.5rem 0' }}>Free <br />Delivery</h2>
        </Link>
        <Link href="/blog/sarpinos-is-open-for-late-night-delivery" className={`grid-item ${gridClasses && gridClasses || ''}`} style={{ borderRadius: '10px' }}>
          <div className={styles.hoverMoon} style={{ padding: '2rem 1rem 1rem' }}>
            <Moon />
          </div>
          <h2 className='slide-up-in' style={{ padding: '1.5rem 0' }}>Open <br />Late</h2>
        </Link>
        <Link href="/blog/sarpinos-is-open-every-day-365-days" className={`grid-item ${gridClasses && gridClasses || ''}`} style={{ borderRadius: '10px' }}>
          <div className={styles.hoverCalendar} style={{ padding: '2rem 1rem 1rem' }}>
            <Calendar />
          </div>
          <h2 className='slide-up-in' style={{ padding: '1.5rem 0' }}>Open <br />365 Days</h2>
        </Link>
      </div>

      <Link href="/company" className={gridClasses === "red-gradient" ? "hidden" : gridClasses === "night-theme" ? "btn quaternary-btn" : gridClasses === "static-theme" ? "btn quaternary-btn" : "btn primary-btn"} style={{ margin: '2rem 0' }}><span>About Us</span></Link>
    </div>
  )
}

export default CalloutWhy;