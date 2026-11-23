// ===== Apex Global University - MAIN JS =====

document.addEventListener('DOMContentLoaded', function() {

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
      nav.style.boxShadow = '0 5px 30px rgba(0,0,0,0.2)';
    } else {
      nav.classList.remove('scrolled');
      nav.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    }
  });

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const speed = 50;
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = Math.ceil(target / speed);
      if (count < target) {
        counter.innerText = Math.min(count + inc, target);
        setTimeout(animateCounters, 30);
      }
    });
  };

  // Intersection Observer for counters
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== 'javascript:void(0);') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Result form validation
  const resultForm = document.getElementById('result_form');
  if (resultForm) {
    resultForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const enrollment = document.getElementById('enrollment_number').value.trim();
      const exam = document.getElementById('examination_status').value;
      const yearSem = document.getElementById('year_sem').value;

      let valid = true;
      document.querySelectorAll('.error-msg').forEach(el => el.remove());

      if (!enrollment) {
        showError('enrollment_number', 'Please enter enrollment number');
        valid = false;
      }
      if (!exam) {
        showError('examination_status', 'Please select exam type');
        valid = false;
      }
      if (!yearSem) {
        showError('year_sem', 'Please select year/semester');
        valid = false;
      }

      if (valid) {
        // Show demo result
        const resultDiv = document.getElementById('resultDisplay');
        if (resultDiv) {
          resultDiv.innerHTML = `
            <div class="alert alert-info mt-4">
              <i class="fas fa-info-circle"></i>
              <strong>Demo Mode:</strong> This is a template website. No actual results are stored.
              <br>Searched for Enrollment: <strong>${enrollment}</strong>
            </div>
          `;
        }
      }
    });
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('is-invalid');
      const error = document.createElement('span');
      error.className = 'error-msg text-danger small';
      error.textContent = message;
      field.parentNode.appendChild(error);
      field.addEventListener('input', function() {
        field.classList.remove('is-invalid');
        const err = field.parentNode.querySelector('.error-msg');
        if (err) err.remove();
      }, { once: true });
    }
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your enquiry! This is a demo website template.');
      contactForm.reset();
    });
  }

  // Admission form
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Application submitted successfully! This is a demo website template.');
      admissionForm.reset();
    });
  }

});
