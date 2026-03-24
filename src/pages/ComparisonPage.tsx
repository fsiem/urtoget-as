import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useComparison } from '../App.tsx'
import watchesData from '../data/watches.json'
import { Watch } from '../types/watch.ts'
import styles from './ComparisonPage.module.css'

const watches = watchesData as Watch[]

function formatPrice(price: number, currency: string): string {
  if (currency === 'NOK') return `${price.toLocaleString('no-NO')} kr`
  return `$${price.toLocaleString('en-US')}`
}

interface SpecRowProps {
  label: string
  values: (string | undefined)[]
  highlight?: boolean
}

function SpecRow({ label, values, highlight }: SpecRowProps) {
  return (
    <div className={`${styles.specRow} ${highlight ? styles.specRowHighlight : ''}`}>
      <span className={styles.specLabel}>{label}</span>
      {values.map((v, i) => (
        <span key={i} className={styles.specVal}>{v ?? '—'}</span>
      ))}
    </div>
  )
}

const MAX_SLOTS = 3

export default function ComparisonPage() {
  const { comparisonList, removeFromComparison, addToComparison } = useComparison()
  const navigate = useNavigate()

  const slots = Array.from({ length: MAX_SLOTS }, (_, i) => comparisonList[i] ?? null)

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Kuratert utvalg</p>
          <h1 className={styles.title}>Sammenlign klokker</h1>
          <p className={styles.desc}>
            En grundig analyse av verdens mest sofistikerte urverk og håndverk. Utforsk de
            subtile nyansene som definerer horologisk ekspertise.
          </p>
        </header>

        {/* ── COMPARISON TABLE ── */}
        <div className={styles.table}>
          {/* Left labels */}
          <div className={styles.labelsCol}>
            <div className={styles.labelPlaceholder} />
            <div className={styles.labelGroup}>
              <p className={styles.groupTitle}>Ansiktet</p>
              <p className={styles.groupSub}>Visuell identitet</p>
            </div>
            <div className={styles.labelGroup}>
              <p className={styles.groupTitle}>Hjertet</p>
              <p className={styles.groupSub}>Detaljer om urverk</p>
            </div>
            <div className={styles.labelGroup}>
              <p className={styles.groupTitle}>Formen</p>
              <p className={styles.groupSub}>Kasse og materiale</p>
            </div>
            <div className={styles.labelGroup}>
              <p className={styles.groupTitle}>Koblingen</p>
              <p className={styles.groupSub}>Lenke og rem</p>
            </div>
          </div>

          {/* Watch columns */}
          {slots.map((watch, i) => (
            <div key={i} className={styles.watchCol}>
              {watch ? (
                <>
                  {/* Image */}
                  <div className={styles.watchImgWrap}>
                    <img src={watch.image} alt={watch.model} className={styles.watchImg} />
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromComparison(watch.id)}
                      aria-label="Fjern"
                    >×</button>
                  </div>

                  {/* Identity */}
                  <div className={styles.watchIdentity}>
                    <p className={styles.watchBrand}>{watch.brand.toUpperCase()}</p>
                    <h2 className={styles.watchModel}>{watch.model}</h2>
                    <p className={styles.watchDesc}>{watch.description}</p>
                  </div>

                  {/* Movement */}
                  <div className={styles.specGroup}>
                    <div className={styles.specChip}>
                      <MovementIcon />
                      <span>Kaliber {watch.caliber}</span>
                    </div>
                    <p className={styles.specNote}>{watch.movement}</p>
                    <div className={styles.specLine}>
                      <span className={styles.specLineLabel}>Gangreserve</span>
                      <span className={styles.specLineVal}>{watch.powerReserve}</span>
                    </div>
                  </div>

                  {/* Case */}
                  <div className={styles.specGroup}>
                    <div className={styles.specLine}>
                      <LocationIcon />
                      <span>{watch.caseSize} kasse</span>
                    </div>
                    <p className={styles.specNote}>{watch.caseMaterial}. {watch.thickness} tykkelse.</p>
                    {watch.keyDifference && (
                      <div className={styles.highlightBox}>
                        <p className={styles.highlightLabel}>Hovedforskjell</p>
                        <p className={styles.highlightText}>{watch.keyDifference}</p>
                      </div>
                    )}
                  </div>

                  {/* Strap */}
                  <div className={styles.specGroup}>
                    <div className={styles.specChip}>
                      <StrapIcon />
                      <span>{watch.strap?.toUpperCase()}</span>
                    </div>
                    <p className={styles.specNote}>{watch.strapColor}. {watch.clasp}.</p>
                  </div>

                  {/* CTA */}
                  <div className={styles.watchCtas}>
                    <Link to={`/ur/${watch.id}`} className={styles.discoverBtn}>
                      Oppdag mer
                    </Link>
                    <button className={styles.collectBtn}>Legg til i kolleksjon</button>
                  </div>
                </>
              ) : (
                /* Empty slot */
                <div className={styles.emptySlot}>
                  <button className={styles.addBtn} onClick={() => navigate('/kolleksjoner')}>
                    <span className={styles.addBtnPlus}>+</span>
                  </button>
                  <p className={styles.emptyHint}>
                    Velg en annen modell fra vårt kuraterte hjelv for å fortsette sammenligningen.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── ANALYSIS SECTION ── */}
        {comparisonList.length >= 2 && (
          <section className={styles.analysis}>
            <h2 className={styles.analysisTitle}>Sammenlignende analyse</h2>
            <div className={styles.analysisGrid}>
              <div className={styles.analysisCard}>
                <p className={styles.analysisEyebrow}>Teknisk fokus</p>
                <h3 className={styles.analysisCardTitle}>Urverkets arkitektur</h3>
                <p className={styles.analysisText}>
                  {comparisonList[0]?.caliber}-kaliberet er {comparisonList[0]?.movement?.toLowerCase()}.
                  I sammenligningen tilbyr {comparisonList[1]?.model} bekvemmeligheten med{' '}
                  {comparisonList[1]?.movementType?.toLowerCase()}.
                </p>
                <div className={styles.analysisCompare}>
                  {comparisonList.map(w => (
                    <div key={w.id} className={styles.analysisItem}>
                      <span className={styles.analysisItemBrand}>{w.brand.split(' ')[0]} {w.caliber}</span>
                      <span className={styles.analysisItemVal}>{w.movementType}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${styles.analysisCard} ${styles.analysisCardDark}`}>
                <p className={styles.analysisEyebrow}>Håndverket</p>
                <h3 className={styles.analysisCardTitle}>Edle metaller</h3>
                <p className={styles.analysisQuote}>
                  "Gull er ikke bare et materiale, det er et uttrykk for varighet."
                </p>
                <div className={styles.analysisCompare}>
                  {comparisonList.map(w => (
                    <div key={w.id} className={styles.analysisItem}>
                      <span className={styles.analysisItemBrand}>{w.caseMaterial}</span>
                      <span className={styles.analysisItemVal}>{w.finish}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {comparisonList.length === 0 && (
          <div className={styles.emptyState}>
            <p>Legg til ur fra kolleksjonen for å starte sammenligningen.</p>
            <Link to="/kolleksjoner" className={styles.emptyStateLink}>Utforsk kolleksjoner →</Link>
          </div>
        )}
      </div>
    </div>
  )
}

const MovementIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
)
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  </svg>
)
const StrapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 3h8M8 21h8M8 3v18M16 3v18"/>
  </svg>
)
