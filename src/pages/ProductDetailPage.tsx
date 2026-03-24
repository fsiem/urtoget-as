import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import watchesData from '../data/watches.json'
import { Watch } from '../types/watch.ts'
import { useComparison } from '../App.tsx'
import WatchCard from '../components/ui/WatchCard.tsx'
import ComparisonBar from '../components/ui/ComparisonBar.tsx'
import styles from './ProductDetailPage.module.css'

const watches = watchesData as Watch[]

function formatPrice(price: number, currency: string): string {
  if (currency === 'NOK') return `${price.toLocaleString('no-NO')} kr`
  return `$${price.toLocaleString('en-US')}`
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToComparison, isInComparison } = useComparison()
  const [activeImg, setActiveImg] = useState(0)

  const watch = watches.find(w => w.id === id)

  if (!watch) {
    return (
      <div className={styles.notFound}>
        <p>Finner ikke dette uret.</p>
        <Link to="/kolleksjoner">← Tilbake til kolleksjonene</Link>
      </div>
    )
  }

  const related = watches
    .filter(w => w.id !== watch.id && (w.brand === watch.brand || w.tags?.some(t => watch.tags?.includes(t))))
    .slice(0, 3)

  const inComp = isInComparison(watch.id)

  return (
    <>
      <div className={styles.page}>
        {/* ── MAIN PRODUCT ── */}
        <div className="container">
          <div className={styles.product}>
            {/* Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImgWrap}>
                <img src={watch.images[activeImg] ?? watch.image} alt={watch.model} className={styles.mainImg} />
                {watch.collection && (
                  <span className={styles.collectionBadge}>Hovedikonproduksjon</span>
                )}
              </div>
              {watch.images.length > 1 && (
                <div className={styles.thumbs}>
                  {watch.images.map((img, i) => (
                    <button
                      key={i}
                      className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`${watch.model} ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className={styles.info}>
              <p className={styles.collectionLabel}>{watch.collection?.toUpperCase()}</p>
              <h1 className={styles.model}>{watch.model.toUpperCase()}</h1>
              <p className={styles.ref}>Ref. {watch.ref}</p>

              <p className={styles.price}>
                {formatPrice(watch.price, watch.currency)}
                <span className={styles.priceNote}> NOK · inkludert MVA</span>
              </p>

              <p className={styles.desc}>{watch.description}</p>

              <div className={styles.actions}>
                <button className={styles.addToCart}>Legg i handlekurv</button>
                <button
                  className={`${styles.compareBtn} ${inComp ? styles.compareBtnActive : ''}`}
                  onClick={() => addToComparison(watch)}
                >
                  {inComp ? '✓ I sammenligningen' : '+ Sammenlign med andre'}
                </button>
              </div>

              {/* Quick specs */}
              <div className={styles.quickSpecs}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Kassevidde</span>
                  <span className={styles.specVal}>{watch.caseSize}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Materiale</span>
                  <span className={styles.specVal}>{watch.caseMaterial}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Verk</span>
                  <span className={styles.specVal}>{watch.caliber}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Rem</span>
                  <span className={styles.specVal}>{watch.strap}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOVEMENT STORY ── */}
        <section className={styles.story}>
          <div className="container">
            <h2 className={styles.storyTitle}>Urverkets kunst</h2>
            <div className={styles.storyRule} />
            <p className={styles.storyText}>
              Hvert tannhjul i {watch.caliber} er håndfinishert av våre mestervurumakere i Jurafjelene. Bare
              prosessen med fasing tar over 24 timer per komponent, noe som sikrer at lyset danser over hver
              overflate med kirurgisk presisjon.
            </p>
            <p className={styles.storyText}>
              {watch.description} Med en kraftreserve på {watch.powerReserve}, er dette uret et testament til
              sveitsisk ingeniørkunst og tradisjonelt håndverk.
            </p>
          </div>
        </section>

        {/* ── TECHNICAL SPECS ── */}
        <section className={styles.specs}>
          <div className="container">
            <h2 className={styles.specsTitle}>Tekniske spesifikasjoner</h2>
            <div className={styles.specsGrid}>
              <div className={styles.specsCol}>
                <h3 className={styles.specsColTitle}>Urverk</h3>
                <div className={styles.specRow}>
                  <span>Type</span><span>{watch.movementType}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Gangreserve</span><span>{watch.powerReserve}</span>
                </div>
                {watch.movementDetails && <>
                  <div className={styles.specRow}>
                    <span>Frekvens</span><span>{watch.movementDetails.oscillations}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span>Juvelér</span><span>{watch.movementDetails.rubies}</span>
                  </div>
                </>}
              </div>

              <div className={styles.specsCol}>
                <h3 className={styles.specsColTitle}>Urkasse og Glass</h3>
                <div className={styles.specRow}>
                  <span>Vannmotstand</span><span>{watch.waterResistance}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Tykkelse</span><span>{watch.thickness}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Glass</span><span>{watch.crystal}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Finish</span><span>{watch.finish}</span>
                </div>
              </div>

              <div className={styles.specsCol}>
                <h3 className={styles.specsColTitle}>Funksjoner</h3>
                {watch.functions.map(fn => (
                  <div key={fn} className={styles.specRow}>
                    <span>{fn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <section className={styles.related}>
            <div className="container">
              <div className={styles.relatedHeader}>
                <h2 className={styles.relatedTitle}>Utvalgte sammenligninger</h2>
                <Link to="/sammenligning" className={styles.relatedLink}>Se alle sammenligninger</Link>
              </div>
              <div className={styles.relatedGrid}>
                {related.map(w => (
                  <WatchCard key={w.id} watch={w} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <ComparisonBar />
    </>
  )
}
