document.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let autoplayTimer;

        function goToSlide(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
            const content = slides[current].querySelector('.carousel-content');
            content.style.animation = 'none';
            content.offsetHeight;
            content.style.animation = '';
        }

        function startAutoplay() {
            autoplayTimer = setInterval(() => goToSlide(current + 1), 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayTimer);
            startAutoplay();
        }

        window.changeSlide = function(dir) {
            goToSlide(current + dir);
            resetAutoplay();
        };

        window.goToSlide = function(index) {
            goToSlide(index);
            resetAutoplay();
        };

        startAutoplay();

        window.scrollToDestination = function(destKey) {
            const card = document.getElementById('dest-' + destKey);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const packagesData = {
            ladakh: {
                name: 'Ladakh',
                tagline: 'Land of High Passes',
                img: 'assets/images/ladakh-classic.jpg',
                packages: [
                    { name: 'Leh Ladakh Classic', days: '7D/6N', people: '2 People', price: '₹28,999', img: 'assets/images/ladakh-classic.jpg' },
                    { name: 'Pangong Lake Special', days: '5D/4N', people: '2 People', price: '₹18,499', img: 'assets/images/pangong-lake.jpg' },
                    { name: 'Nubra Valley Explorer', days: '9D/8N', people: '4 People', price: '₹42,000', img: 'assets/images/nubra-valley.jpg' }
                ]
            },
            goa: {
                name: 'Goa',
                tagline: 'Sun, Sand & Sea',
                img: 'assets/images/goa-beach.jpg',
                packages: [
                    { name: 'Goa Beach Getaway', days: '4D/3N', people: '2 People', price: '₹12,999', img: 'assets/images/goa-beach.jpg' },
                    { name: 'North Goa Party Tour', days: '3D/2N', people: '4 People', price: '₹9,500', img: 'assets/images/north-goa.jpg' },
                    { name: 'Goa Honeymoon Special', days: '5D/4N', people: '2 People', price: '₹21,000', img: 'assets/images/goa-honeymoon.jpg' }
                ]
            },
            manali: {
                name: 'Manali',
                tagline: 'Snow Valley of Himachal',
                img: 'assets/images/manali-snow.jpg',
                packages: [
                    { name: 'Manali Snow Adventure', days: '5D/4N', people: '2 People', price: '₹15,500', img: 'assets/images/manali-snow.jpg' },
                    { name: 'Rohtang Pass Special', days: '4D/3N', people: '2 People', price: '₹13,000', img: 'assets/images/manali.jpg' },
                    { name: 'Spiti Valley Circuit', days: '9D/8N', people: '4 People', price: '₹38,000', img: 'assets/images/pangong-lake.jpg' }
                ]
            }
        };

        window.openPackages = function(destKey) {
            const data = packagesData[destKey];
            if (!data) return;

            const pkgCards = data.packages.map(p =>
                '<div class="border border-slate-200 rounded-[16px] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(6,182,212,0.15)] hover:-translate-y-1">' +
                '<img class="w-full h-[140px] object-cover" src="' + p.img + '" alt="' + p.name + '" />' +
                '<div class="p-4">' +
                '<h4 class="font-bold text-[15px] text-slate-900 mb-1.5">' + p.name + '</h4>' +
                '<div class="flex gap-3 text-xs text-slate-500 mb-2.5">' +
                '<span><i class="fas fa-clock mr-1"></i>' + p.days + '</span>' +
                '<span><i class="fas fa-users mr-1"></i>' + p.people + '</span>' +
                '</div>' +
                '<div class="text-[18px] font-bold text-cyan-600">' + p.price + ' <span class="text-xs font-normal text-slate-400">/ person</span></div>' +
                '<button class="block w-full mt-3 p-[9px] bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-[13px] border-none rounded-full cursor-pointer transition-colors" onclick="openConsultModal()">Book Now</button>' +
                '</div></div>'
            ).join('');

            document.getElementById('pkg-modal-content').innerHTML =
                '<div class="pkg-dest-header">' +
                '<img src="' + data.img + '" alt="' + data.name + '" />' +
                '<div><h2>' + data.name + '</h2><p>' + data.tagline + '</p></div>' +
                '</div>' +
                '<div class="pkg-cards-grid">' + pkgCards + '</div>';

            document.getElementById('pkg-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        window.closePackages = function() {
            document.getElementById('pkg-modal').classList.add('hidden');
            document.body.style.overflow = '';
        };

        window.toggleMobileMenu = function() {
            const menu = document.getElementById('mobile-menu');
            const hamburger = document.querySelector('.hamburger i');
            const isHidden = menu.classList.contains('hidden');
            menu.classList.toggle('hidden');
            if (hamburger) {
                hamburger.className = isHidden ? 'fas fa-times' : 'fas fa-bars';
            }
        };

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

        // Close mobile menu when a link is clicked
        document.addEventListener('click', function(e) {
            const menu = document.getElementById('mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (!menu || !hamburger) return;
            if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
                if (!menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                    const icon = hamburger.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        });

        window.openConsultModal = function() {
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

            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = modalHTML;
            document.body.appendChild(modalDiv);
        };

        window.closeConsultModal = function() {
            const modal = document.getElementById('consult-modal');
            if (modal) modal.remove();
        };

        window.submitConsultForm = function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const text = `Hello, I want to book a tour!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
            window.open(`https://wa.me/919971904999?text=${text}`, '_blank');
            closeConsultModal();
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closePackages();
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openConsultModal();
            }
        });

});
