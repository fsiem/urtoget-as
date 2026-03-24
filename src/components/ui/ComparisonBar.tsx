import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useComparison } from '../../App.tsx'
import styles from './ComparisonBar.module.css'

export default function ComparisonBar() {
  const { comparisonList, removeFromComparison } = useComparison()
  const navigate = useNavigate()

  if (comparisonList.length === 0) return null

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <span className={styles.label}>Sammenligningsatelier ({comparisonList.length})</span>
        <div className={styles.items}>
          {comparisonList.map(w => (
            <div key={w.id} className={styles.item}>
              <img src={w.image} alt={w.model} className={styles.thumb} />
              <div className={styles.itemInfo}>
                <span className={styles.itemBrand}>{w.brand}</span>
                <span className={styles.itemModel}>{w.model}</span>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromComparison(w.id)}
                aria-label="Fjern"
              >×</button>
            </div>
          ))}
        </div>
        <button
          className={styles.compareBtn}
          onClick={() => navigate('/sammenligning')}
          disabled={comparisonList.length < 2}
        >
          Sammenlign spesifikasjoner
        </button>
      </div>
    </div>
  )
}
