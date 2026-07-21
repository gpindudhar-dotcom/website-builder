document.querySelectorAll('.contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    const isValid = requiredFields.every((field) => field.value.trim() !== '');
    const note = form.querySelector('.form-note');
    if (!isValid) {
      if (note) note.textContent = 'Please fill out every required field before sending.';
      return;
    }
    if (note) note.textContent = 'Thank you! Your message has been received.';
    form.reset();
  });
});
