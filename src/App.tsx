import React, { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.tsx'
import Footer from './components/layout/Footer.tsx'
import HomePage from './pages/HomePage.tsx'
import SearchPage from './pages/SearchPage.tsx'
import CatalogPage from './pages/CatalogPage.tsx'
import ProductDetailPage from './pages/ProductDetailPage.tsx'
import ComparisonPage from './pages/ComparisonPage.tsx'
import { Watch } from './types/watch.ts'

interface ComparisonContextType {
  comparisonList: Watch[]
  addToComparison: (watch: Watch) => void
  removeFromComparison: (id: string) => void
  isInComparison: (id: string) => boolean
}

export const ComparisonContext = createContext<ComparisonContextType | null>(null)

export function useComparison(): ComparisonContextType {
  const ctx = useContext(ComparisonContext)
  if (!ctx) throw new Error('useComparison must be used within ComparisonContext')
  return ctx
}

export default function App() {
  const [comparisonList, setComparisonList] = useState<Watch[]>([])

  const addToComparison = (watch: Watch) => {
    setComparisonList(prev => {
      if (prev.find(w => w.id === watch.id)) return prev
      if (prev.length >= 3) return prev
      return [...prev, watch]
    })
  }

  const removeFromComparison = (id: string) => {
    setComparisonList(prev => prev.filter(w => w.id !== id))
  }

  const isInComparison = (id: string) => comparisonList.some(w => w.id === id)

  return (
    <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison, isInComparison }}>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kolleksjoner" element={<CatalogPage />} />
            <Route path="/sok" element={<SearchPage />} />
            <Route path="/ur/:id" element={<ProductDetailPage />} />
            <Route path="/sammenligning" element={<ComparisonPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ComparisonContext.Provider>
  )
}
