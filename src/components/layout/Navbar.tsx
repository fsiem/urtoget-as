import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useComparison } from '../../App.tsx'
import styles from './Navbar.module.css'

interface NavLink {
  label: string
  to: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Kolleksjoner', to: '/kolleksjoner' },
  { label: 'Merker', to: '/sok' },
  { label: 'Sammenligning', to: '/sammenligning' },
  { label: 'Arv', to: '/' },
  { label: 'Atelier', to: '/' },
]

export default function Navbar() {
  const location = useLocation()
  const { comparisonList } = useComparison()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>URTORGET</Link>
        <ul className={styles.links}>
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <Link
                to={link.to}
                className={`${styles.link} ${location.pathname === link.to ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.icons}>
          <button className={styles.icon} aria-label="Ønskeliste"><HeartIcon /></button>
          <button className={styles.icon} aria-label="Min konto"><UserIcon /></button>
          <button className={styles.icon} aria-label="Handlekurv" style={{ position: 'relative' }}>
            <BagIcon />
            {comparisonList.length > 0 && (
              <span className={styles.badge}>{comparisonList.length}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)
const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
