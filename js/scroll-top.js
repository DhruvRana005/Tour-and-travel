if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('load', function () {
    window.scrollTo({ top: 0, behavior: 'instant' });
});
