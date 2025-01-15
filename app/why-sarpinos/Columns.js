
import OrderBtn from '@/app/components/OrderBtn';
const Columns = ({ data }) => {
  return (
    <section className="page-container">
      <div className="responsive-column-container">
        <div className="column">{data.acf.column1}</div>
        <div className="column">{data.acf.column2}</div>
      </div>
      <div className="text-align-center" style={{ margin: '2rem 0' }}>
        <OrderBtn />
      </div>
    </section>
  )
}

export default Columns;