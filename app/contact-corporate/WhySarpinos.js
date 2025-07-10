

import CalloutWhy from '@/app/components/CalloutWhy';
const WhySarpinos = () => {

  return (
    <section className="viewport text-align-center daytime-background-color" style={{ paddingTop: 0 }}>
      <h2 style={{ padding: '3rem 0 0' }}>WHY SARPINO&apos;S?</h2>
      <CalloutWhy
        containerClasses={'page-container cream-outline text-align-center'}
        gridClasses="static-theme"
      />
    </section>
  );
}

export default WhySarpinos;