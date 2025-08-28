document.addEventListener("DOMContentLoaded", () => {
      // Initialize all animations and interactions
      initScrollAnimations()
      initTypingEffect()
      animateCounter()
      initTiltEffect()
      initSmoothScrolling()
      initFormAnimations()
      initParallaxEffect()
    })

    // Scroll Animations
    function initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")

            // Trigger counter animation for stats
            if (entry.target.classList.contains("stat-number")) {
              animateCounter(entry.target)
            }
          }
        })
      }, observerOptions)

      // Observe elements for reveal animations
      document
        .querySelectorAll(".reveal-text, .slide-in-left, .slide-in-right, .fade-in-up, .stat-number")
        .forEach((el) => {
          observer.observe(el)
        })
    }

    // Typing Effect for Hero Title
    function initTypingEffect() {
      const typingText = document.querySelector(".typing-text")
      if (!typingText) return

      const text = typingText.textContent
      typingText.textContent = ""

      let i = 0
      const typeWriter = () => {
        if (i < text.length) {
          typingText.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        }
      }

      // Start typing after a short delay
      setTimeout(typeWriter, 1000)
    }

    // Counter Animation for Stats
    function animateCounter(element) {
      if (element && element.classList.contains("animated")) return
      if (!element) {
        element = document.querySelector(".stat-number")
      }
      element.classList.add("animated")

      const target = Number.parseInt(element.getAttribute("data-count"))
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const updateCounter = () => {
        current += increment
        if (current < target) {
          element.textContent = Math.floor(current)
          requestAnimationFrame(updateCounter)
        } else {
          element.textContent = target
        }
      }

      updateCounter()
    }

    // Tilt Effect for Cards
    function initTiltEffect() {
      const tiltElements = document.querySelectorAll("[data-tilt]")

      tiltElements.forEach((element) => {
        element.addEventListener("mousemove", (e) => {
          const rect = element.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateX = (y - centerY) / 10
          const rotateY = (centerX - x) / 10

          element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
        })

        element.addEventListener("mouseleave", () => {
          element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
        })
      })
    }

    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault()
          const target = document.querySelector(this.getAttribute("href"))
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        })
      })
    }

    // Form Animations and Interactions
    function initFormAnimations() {
      const form = document.querySelector(".contact-form")
      if (!form) return

      // Add focus animations to inputs
      const inputs = form.querySelectorAll(".animated-input")
      inputs.forEach((input) => {
        input.addEventListener("focus", function () {
          this.parentElement.classList.add("focused")
        })

        input.addEventListener("blur", function () {
          if (!this.value) {
            this.parentElement.classList.remove("focused")
          }
        })
      })

      // Form submission with animation
      form.addEventListener("submit", (e) => {
        e.preventDefault()

        const submitBtn = form.querySelector(".btn-submit")
        const originalText = submitBtn.innerHTML

        // Animate button
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true

        // Simulate form submission
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
          submitBtn.style.background = "linear-gradient(135deg, #4ecdc4, #44a08d)"

          setTimeout(() => {
            submitBtn.innerHTML = originalText
            submitBtn.disabled = false
            submitBtn.style.background = ""
            form.reset()
          }, 2000)
        }, 2000)
      })
    }

    // Parallax Effect for Background Elements
    function initParallaxEffect() {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll(".floating-shapes .shape")

        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + index * 0.1
          const yPos = -(scrolled * speed)
          element.style.transform = `translateY(${yPos}px)`
        })
      })
    }

    // Navbar Background Change on Scroll
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".glass-nav")
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(10, 10, 10, 0.95)"
        navbar.style.backdropFilter = "blur(30px)"
      } else {
        navbar.style.background = "rgba(10, 10, 10, 0.8)"
        navbar.style.backdropFilter = "blur(20px)"
      }
    })

    // Add loading animation
    window.addEventListener("load", () => {
      document.body.classList.add("loaded")

      // Trigger initial animations
      setTimeout(() => {
        document.querySelectorAll(".fade-in-up, .slide-in-left, .slide-in-right").forEach((el, index) => {
          setTimeout(() => {
            el.style.animationDelay = "0s"
            el.classList.add("revealed")
          }, index * 100)
        })
      }, 500)
    })

    // Add mouse trail effect
    document.addEventListener("mousemove", (e) => {
      const trail = document.createElement("div")
      trail.className = "mouse-trail"
      trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 3}px;
        top: ${e.clientY - 3}px;
        opacity: 0.7;
        animation: trailFade 0.5s ease-out forwards;
      `

      document.body.appendChild(trail)

      setTimeout(() => {
        trail.remove()
      }, 500)
    })

    // Easter egg: Konami code
    const konamiCode = []
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

    document.addEventListener("keydown", (e) => {
      konamiCode.push(e.keyCode)
      if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift()
      }

      if (konamiCode.join(",") === konamiSequence.join(",")) {
        // Activate special effect
        document.body.style.animation = "rainbow 2s ease-in-out"
        setTimeout(() => {
          document.body.style.animation = ""
        }, 2000)
      }
    })
