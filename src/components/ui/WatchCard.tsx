import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useComparison } from '../../App.tsx'
import { Watch } from '../../types/watch.ts'
import styles from './WatchCard.module.css'

interface Props {
  watch: Watch
}

function formatPrice(price: number, currency: string): string {
  if (currency === 'NOK') return `${price.toLocaleString('no-NO')} kr`
  return `$${price.toLocaleString('en-US')}`
}

export default function WatchCard({ watch }: Props) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()
  const [imgIdx, setImgIdx] = useState(0)
  const inComp = isInComparison(watch.id)

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    inComp ? removeFromComparison(watch.id) : addToComparison(watch)
  }

  return (
    <Link to={`/ur/${watch.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={watch.images?.[imgIdx] ?? watch.image}
          alt={watch.model}
          className={styles.image}
          loading="lazy"
        />
        {watch.isNew && <span className={styles.badge}>Nyhet</span>}
        <button
          className={`${styles.compareBtn} ${inComp ? styles.compareBtnActive : ''}`}
          onClick={handleCompare}
          aria-label="Legg til i sammenligning"
        >
          {inComp ? '✓' : '+'}
        </button>
        {(watch.images?.length ?? 0) > 1 && (
          <div className={styles.dots}>
            {watch.images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === imgIdx ? styles.dotActive : ''}`}
                onClick={e => { e.preventDefault(); setImgIdx(i) }}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.brand}>{watch.brand}</span>
        <h3 className={styles.model}>{watch.model}</h3>
        <p className={styles.sub}>{watch.caseSize} · {watch.caseMaterial}</p>
        <p className={styles.price}>{formatPrice(watch.price, watch.currency)}</p>
      </div>
    </Link>
  )
}
