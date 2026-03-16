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

window.onload = async function() {
    displaySummary();
    addPrintStyles();
};

function addPrintStyles() {
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            body {
                background: white !important;
                padding: 0 !important;
            }
            
            .print-btn, .theme-toggle, .back-btn {
                display: none !important;
            }
            
            .summary-container {
                max-width: 100% !important;
                padding: 0 !important;
            }
            
            .summary-card {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
                page-break-inside: avoid !important;
                margin-bottom: 20px !important;
            }
            
            .card-header {
                background: #003c8f !important;
                color: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            .noted-section {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            .signature-img, .official-signature-img {
                max-width: 150px !important;
            }
            
            .info-table td, .officials-table td {
                border-color: #000 !important;
            }
        }
    `;
    document.head.appendChild(printStyles);
}

async function displaySummary() {
    const container = document.getElementById('summaryContainer');
    
    const urlParams = new URLSearchParams(window.location.search);
    const submissionId = urlParams.get('id');
    
    if (!submissionId) {
        container.innerHTML = '<div class="error-message">❌ No submission ID found</div>';
        return;
    }

    try {
        const docRef = db.collection('sss-submissions').doc(submissionId);
        const docSnap = await docRef.get();

        if (!docSnap.exists()) {
            container.innerHTML = '<div class="error-message">❌ Submission not found in cloud</div>';
            return;
        }

        const formData = docSnap.data();
        
        let html = '';
        
        html += '<div style="text-align: center; margin-bottom: 20px;">';
        html += '<span style="background: #4caf50; color: white; padding: 5px 15px; border-radius: 20px;">✓ VERIFIED CLOUD DATA</span>';
        html += '</div>';
        
        html += '<div class="summary-card">';
        html += '<div class="card-header">📋 COMPANY REPRESENTATIVE AUTHORIZATION CARD</div>';
        html += '<div class="card-body">';
        
        html += '<div class="summary-header">';
        html += '<div class="summary-logo">';
        html += '<img src="republic-of-the-philippines-social-security-system-logo-png_seeklogo.png" alt="SSS Logo" onerror="this.innerHTML=\'SSS\';">';
        html += '</div>';
        html += '<div class="summary-title">';
        html += '<h1>Social Security System</h1>';
        html += '<div class="branch">EASTWOOD BRANCH</div>';
        html += '<div>187 ABQ Building, E. Rodriguez Jr. Ave., Bagumbayan, QC</div>';
        html += '</div>';
        html += '</div>';
        
        const first = formData.firstForm || {};
        
        if (first.photo && first.photo !== '#') {
            html += '<div style="text-align: right; margin-bottom: 20px;">';
            html += '<div style="width: 120px; height: 120px; border: 2px solid #003c8f; border-radius: 8px; overflow: hidden; margin-left: auto;">';
            html += `<img src="${first.photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="1x1 Photo">`;
            html += '</div>';
            html += '</div>';
        }
        
        html += '<table class="info-table">';
        html += '<tr><td>EMPLOYER NAME:</td><td>' + (first.employerName || 'N/A') + '</td></tr>';
        html += '<tr><td>EMPLOYER ID NO.:</td><td>' + (first.employerId || 'N/A') + '</td></tr>';
        html += '<tr><td>ADDRESS:</td><td>' + (first.address || 'N/A') + '</td></tr>';
        html += '<tr><td>TELEPHONE NO.:</td><td>' + (first.telephone || 'N/A') + '</td></tr>';
        html += '<tr><td>CERTIFIED NAME:</td><td>' + (first.certName || 'N/A') + '</td></tr>';
        html += '<tr><td>SS NUMBER:</td><td>' + (first.ssNumber || 'N/A') + '</td></tr>';
        html += '</table>';
        
        html += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">';
        
        if (first.specimenSignature1) {
            html += '<div style="text-align: center;">';
            html += '<strong>SPECIMEN SIGNATURE</strong><br>';
            html += `<img src="${first.specimenSignature1}" class="signature-img" alt="Specimen Signature"><br>`;
            html += (first.specimenName1 || '');
            html += '</div>';
        }
        
        if (first.employerSignature) {
            html += '<div style="text-align: center;">';
            html += '<strong>SIGNATURE OVER PRINTED NAME</strong><br>';
            html += `<img src="${first.employerSignature}" class="signature-img" alt="Employer Signature"><br>`;
            html += (first.employerName2 || first.employerName || '');
            html += '</div>';
        }
        
        html += '</div>';
        
        html += '<div class="noted-section">';
        html += '<div class="noted-line"></div>';
        html += '<div class="noted-name">ELEANOR F. DEATO</div>';
        html += '<div class="noted-title">Branch Head</div>';
        html += '</div>';
        
        html += '</div></div>';
        
        html += '<div class="summary-card">';
        html += '<div class="card-header">📋 SPECIMEN SIGNATURE CARD</div>';
        html += '<div class="card-body">';
        
        html += '<div style="text-align: center; margin-bottom: 20px;">';
        html += '<h2 style="color: #003c8f;">Republic of the Philippines</h2>';
        html += '<h3 style="color: #1976d2;">SOCIAL SECURITY SYSTEM</h3>';
        html += '<div>SSS Form L - 501 (07-94)</div>';
        html += '</div>';
        
        const second = formData.secondForm || {};
        
        html += '<table class="info-table">';
        html += '<tr><td>Registered Employer Name:</td><td>' + (second.registeredName || first.employerName || 'N/A') + '</td></tr>';
        html += '<tr><td>I.D. No.:</td><td>' + (second.idNumber || first.employerId || 'N/A') + '</td></tr>';
        html += '<tr><td>Address:</td><td>' + (second.companyAddress || first.address || 'N/A') + '</td></tr>';
        html += '<tr><td>Tel. No.:</td><td>' + (second.telNumber || first.telephone || 'N/A') + '</td></tr>';
        html += '</table>';
        
        if (second.officials && second.officials.length > 0) {
            html += '<h3 style="color: #003c8f; margin: 20px 0 10px;">Authorized Officials</h3>';
            html += '<table class="officials-table">';
            html += '<tr><th>Name</th><th>Designation</th><th>Initials</th><th>Signature</th></tr>';
            
            second.officials.forEach(official => {
                html += '<tr>';
                html += '<td>' + (official.name || '') + '</td>';
                html += '<td>' + (official.designation || '') + '</td>';
                html += '<td>' + (official.initial || '') + '</td>';
                html += '<td>';
                if (official.signature) {
                    html += `<img src="${official.signature}" class="official-signature-img" alt="Signature">`;
                } else {
                    html += 'No signature';
                }
                html += '</td>';
                html += '</tr>';
            });
            
            html += '</table>';
        }
        
        const granting = second.grantingAuthority || {};
        if (granting.name || granting.signature) {
            html += '<div style="margin-top: 20px; padding: 15px; background: #f8f9ff; border-radius: 8px;">';
            html += '<h4 style="color: #003c8f;">Granting Authority</h4>';
            html += '<p><strong>' + (granting.name || 'N/A') + '</strong></p>';
            if (granting.signature) {
                html += `<img src="${granting.signature}" class="signature-img" alt="Granting Signature"><br>`;
            }
            if (granting.date) {
                html += '<p><strong>Date:</strong> ' + granting.date + '</p>';
            }
            html += '</div>';
        }
        
        html += '</div></div>';
        
        if (formData.timestamp) {
            html += '<div style="text-align: center; color: #888; margin: 20px;">';
            html += '📅 Generated: ' + new Date(formData.timestamp).toLocaleString();
            html += '</div>';
        }
        
        html += '<div style="text-align: center; margin: 30px 0;">';
        html += '<button class="primary-btn print-btn" onclick="window.print()" style="background: #003c8f; padding: 15px 40px;">';
        html += '🖨️ PRINT BOTH FORMS';
        html += '</button>';
        html += '</div>';
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading from Firebase:', error);
        container.innerHTML = '<div class="error-message">❌ Error loading data from cloud</div>';
    }
}