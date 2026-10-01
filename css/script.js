// GM Cuisine Factory - Core Application Scripts

// Modal Elements
const imageModal = document.getElementById('imageModal');
const shareModal = document.getElementById('shareModal');
const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');
const imageModalClose = document.getElementById('imageModalClose');
const shareModalClose = document.getElementById('shareModalClose');

// Close modals when clicking outside
window.addEventListener('click', function (event) {
    if (event.target === imageModal && imageModal) {
        imageModal.style.display = 'none';
    }
    if (event.target === shareModal && shareModal) {
        shareModal.style.display = 'none';
    }
});

// Image Preview Modal
function openImageModal(e) {
    if (!imageModal || !modalImg) return;
    imageModal.style.display = 'block';
    modalImg.src = e.src;
    if (captionText) {
        captionText.innerHTML = e.alt || '';
    }
}

if (imageModalClose) {
    imageModalClose.onclick = function () {
        if (imageModal) imageModal.style.display = 'none';
    };
}

// Share Modal
function openShareModal(e, title) {
    title = title || 'GM Cuisine Factory | Luxury Catering';
    if (navigator.share) {
        navigator.share({
            title: title,
            url: window.location.href,
        }).catch(function(err) {
            console.log('Share dismissed or failed:', err);
        });
    } else if (shareModal) {
        shareModal.style.display = 'flex';
    }
}

if (shareModalClose) {
    shareModalClose.onclick = function () {
        if (shareModal) shareModal.style.display = 'none';
    };
}

// Custom WhatsApp Sharing
function handleCustomWhatsappShare() {
    const inputElem = document.getElementById('whatsapp-input');
    if (!inputElem) return;
    let mobile = inputElem.value.trim().replace(/[^0-9]/g, '');
    if (mobile.length < 10) {
        alert('Please enter a valid 10-digit mobile number');
        inputElem.focus();
        return;
    }
    if (mobile.length === 10) {
        mobile = '91' + mobile;
    }
    const message = encodeURIComponent('Please check GM Cuisine Factory digital card: ' + window.location.href);
    window.open(`https://wa.me/${mobile}?text=${message}`, '_blank');
}

function handleDirectWhatsappShare(e) {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent("Please check GM Cuisine Factory digital card: " + window.location.href)}`;
    window.open(shareUrl, '_blank');
}

// PWA Install Prompt (if applicable)
window.addEventListener('DOMContentLoaded', () => {
    let deferredPrompt;
    const saveBtn = document.querySelector('.save-card-button');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (saveBtn) {
            saveBtn.style.display = 'block';
            saveBtn.addEventListener('click', () => {
                saveBtn.style.display = 'none';
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(() => {
                    deferredPrompt = null;
                });
            });
        }
    });
});
