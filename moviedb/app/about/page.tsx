import Image from "next/image"
import Link from "next/link"
import { Film, Users, Award, MessageSquare } from "lucide-react"
import styles from "./page.module.css"
import logo from "@/public/logo.webp"
import person1 from "@/public/person1.webp"
import person2 from "@/public/person2.webp"
import person3 from "@/public/person3.webp"
import person4 from "@/public/person4.webp"

const personArr = [
  {name: 'John Doe', image:person2, position: 'Founder & CEO'},
  {name: 'Jane Smith', image:person1, position: 'Chief Technology Officer'},
  {name: 'Bob Tennesy', image:person3, position: 'Lead Designer'},
  {name: 'Alice Johnson', image:person4, position: 'Head of Content'},
]

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>About MovieDB Info</h1>
          <p className={styles.subtitle}>Your ultimate destination for discovering and exploring movies</p>
          <p className={styles.subtitle}>Keep in mind this is just a portfolio project with a lot of dummy data, the project is not for commercial use and none of the info bellow is real.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <p>
                MovieDB Info was founded in 2025 with a simple mission: Portfolio project but also to help movie enthusiasts discover and explore films
                from around the world. What started as a passion project has grown into a comprehensive platform used by
                millions of movie lovers globally.
              </p>
              <p>
                Our team consists of film buffs, developers, and data scientists who are dedicated to creating the best
                possible movie discovery experience. We believe that great stories have the power to inspire, educate,
                and bring people together.
              </p>
              <p>
                Today, MovieDB Info offers information on thousands of movies thanks to TMDB, from Hollywood blockbusters to independent
                gems. We're constantly improving our platform and adding new features to enhance your movie exploration
                journey.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image
                src={logo}
                alt="MovieDB Info Team"
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
            {personArr.map((member) => (
              <div key={member.name} className={styles.teamMember}>
                <div className={styles.memberAvatar}>
                  <Image
                    src={member.image}
                    alt={`Team Member ${member.name}`}
                    width={300}
                    height={300}
                    className={styles.avatarImage}
                  />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>
                  {member.position}
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
            <p>Sign up today and start your movie discovery journey with MovieDB Info.</p>
            <div className={styles.ctaButtons}>
              <a
                href="https://www.themoviedb.org/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >Create Account</a>
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

