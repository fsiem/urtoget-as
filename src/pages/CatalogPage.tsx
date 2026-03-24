import React, { useState, useMemo } from 'react'
import watchesData from '../data/watches.json'
import { Watch } from '../types/watch.ts'
import WatchCard from '../components/ui/WatchCard.tsx'
import ComparisonBar from '../components/ui/ComparisonBar.tsx'
import styles from './CatalogPage.module.css'

const watches = watchesData as Watch[]
const BRANDS = ['Patek Philippe', 'Audemars Piguet', 'Vacheron Constantin', 'Rolex']
const MOVEMENTS = ['Manuelt opptrekk', 'Automatisk', 'Grand Complication']
const SORT_OPTIONS = ['Utvalgte', 'Pris: Lav til høy', 'Pris: Høy til lav']

export default function CatalogPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedMovements, setSelectedMovements] = useState<string[]>([])
  const [sort, setSort] = useState('Utvalgte')
  const [priceMax, setPriceMax] = useState(250000)

  const toggle = (prev: string[], val: string) =>
    prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]

  const filtered = useMemo(() => {
    let list = [...watches]
    if (selectedBrands.length > 0) list = list.filter(w => selectedBrands.includes(w.brand))
    if (selectedMovements.length > 0) list = list.filter(w => selectedMovements.includes(w.movementType))
    list = list.filter(w => w.price <= priceMax)
    if (sort === 'Pris: Lav til høy') list.sort((a, b) => a.price - b.price)
    else if (sort === 'Pris: Høy til lav') list.sort((a, b) => b.price - a.price)
    return list
  }, [selectedBrands, selectedMovements, priceMax, sort])

  return (
    <>
      <div className={styles.page}>
        <div className="container">
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <p className={styles.eyebrow}>Utvalgte Modeller</p>
              <h1 className={styles.title}>
                De utvalgte<br />
                <em className={styles.titleItalic}>Modellene</em>
              </h1>
            </div>
            <p className={styles.headerDesc}>
              Utforsk vårt utvalg av ur i verdensklasse. Fra arven etter sveitsisk
              urmakerkunst til den tekniske presisjonen i moderne produksjon.
            </p>
          </header>

          <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>Produsent</h3>
                {BRANDS.map(brand => (
                  <label key={brand} className={styles.checkRow}>
                    <span
                      className={`${styles.box} ${selectedBrands.includes(brand) ? styles.boxChecked : ''}`}
                      onClick={() => setSelectedBrands(p => toggle(p, brand))}
                    />
                    <span className={styles.checkLabel}>{brand}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>Urverk</h3>
                {MOVEMENTS.map(m => (
                  <label key={m} className={styles.checkRow}>
                    <span
                      className={`${styles.box} ${selectedMovements.includes(m) ? styles.boxChecked : ''}`}
                      onClick={() => setSelectedMovements(p => toggle(p, m))}
                    />
                    <span className={styles.checkLabel}>{m}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <h3 className={styles.filterTitle}>Investering</h3>
                <div className={styles.rangeWrap}>
                  <input
                    type="range"
                    min="10000"
                    max="250000"
                    step="5000"
                    value={priceMax}
                    onChange={e => setPriceMax(Number(e.target.value))}
                    className={styles.range}
                  />
                  <div className={styles.rangeLabels}>
                    <span>$10K</span>
                    <span>${(priceMax / 1000).toFixed(0)}K+</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content */}
            <section className={styles.content}>
              <div className={styles.contentHeader}>
                <span className={styles.resultCount}>
                  Viser {filtered.length} av {watches.length} mesterverk
                </span>
                <div className={styles.sortRow}>
                  <span className={styles.sortLabel}>Sorter etter:</span>
                  <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.grid}>
                {filtered.map((watch, i) => (
                  <div key={watch.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                    <WatchCard watch={watch} />
                  </div>
                ))}
              </div>

              {filtered.length > 6 && (
                <div className={styles.loadMore}>
                  <button className={styles.loadMoreBtn}>Oppdag flere modeller</button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <ComparisonBar />
    </>
  )
}
