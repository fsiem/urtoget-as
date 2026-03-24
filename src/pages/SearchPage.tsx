import React, { useState, useMemo } from 'react'
import watchesData from '../data/watches.json'
import { Watch } from '../types/watch.ts'
import WatchCard from '../components/ui/WatchCard.tsx'
import ComparisonBar from '../components/ui/ComparisonBar.tsx'
import styles from './SearchPage.module.css'

const watches = watchesData as Watch[]
const BRANDS = ['Patek Philippe', 'Audemars Piguet', 'Vacheron Constantin', 'Rolex', 'Cartier', 'IWC Schaffhausen']
const MOVEMENTS = ['Manuelt opptrekk', 'Automatisk', 'Tourbillon']
const MATERIALS = ['Rustfritt stål', 'Rosegull', 'Platina', 'Titan']
const SORT_OPTIONS = ['Utvalgte', 'Pris: Lav til høy', 'Pris: Høy til lav', 'Nye ankomster']

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.filterSection}>
      <button className={styles.filterSectionBtn} onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <span className={open ? styles.chevronOpen : styles.chevronClosed}>∧</span>
      </button>
      {open && <div className={styles.filterSectionBody}>{children}</div>}
    </div>
  )
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedMovements, setSelectedMovements] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [sort, setSort] = useState('Utvalgte')

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    watches.forEach(w => { counts[w.brand] = (counts[w.brand] ?? 0) + 1 })
    return counts
  }, [])

  const toggle = (prev: string[], val: string) =>
    prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]

  const filtered = useMemo(() => {
    let list = [...watches]
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(w =>
        w.model.toLowerCase().includes(q) ||
        w.brand.toLowerCase().includes(q) ||
        (w.ref?.toLowerCase().includes(q) ?? false) ||
        (w.tags?.some(t => t.toLowerCase().includes(q)) ?? false)
      )
    }
    if (selectedBrands.length > 0) list = list.filter(w => selectedBrands.includes(w.brand))
    if (selectedMovements.length > 0) list = list.filter(w => selectedMovements.includes(w.movementType))
    if (selectedMaterials.length > 0) {
      list = list.filter(w => selectedMaterials.some(m =>
        w.caseMaterial?.toLowerCase().includes(m.toLowerCase().replace('18k ', ''))
      ))
    }
    if (sort === 'Pris: Lav til høy') list.sort((a, b) => a.price - b.price)
    else if (sort === 'Pris: Høy til lav') list.sort((a, b) => b.price - a.price)
    else if (sort === 'Nye ankomster') list = [...list.filter(w => w.isNew), ...list.filter(w => !w.isNew)]
    return list
  }, [query, selectedBrands, selectedMovements, selectedMaterials, sort])

  return (
    <>
      <div className={styles.page}>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>Utforsk modellene</h1>
            <div className={styles.searchBarWrap}>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Søk etter modell, referanse eller komplikasjon..."
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}><SearchIcon /></span>
            </div>
          </div>
        </div>

        <div className={`${styles.layout} container`}>
          <aside className={styles.sidebar}>
            <FilterSection title="Produsenter">
              {BRANDS.map(brand => (
                <button key={brand}
                  className={`${styles.brandRow} ${selectedBrands.includes(brand) ? styles.brandRowActive : ''}`}
                  onClick={() => setSelectedBrands(p => toggle(p, brand))}
                >
                  <span className={styles.brandLabel}>{brand}</span>
                  <span className={styles.brandCount}>{brandCounts[brand] ?? 0}</span>
                  {selectedBrands.includes(brand) && <CheckMark />}
                </button>
              ))}
            </FilterSection>

            <FilterSection title="Urverkstype">
              {MOVEMENTS.map(m => (
                <label key={m} className={styles.checkRow}>
                  <span
                    className={`${styles.customCheck} ${selectedMovements.includes(m) ? styles.customCheckActive : ''}`}
                    onClick={() => setSelectedMovements(p => toggle(p, m))}
                  >{selectedMovements.includes(m) ? '✓' : ''}</span>
                  <span className={styles.checkLabel}>{m}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Kassemateriale">
              <div className={styles.chips}>
                {MATERIALS.map(mat => (
                  <button key={mat}
                    className={`${styles.chip} ${selectedMaterials.includes(mat) ? styles.chipActive : ''}`}
                    onClick={() => setSelectedMaterials(p => toggle(p, mat))}
                  >{mat}</button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Verdiutvikling">
              <div className={styles.rangeWrap}>
                <input type="range" min="10000" max="250000" defaultValue="250000" className={styles.range} />
                <div className={styles.rangeLabels}><span>$10,000</span><span>$250,000+</span></div>
              </div>
            </FilterSection>
          </aside>

          <section className={styles.content}>
            <div className={styles.contentHeader}>
              <span className={styles.resultCount}>Viser {filtered.length} ur</span>
              <div className={styles.sortRow}>
                <span className={styles.sortLabel}>Sorter etter: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>Ingen ur matcher dine filtre.</p>
                <button onClick={() => { setSelectedBrands([]); setSelectedMovements([]); setSelectedMaterials([]) }}>
                  Nullstill filtre
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((watch, i) => (
                  <div key={watch.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                    <WatchCard watch={watch} />
                  </div>
                ))}
              </div>
            )}

            {filtered.length > 6 && (
              <div className={styles.loadMore}>
                <button className={styles.loadMoreBtn}>Utforsk mer</button>
              </div>
            )}
          </section>
        </div>
      </div>
      <ComparisonBar />
    </>
  )
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const CheckMark = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
