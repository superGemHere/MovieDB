"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import styles from "./page.module.css"

interface FaqItem {
  question: string
  answer: string
  category: string
}

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const faqItems: FaqItem[] = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the \"Sign Up\" button in the top right corner of the page. Fill in your details, including your name, email address, and password. Once you submit the form, you'll receive a verification email. Click the link in the email to verify your account, and you're all set!",
      category: "account",
    },
    {
      question: "Is MovieDB Info free to use?",
      answer:
        "Yes, MovieDB Info is completely free to use! You can browse movies, read reviews, and create watchlists without any cost. We also offer a premium subscription that provides additional features like advanced filtering, ad-free experience, and early access to new features.",
      category: "general",
    },
    {
      question: "How do I reset my password?",
      answer:
        'If you\'ve forgotten your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
      category: "account",
    },
    {
      question: "Can I contribute to the movie database?",
      answer:
        "We welcome contributions from our community. You can add missing information, correct errors, and submit reviews for movies. To contribute, you need to have a verified account. Once logged in, you'll see options to edit or add information on movie pages.",
      category: "content",
    },
    {
      question: "How often is the movie database updated?",
      answer:
        "Our database is updated daily with new releases, upcoming movies, and the latest information. Our team works around the clock to ensure that you have access to the most current and accurate movie data available.",
      category: "content",
    },
    {
      question: "How do I create and manage my watchlist?",
      answer:
        'To add a movie to your watchlist, simply click the "+ Add to Watchlist" button on any movie page. You can view and manage your watchlist by going to your profile and selecting the "Watchlist" tab. From there, you can remove movies or mark them as watched.',
      category: "features",
    },
    {
      question: "Can I share my reviews and watchlists with friends?",
      answer:
        'Yes! You can share your reviews and watchlists on social media or copy a direct link to share with friends. On your review or watchlist page, look for the share icons or the "Share" button to access these options.',
      category: "features",
    },
    {
      question: "How do I report inappropriate content or bugs?",
      answer:
        'If you come across inappropriate content or experience any bugs, please use the "Report" button available on all pages or contact us directly through our Contact page. Please provide as much detail as possible to help us address the issue quickly.',
      category: "support",
    },
  ]

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "account", name: "Account" },
    { id: "general", name: "General" },
    { id: "content", name: "Content" },
    { id: "features", name: "Features" },
    { id: "support", name: "Support" },
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const filteredFaqs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>Find answers to common questions about MovieDB Info</p>

          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.activeCategory : ""}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className={styles.faqList}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <span>{faq.question}</span>
                    {activeIndex === index ? (
                      <ChevronUp className={styles.faqIcon} />
                    ) : (
                      <ChevronDown className={styles.faqIcon} />
                    )}
                  </button>

                  {activeIndex === index && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No results found for "{searchQuery}"</p>
                <button
                  className={styles.resetButton}
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          <div className={styles.contactPrompt}>
            <h2>Still have questions?</h2>
            <p>If you couldn't find the answer to your question, feel free to contact our support team.</p>
            <a href="/contact" className={styles.contactButton}>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

