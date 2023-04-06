<script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('https://sammies01.github.io/expense-manager/sw.js' {scope: '/sammies01.github.io/expense-manager/'})
                .then(registration => {
                    console.log('Service worker registered:', registration);
                })
                .catch(error => {
                    console.error('Service worker registration failed:', error);
                });
        }
    </script>
