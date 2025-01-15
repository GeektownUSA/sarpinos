const Experience = ({ data }) => {
  return (
    <section className="page-container">
      <div className="responsive-column-container" style={{ padding: '2rem 0' }}>
        <div>
          <h2>{data.acf.experience_headline}</h2>
          {data.acf.experience_paragraph}
        </div>
        <div>

          <iframe width="560" height="315" style={{ width: '100%' }}
            src={data.acf.youtube_embed_link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        </div>
      </div>
    </section>
  )
}

export default Experience;