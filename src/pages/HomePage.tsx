import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'

const FEATURED_COLLECTIONS = [
  {
    id: 'ikonene',
    label: 'Kolleksjon 01',
    title: 'Ikonene',
    desc: 'Urene som definerte generasjoner og redskapsformene.',
    image: 'https://images.unsplash.com/photo-1614517759349-3d49f4cb6ef2?w=800&q=80',
    size: 'large',
  },
  {
    id: 'arv',
    label: 'Kolleksjon 02',
    title: 'Arv & Innovasjon',
    desc: 'Hvor formingsgjennom tid fra håndarbeidet innen urmakerstaten til moderne tiendels.',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80',
    size: 'medium',
  },
  {
    id: 'komplikasjon',
    label: 'Ny kolleksjon 03',
    title: 'Mesterkomplikasjoner',
    desc: 'Høydepunkt av sveitsisk ingeniørkunst, med tourbillon og grand komplikasjoner.',
    image: 'https://images.unsplash.com/photo-1639037760854-d8986cd40e54?w=800&q=80',
    size: 'large',
  },
]

const BRANDS = [
  {
    id: 'patek',
    name: 'PATEK PHILIPPE',
    image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&q=80',
    quote: '"Du eier aldri en Patek Philippe. Du bare passer på den for neste generasjon."',
    dark: false,
    featured: true,
  },
  {
    id: 'audemars',
    name: 'AUDEMARS PIGUET',
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f2?w=600&q=80',
    dark: false,
    featured: false,
  },
  {
    id: 'vacheron',
    name: 'VACHERON',
    image: '',
    dark: false,
    featured: false,
  },
  {
    id: 'cartier',
    name: 'Cartier',
    image: '',
    dark: true,
    featured: false,
    accent: true,
  },
]

const COMPARISON_PREVIEWS = [
  'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&q=80',
  'https://images.unsplash.com/photo-1622434641406-a158123450f2?w=300&q=80',
]

export default function HomePage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Grunnlagt 1892</p>
          <h1 className={styles.heroTitle}>
            Kunsten å<br />
            <em>måle tid</em>
          </h1>
          <p className={styles.heroDesc}>
            Oppdrag et kuratert utvalg av sjeldne vintage-funn og
            moderne mesterverk fra verdens mest prestisjefulle
            urmakere.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary} onClick={() => navigate('/kolleksjoner')}>
              Utforsk kolleksjonene
            </button>
            <button className={styles.ctaSecondary} onClick={() => navigate('/sok')}>
              Se fliken
            </button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src=" https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80"
            alt="Luksusur"
          />
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ── */}
      <section className={styles.collections}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Utvalgte modeller</h2>
              <p className={styles.sectionDesc}>
                Disperfavorite urwerk kategorisert etter epoke, komplikasjon og
                kulturell betydning.
              </p>
            </div>
            <Link to="/kolleksjoner" className={styles.seeAll}>
              Se alle kolleksjoner
            </Link>
          </div>

          <div className={styles.collGrid}>
            {FEATURED_COLLECTIONS.map((col, i) => (
              <Link
                key={col.id}
                to="/kolleksjoner"
                className={`${styles.collCard} ${col.size === 'large' ? styles.collCardLarge : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.collImgWrap}>
                  <img src={col.image} alt={col.title} className={styles.collImg} />
                  <div className={styles.collOverlay} />
                </div>
                <div className={styles.collInfo}>
                  <span className={styles.collLabel}>{col.label}</span>
                  <h3 className={styles.collName}>{col.title}</h3>
                  <p className={styles.collDesc}>{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className={styles.brands}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <h2 className={styles.sectionTitle}>Merkene</h2>
            <p className={styles.sectionDesc}>
              Vi samarbeider med verdens mest anerkjente produsenter
              for å sikre autentisitet og perfeksjon.
            </p>
          </div>

          <div className={styles.brandsGrid}>
            {/* Large Patek featured card */}
            <div className={`${styles.brandCard} ${styles.brandFeatured}`}>
              <img
                src={BRANDS[0].image}
                alt="Patek Philippe"
                className={styles.brandImg}
              />
              <div className={styles.brandOverlay}>
                <p className={styles.brandName}>{BRANDS[0].name}</p>
                <p className={styles.brandQuote}>{BRANDS[0].quote}</p>
                <button className={styles.brandBtn} onClick={() => navigate('/sok')}>
                  Utforsk merket
                </button>
              </div>
            </div>

            {/* Right column grid */}
            <div className={styles.brandsRight}>
              <div className={`${styles.brandCard} ${styles.brandLight}`}>
                <img
                  src={BRANDS[1].image}
                  alt="Audemars Piguet"
                  className={styles.brandImg}
                />
                <div className={styles.brandNameOverlay}>
                  <p className={styles.brandNameSimple}>{BRANDS[1].name}</p>
                </div>
              </div>
              <div className={`${styles.brandCard} ${styles.brandLight} ${styles.brandNameOnly}`}>
                <p className={styles.brandNameCenter}>{BRANDS[2].name}</p>
              </div>
              <div className={`${styles.brandCard} ${styles.brandGold}`}>
                <p className={styles.brandNameCenter}>{BRANDS[3].name}</p>
                <CartierDiamondIcon />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON CTA ── */}
      <section className={styles.comparisonBanner}>
        <div className="container">
          <div className={styles.compBannerInner}>
            <div className={styles.compBannerText}>
              <p className={styles.compEyebrow}>Sammenligningsverktøy</p>
              <h2 className={styles.compTitle}>Presisjon side-by-side</h2>
              <p className={styles.compDesc}>
                Vårt avanserte sammenligningsverktøy lar deg analysere
                verkets frekvens, gangreserve og materialitettet inntil tre
                referanser i vår katalog.
              </p>
              <button
                className={styles.compBtn}
                onClick={() => navigate('/sammenligning')}
              >
                Start sammenligningsverktøyet
              </button>
            </div>
            <div className={styles.compPreviews}>
              {COMPARISON_PREVIEWS.map((src, i) => (
                <div key={i} className={styles.compPreview}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <EnvelopeIcon />
            <h2 className={styles.newsletterTitle}>Ateliersetts nyhetsbrev</h2>
            <p className={styles.newsletterDesc}>
              Bli med i vårt private register for fristeds ekslusiv innblit om sjeldne nyheter og private
              samlerauksjonar for retrit offentlige.
            </p>
            <form
              className={styles.newsletterForm}
              onSubmit={e => { e.preventDefault(); setEmail('') }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Din e-postadresse"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterBtn}>Abonner</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

const CartierDiamondIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" style={{ marginTop: '12px' }}>
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
    <line x1="2" y1="8.5" x2="22" y2="8.5"/>
    <line x1="2" y1="15.5" x2="22" y2="15.5"/>
  </svg>
)

const EnvelopeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" style={{ marginBottom: '20px' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
