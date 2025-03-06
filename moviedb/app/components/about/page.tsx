import Image from "next/image"
import Link from "next/link"
import { Film, Users, Award, MessageSquare } from "lucide-react"
import styles from "./page.module.css"

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>About MovieDB</h1>
          <p className={styles.subtitle}>Your ultimate destination for discovering and exploring movies</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <p>
                MovieDB was founded in 2023 with a simple mission: to help movie enthusiasts discover and explore films
                from around the world. What started as a passion project has grown into a comprehensive platform used by
                millions of movie lovers globally.
              </p>
              <p>
                Our team consists of film buffs, developers, and data scientists who are dedicated to creating the best
                possible movie discovery experience. We believe that great stories have the power to inspire, educate,
                and bring people together.
              </p>
              <p>
                Today, MovieDB offers information on thousands of movies, from Hollywood blockbusters to independent
                gems. We're constantly improving our platform and adding new features to enhance your movie exploration
                journey.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="MovieDB Team"
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Film />
              </div>
              <h3>Extensive Database</h3>
              <p>Access information on thousands of movies, including ratings, cast, crew, and more.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Users />
              </div>
              <h3>Community</h3>
              <p>Connect with other movie enthusiasts, share recommendations, and discuss your favorite films.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Award />
              </div>
              <h3>Personalized Recommendations</h3>
              <p>Discover new movies tailored to your taste based on your viewing history and preferences.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <MessageSquare />
              </div>
              <h3>Reviews & Ratings</h3>
              <p>Read and write reviews, rate movies, and see what others think about the latest releases.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className={styles.teamMember}>
                <div className={styles.memberAvatar}>
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Team Member ${member}`}
                    alt={`Team Member ${member}`}
                    width={300}
                    height={300}
                    className={styles.avatarImage}
                  />
                </div>
                <h3 className={styles.memberName}>Team Member {member}</h3>
                <p className={styles.memberRole}>
                  {member === 1
                    ? "Founder & CEO"
                    : member === 2
                      ? "Chief Technology Officer"
                      : member === 3
                        ? "Head of Content"
                        : "Lead Designer"}
                </p>
                <p className={styles.memberBio}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                  sed erat molestie vehicula.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Join Our Community</h2>
            <p>Sign up today and start your movie discovery journey with MovieDB.</p>
            <div className={styles.ctaButtons}>
              <Link href="/register" className={styles.ctaButton}>
                Create Account
              </Link>
              <Link href="/contact" className={styles.ctaButtonSecondary}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

