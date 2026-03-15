// Analytics Configuration
const ANALYTICS_KEY = 'vj_profile_analytics';

// 1. Click Tracking Logic
document.addEventListener('click', (e) => {
    // We only care about buttons and links (and their children)
    const target = e.target.closest('a, button, .btn');

    if (target) {
        // Generate a unique ID for the element
        const id = target.id || '';
        const classes = Array.from(target.classList).join('.');
        const text = target.innerText.slice(0, 30).trim() || 'Icon/Image';
        const href = target.getAttribute('href') || '';

        // Create a readable key
        let key = text;
        if (id) key += ` (#${id})`;
        else if (href) key += ` (${href})`;

        // Save to LocalStorage
        const data = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '{}');
        data[key] = (data[key] || 0) + 1;
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));

        console.log(`[Analytics] Tracked click: ${key}`);
    }
});

// 2. Modal Rendering Logic
function openAnalyticsModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById('analytics-modal');
    if (existingModal) existingModal.remove();

    // Get Data
    const data = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '{}');
    const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]); // Sort by count descending

    // Create Modal HTML
    const modal = document.createElement('div');
    modal.id = 'analytics-modal';
    modal.className = 'analytics-modal-backdrop';

    let listItems = '';
    if (sortedEntries.length === 0) {
        listItems = '<p class="no-data">No clicks recorded yet. Try clicking some buttons!</p>';
    } else {
        // Calculate max for bar width
        const maxCount = sortedEntries[0][1];

        listItems = sortedEntries.map(([name, count]) => {
            const percent = (count / maxCount) * 100;
            return `
                <div class="analytics-item">
                    <div class="analytics-info">
                        <span class="analytics-name">${name}</span>
                        <span class="analytics-count">${count} clicks</span>
                    </div>
                    <div class="analytics-bar-bg">
                        <div class="analytics-bar-fill" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    modal.innerHTML = `
        <div class="analytics-content glass">
            <div class="analytics-header">
                <h2>📊 Click Analytics</h2>
                <button onclick="closeAnalyticsModal()" class="close-btn">&times;</button>
            </div>
            <div class="analytics-body">
                ${listItems}
            </div>
            <div class="analytics-footer">
                <button onclick="resetAnalytics()" class="btn-reset">Reset Data</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    requestAnimationFrame(() => {
        modal.classList.add('visible');
    });
}

function closeAnalyticsModal() {
    const modal = document.getElementById('analytics-modal');
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => modal.remove(), 300);
    }
}

function resetAnalytics() {
    if (confirm('Are you sure you want to clear all analytics data?')) {
        localStorage.removeItem(ANALYTICS_KEY);
        closeAnalyticsModal();
        setTimeout(openAnalyticsModal, 300); // Re-open empty
    }
}

// Global exposure for onclick handlers
window.openAnalyticsModal = openAnalyticsModal;
window.closeAnalyticsModal = closeAnalyticsModal;
window.resetAnalytics = resetAnalytics;
