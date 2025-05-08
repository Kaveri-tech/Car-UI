document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('click', () => {
            alert('More details about ' + feature.querySelector('h2').innerText);
        });
    });
});
