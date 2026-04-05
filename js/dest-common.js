window.toggleMobileDropdown = function(el) {
    const sub = el.nextElementSibling;
    const arrow = el.querySelector('.mob-arrow');
    const isOpen = !sub.classList.contains('hidden');
    document.querySelectorAll('.mob-sub').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.mob-arrow').forEach(a => a.style.transform = '');
    if (!isOpen) {
        sub.classList.remove('hidden');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
};

window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger i');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    if (hamburger) hamburger.className = isHidden ? 'fas fa-times' : 'fas fa-bars';
};

window.openConsultModal = function () {
    const modalHTML =
        '<div id="consult-modal" class="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4" onclick="if(event.target.id===\'consult-modal\') closeConsultModal()">' +
        '<div class="bg-white rounded-3xl p-8 max-w-md w-full relative" onclick="event.stopImmediatePropagation()">' +
        '<h2 class="text-3xl font-bold text-cyan-700 mb-2">Talk to Travel Expert</h2>' +
        '<p class="text-cyan-600 mb-8">Get personalized itinerary in 60 seconds</p>' +
        '<form onsubmit="submitConsultForm(event)" class="space-y-6">' +
        '<input type="text" id="name" placeholder="Your Full Name" required class="w-full px-6 py-4 rounded-2xl border border-cyan-200 focus:border-cyan-500 outline-none">' +
        '<input type="tel" id="phone" placeholder="WhatsApp Number (+91)" required class="w-full px-6 py-4 rounded-2xl border border-cyan-200 focus:border-cyan-500 outline-none">' +
        '<textarea id="message" rows="4" placeholder="Tell us about your dream trip..." class="w-full px-6 py-4 rounded-2xl border border-cyan-200 focus:border-cyan-500 outline-none"></textarea>' +
        '<button type="submit" class="w-full py-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg rounded-3xl">Get Free Consultation Now</button>' +
        '</form>' +
        '<button onclick="closeConsultModal()" class="absolute top-6 right-6 text-3xl text-cyan-400 hover:text-cyan-600">✕</button>' +
        '</div></div>';

    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div);
};

window.closeConsultModal = function () {
    const modal = document.getElementById('consult-modal');
    if (modal) modal.remove();
};

window.submitConsultForm = function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const text = `Hello, I want to book a tour!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/919971904999?text=${text}`, '_blank');
    closeConsultModal();
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeConsultModal();
});
