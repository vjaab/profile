// Visitor Alerts using EmailJS

// ---------------------------------------------------------
// CONFIGURATION REQUIRED: Replace these with your actual keys from EmailJS
// ---------------------------------------------------------
const EMAILJS_PUBLIC_KEY = '9FuAupRanr-T7YiSd'; // e.g., 'user_123abc'
const EMAILJS_SERVICE_ID = 'service_9gy6i6m'; // e.g., 'service_xyz'
const EMAILJS_TEMPLATE_ID = 'template_q70ltm8'; // e.g., 'template_123'
// ---------------------------------------------------------

(function () {
    // Check if we've already sent an alert this session
    if (sessionStorage.getItem('vj_visitor_alert_sent')) {
        console.log('[Alerts] Visitor alert already sent this session.');
        return;
    }

    // Function to send email
    function sendVisitorAlert() {
        // Guard clause removed as keys are now configured


        emailjs.init(EMAILJS_PUBLIC_KEY);

        const templateParams = {
            message: 'New visitor on your profile page!',
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            timestamp: new Date().toLocaleString()
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function (response) {
                console.log('[Alerts] SUCCESS! Visitor alert sent.', response.status, response.text);
                // Mark as sent for this session
                sessionStorage.setItem('vj_visitor_alert_sent', 'true');
            }, function (error) {
                console.error('[Alerts] FAILED to send visitor alert.', error);
            });
    }

    // Wait for EmailJS SDK to load
    window.addEventListener('load', function () {
        // Simple delay to ensure SDK is ready and not block initial render
        setTimeout(sendVisitorAlert, 2000);
    });

})();
