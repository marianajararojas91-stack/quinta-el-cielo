import gsap from 'gsap';

/**
 * Magnetic button effect - buttons follow mouse on hover
 * Creates a premium, interactive feel
 */
export function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('[data-magnetic]');

  magneticButtons.forEach((button) => {
    const btn = button as HTMLElement;

    btn.addEventListener('mouseenter', function() {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', function() {
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });

    btn.addEventListener('mousemove', function(e: MouseEvent) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

/**
 * Add ripple effect on click
 */
export function initRippleEffect() {
  const buttons = document.querySelectorAll('[data-ripple]');

  buttons.forEach((button) => {
    button.addEventListener('click', function(e: Event) {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const mouseEvent = e as MouseEvent;

      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = mouseEvent.clientX - rect.left - size / 2;
      const y = mouseEvent.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 0.6
        },
        {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    });
  });
}
