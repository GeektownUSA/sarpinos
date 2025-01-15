import Image from 'next/image';
import Link from 'next/link';

const Franchise = ({ data, franchiseImage }) => {
  return (
    <section>
      <div className="full-page-container nighttime-background-color">
        <div className="responsive-column-container">
          <div style={{ position: 'relative' }}>
            <Image src={franchiseImage.sourceUrl}
              width={1200}
              height={800}
              alt={franchiseImage.altText}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="flex-align-center" style={{ padding: '2rem', maxWidth: '525px' }}>
            {data.acf.franchise_headline && <h2>{data.acf.franchise_headline}</h2>}
            {data.acf.franchise_content && <div dangerouslySetInnerHTML={{ __html: data.acf.franchise_content }}></div>}
            {data.acf.franchise_link && <Link className='btn primary-btn' style={{ margin: '2rem auto 1rem 0' }} href={data.acf.franchise_link.url}><span>{data.acf.franchise_link.title}</span></Link>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Franchise;