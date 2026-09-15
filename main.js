/**
 * AMEERAZ BEAUTY SALON - MAIN APPLICATION ARCHITECTURE
 * Handles Core UI Interactions, Mobile Navigation, Forms, and WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --- Navigation & Mobile Menu Handler --- */
  const initNavigation = () => {
    const header = document.getElementById('main-header');
    const hamburgerBtn = document.getElementById('hamburger-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header Scroll State
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile Hamburger Menu Toggle
    if (hamburgerBtn && navMenu) {
      hamburgerBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Close menu on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          closeMenu();
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburgerBtn.contains(e.target)) {
          closeMenu();
        }
      });

      // Close menu when clicking any nav link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (navMenu.classList.contains('active')) {
            closeMenu();
          }
        });
      });
    }

    function openMenu() {
      navMenu.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    }

    function closeMenu() {
      navMenu.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  };

  /* --- WhatsApp Dynamic Appointment Form --- */
  const initAppointmentForm = () => {
    const form = document.getElementById('whatsapp-appointment-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('user-name')?.value.trim();
      const phone = document.getElementById('user-phone')?.value.trim();
      const service = document.getElementById('service-select')?.value;
      const date = document.getElementById('preferred-date')?.value;
      const time = document.getElementById('preferred-time')?.value;
      const notes = document.getElementById('user-message')?.value.trim();

      if (!name || !phone || !service || !date || !time) {
        alert('Please fill out all required fields.');
        return;
      }

      // Format WhatsApp Message
      let message = `Hello Ameeraz Beauty Salon,\n\nI would like to request an appointment:\n`;
      message += `• *Name:* ${name}\n`;
      message += `• *Phone:* ${phone}\n`;
      message += `• *Service:* ${service}\n`;
      message += `• *Preferred Date:* ${date}\n`;
      message += `• *Preferred Time:* ${time}\n`;
      if (notes) {
        message += `• *Additional Notes:* ${notes}\n`;
      }
      message += `\nPlease let me know if this slot is available. Thank you!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/923228484442?text=${encodedMessage}`;

      // Open WhatsApp link
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    });
  };

  /* --- Services Page Category Filtering --- */
  const initServicesFilter = () => {
    const filterButtons = document.querySelectorAll('#services-filter-bar .filter-btn');
    const serviceCategories = document.querySelectorAll('.service-category-item');

    if (filterButtons.length === 0 || serviceCategories.length === 0) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter');

        // Update Active Button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter Categories
        serviceCategories.forEach(cat => {
          const categoryName = cat.getAttribute('data-category');
          if (filterVal === 'all' || filterVal === categoryName) {
            cat.style.display = 'block';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    });
  };

  // Initialize Modules
  initNavigation();
  initAppointmentForm();
  initServicesFilter();
});
