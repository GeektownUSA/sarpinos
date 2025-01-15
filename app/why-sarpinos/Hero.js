import CalloutWhy from '@/app/components/CalloutWhy'

const Hero = ({ data, heroImage }) => {
  return (
    <>
      <section className="viewport cream-color">
        <div className="page-container">
          <div className="content text-align-center">
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered || '' }} />
          </div>
          <CalloutWhy
            containerClasses={'full-page-container text-align-center'}
            gridClasses={'red-gradient'} />
        </div>
      </section>
    </>
  )
}

export default Hero;