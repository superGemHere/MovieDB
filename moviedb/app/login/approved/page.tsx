"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/context/authContext"
import styles from "../page.module.css"
import approvedStyles from "./approved.module.css"

export default function LoginApprovedPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { loginWithToken } = useAuth()

  useEffect(() => {
    const requestToken = searchParams.get("request_token")
    const denied = searchParams.get("denied")

    const completeAuthentication = async () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated")
      if (isAuthenticated) {
        if (window.location.pathname !== "/profile") {
          router.push("/profile")
        }
        return
      }

      if (denied === "true") {
        setStatus("error")
        setErrorMessage("Authentication was denied. Please try again.")
        return
      }

      if (!requestToken) {
        setStatus("error")
        setErrorMessage("No authentication token found. Please try again.")
        return
      }

      try {
        await loginWithToken(requestToken)
        setStatus("success")

        localStorage.setItem("isAuthenticated", "true")

        setTimeout(() => {
          router.push("/profile")
        }, 2000)
      } catch (err) {
        setStatus("error")
        setErrorMessage("Authentication failed. Please try again.")
      }
    }

    if (!isAuthChecked) {
      completeAuthentication()
      setIsAuthChecked(true)
    }
  }, [searchParams, loginWithToken, router, isAuthChecked])

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        {status === "loading" && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Completing authentication...</p>
          </div>
        )}

        {status === "success" && (
          <div className={approvedStyles.successState}>
            <CheckCircle className={approvedStyles.successIcon} size={60} />
            <h1 className={approvedStyles.title}>Authentication Successful</h1>
            <p className={approvedStyles.message}>You have successfully authenticated with TMDB.</p>
            <p className={approvedStyles.redirectMessage}>Redirecting to your profile...</p>
          </div>
        )}

        {status === "error" && (
          <div className={approvedStyles.errorState}>
            <XCircle className={approvedStyles.errorIcon} size={60} />
            <h1 className={approvedStyles.title}>Authentication Failed</h1>
            <p className={approvedStyles.message}>{errorMessage}</p>
            <button className={approvedStyles.retryButton} onClick={() => router.push("/login")}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
