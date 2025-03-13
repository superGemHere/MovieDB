"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import styles from "./search-bar.module.css"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
    const queryParam = searchParams.get("q") || ""
    setQuery(queryParam)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }



  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for movies, TV shows, actors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <Search className={styles.searchIcon} />
          <span>Search</span>
        </button>
      </div>
    </form>
  )
}

