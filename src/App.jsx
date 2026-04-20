import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["Rooms", "Amenities", "Dining", "Gallery", "Contact"];

const rooms = [
  {
    name: "Palace Garden Villa",
    detail: "Private plunge pool, courtyard dining, and a garden-facing soaking bath.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Maharaja Terrace Suite",
    detail: "A royal suite with skyline views, carved screens, and sunset tea service.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Family Courtyard Residence",
    detail: "Two bedroom privacy, lounge pavilion, and lawn access for small gatherings.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
  },
];

const amenities = [
  "Botanical pool court",
  "Royal spa rituals",
  "Private event lawns",
  "Chef-led dining rooms",
  "Family concierge",
  "Electric city transfers",
];

const experiences = [
  {
    title: "Intimate Weddings",
    text: "Host haldi, mehendi, vows, and dinner under lantern-lit palms with palace service scaled for close family circles.",
  },
  {
    title: "Couples' Retreats",
    text: "Slow mornings, garden breakfasts, moonlit spa sessions, and suites designed for privacy inside the city.",
  },
  {
    title: "Family Weekends",
    text: "Poolside lunches, curated activities for kids, and generous residences that let every generation relax together.",
  },
];

const gallery = [
  {
    label: "Lotus Pool",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    label: "Royal Dining",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
  },
  {
    label: "Garden Events",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    label: "Spa Pavilion",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
  },
];

function splitWords(text) {
  return text.split(" ").map((word, index) => (
    <span className="hero-word" key={`${word}-${index}`}>
      {word}
    </span>
  ));
}

function App() {
  const rootRef = useRef(null);
  const galleryTrackRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.set(".hero-word", { yPercent: 110, rotate: 2 });
      gsap.set(".hero-kicker, .hero-copy, .hero-actions, .hero-meta, .nav-shell", {
        opacity: 0,
        y: 24,
      });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .to(".nav-shell", { opacity: 1, y: 0, duration: 0.8 })
        .to(".hero-word", { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.045 }, "-=0.45")
        .to(".hero-kicker, .hero-copy, .hero-actions, .hero-meta", {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
        }, "-=0.6")
        .from(".hero-crest", { scale: 0.72, opacity: 0, duration: 1 }, "-=1");

      gsap.to(".hero-media", {
        scale: 1.1,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".nav-shell", {
        backgroundColor: "rgba(20, 35, 25, 0.72)",
        borderColor: "rgba(244, 222, 168, 0.24)",
        scrollTrigger: {
          trigger: ".intro",
          start: "top top+=80",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray(".room-panel").forEach((panel) => {
        gsap.from(panel.querySelector("img"), {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const galleryTrack = galleryTrackRef.current;
      if (galleryTrack) {
        const horizontalDistance = () => galleryTrack.scrollWidth - window.innerWidth;
        gsap.to(galleryTrack, {
          x: () => -horizontalDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery-pin",
            start: "top top",
            end: () => `+=${horizontalDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.from(".testimonial-line", {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "power3.out",
        duration: 1.1,
        scrollTrigger: {
          trigger: ".testimonials",
          start: "top 70%",
        },
      });
    }, rootRef);

    return () => {
      context.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank you. The resort team will contact you shortly.");
  };

  return (
    <main ref={rootRef}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand-lockup" href="#top" aria-label="resort home">
          <span>V</span>
          resort
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">
          Book Now
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="hero-crest" aria-hidden="true">
          VR
        </div>
        <div className="hero-content">
          <p className="hero-kicker">Royal eco-luxury in the heart of the city</p>
          <h1>{splitWords("A palace hideaway made for slow celebrations.")}</h1>
          <p className="hero-copy">
            resort brings garden villas, intimate event lawns, spa rituals, and chef-led
            dining into one serene city escape.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Reserve Your Stay
            </a>
            <a className="text-button" href="#gallery">
              Explore the resort
            </a>
          </div>
        </div>
        <div className="hero-meta">
          <span>Couples</span>
          <span>Families</span>
          <span>Small Weddings</span>
        </div>
      </section>

      <section className="intro section-pad">
        <div className="section-label reveal">City Escape</div>
        <div className="intro-grid">
          <h2 className="reveal">
            A resort that feels ceremonial without ever leaving the city behind.
          </h2>
          <p className="reveal">
            Designed for weekend stays, family milestones, and intimate celebrations, Varda
            balances palace-inspired hospitality with quiet eco-conscious living.
          </p>
        </div>
      </section>

      <section className="rooms section-pad" id="rooms">
        <div className="section-heading reveal">
          <p className="section-label">Rooms and Villas</p>
          <h2>Private sanctuaries with garden rhythm and royal detail.</h2>
        </div>
        <div className="room-list">
          {rooms.map((room, index) => (
            <article className="room-panel reveal" key={room.name}>
              <div className="room-index">0{index + 1}</div>
              <div className="room-copy">
                <h3>{room.name}</h3>
                <p>{room.detail}</p>
              </div>
              <div className="room-image">
                <img src={room.image} alt={room.name} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="amenities section-pad" id="amenities">
        <div className="amenity-image reveal">
          <img
            src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1500&q=85"
            alt="Resort courtyard with pool and palms"
            data-parallax
            loading="lazy"
          />
        </div>
        <div className="amenity-content reveal">
          <p className="section-label">Amenities</p>
          <h2>Everything is tuned for pause, privacy, and beautiful family moments.</h2>
          <div className="amenity-list">
            {amenities.map((amenity) => (
              <span key={amenity}>{amenity}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="dining section-pad" id="dining">
        <div className="dining-copy reveal">
          <p className="section-label">Dining and Spa</p>
          <h2>Seasonal menus, restorative rituals, and evenings that unfold slowly.</h2>
          <p>
            From breakfast in a private courtyard to candlelit dinners after a spa ceremony, every
            detail is composed with the calm precision of a modern palace.
          </p>
        </div>
        <div className="dining-visuals">
          <img
            className="dining-main reveal"
            src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1300&q=85"
            alt="Elegant resort dining table"
            loading="lazy"
          />
          <img
            className="dining-float reveal"
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=85"
            alt="Spa treatment room"
            loading="lazy"
          />
        </div>
      </section>

      <section className="experiences section-pad" id="experiences">
        <div className="section-heading reveal">
          <p className="section-label">Experiences</p>
          <h2>Built for the moments people gather for.</h2>
        </div>
        <div className="experience-grid">
          {experiences.map((experience, index) => (
            <article className="experience-item reveal" key={experience.title}>
              <span>0{index + 1}</span>
              <h3>{experience.title}</h3>
              <p>{experience.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-pin" id="gallery">
        <div className="gallery-intro">
          <p className="section-label">Gallery</p>
          <h2>Move through the resort like an evening arrival.</h2>
        </div>
        <div className="gallery-track" ref={galleryTrackRef}>
          {gallery.map((item) => (
            <figure className="gallery-frame" key={item.label}>
              <img src={item.image} alt={item.label} loading="lazy" />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="testimonials section-pad" id="testimonials">
        <div className="testimonial-line" />
        <blockquote className="reveal">
          "resortfelt like leaving the city without losing its ease. Our family wedding weekend was
          intimate, elegant, and completely cared for."
        </blockquote>
        <p className="reveal">Aarav and Meera, private family celebration</p>
      </section>

      <section className="booking section-pad" id="contact">
        <div className="booking-copy reveal">
          <p className="section-label">Booking</p>
          <h2>Plan a stay, a celebration, or a quiet city escape.</h2>
          <p>
            Share your dates and occasion. Our team will respond with availability, villa options,
            and a tailored experience plan.
          </p>
          <div className="contact-lines">
            <span>reservations@resortort.com</span>
            <span>+91 98765 43210</span>
          </div>
        </div>
        <form className="booking-form reveal" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your full name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Visit Type
            <select name="visitType" defaultValue="Stay">
              <option>Stay</option>
              <option>Wedding or family event</option>
              <option>Dining or spa</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              placeholder="Tell us your dates, guest count, or celebration plan"
              rows="4"
            />
          </label>
          <button className="primary-button" type="submit">
            Send Booking Request
          </button>
        </form>
      </section>

      <footer>
        <a className="brand-lockup" href="#top">
          <span>V</span>
          resort
        </a>
        <p>Royal eco-luxury for intimate city escapes.</p>
      </footer>
    </main>
  );
}

export default App;
