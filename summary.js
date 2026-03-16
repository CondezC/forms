const firebaseConfig = {
    apiKey: "AIzaSyCfQTN7UTRcW9lBm-rhRqyAOcT5gFZDJIs",
    authDomain: "sss-qr-system-39b59.firebaseapp.com",
    projectId: "sss-qr-system-39b59",
    storageBucket: "sss-qr-system-39b59.firebasestorage.app",
    messagingSenderId: "81090026028",
    appId: "1:81090026028:web:91dfd833462e2d95434f89"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Run immediately
(async function() {
    console.log("✅ Summary.js started");
    
    const container = document.getElementById('summaryContainer');
    if (!container) {
        console.error("❌ Container not found");
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const submissionId = urlParams.get('id');
    console.log("📌 Submission ID:", submissionId);
    
    if (!submissionId) {
        container.innerHTML = '<div class="error-message">❌ No ID found</div>';
        return;
    }

    try {
        container.innerHTML = '<div class="loading">Loading...</div>';
        
        const docRef = db.collection('sss-submissions').doc(submissionId);
        const docSnap = await docRef.get();

        if (!docSnap.exists()) {
            container.innerHTML = '<div class="error-message">❌ Data not found</div>';
            return;
        }

        const data = docSnap.data();
        console.log("📦 Full data from Firebase:", data);
        
        // SIMPLE DISPLAY - para makita lang natin kung may laman
        let html = '<div style="padding: 20px;">';
        html += '<h2>Data Received</h2>';
        html += '<pre style="background: #f5f5f5; padding: 15px; overflow: auto;">';
        html += JSON.stringify(data, null, 2);
        html += '</pre>';
        html += '</div>';
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error("❌ Error:", error);
        container.innerHTML = '<div class="error-message">❌ Error: ' + error.message + '</div>';
    }
})();