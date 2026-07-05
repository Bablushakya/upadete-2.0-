// Switch Dashboard Tabs
function switchTab(tab) {
    const appsSection = document.getElementById('applications-section');
    const callsSection = document.getElementById('calls-section');
    const appTabBtn = document.getElementById('tab-applications');
    const callTabBtn = document.getElementById('tab-calls');

    if (!appsSection || !callsSection || !appTabBtn || !callTabBtn) return;

    if (tab === 'applications') {
        appsSection.classList.remove('hidden');
        callsSection.classList.add('hidden');
        
        appTabBtn.classList.add('text-primary', 'border-primary', 'font-bold');
        appTabBtn.classList.remove('text-on-surface-variant/60', 'border-transparent');
        
        callTabBtn.classList.remove('text-primary', 'border-primary', 'font-bold');
        callTabBtn.classList.add('text-on-surface-variant/60', 'border-transparent');
    } else {
        callsSection.classList.remove('hidden');
        appsSection.classList.add('hidden');
        
        callTabBtn.classList.add('text-primary', 'border-primary', 'font-bold');
        callTabBtn.classList.remove('text-on-surface-variant/60', 'border-transparent');
        
        appTabBtn.classList.remove('text-primary', 'border-primary', 'font-bold');
        appTabBtn.classList.add('text-on-surface-variant/60', 'border-transparent');
    }
}

// Format Dates
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatShortDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Load Data from LocalStorage
function loadData() {
    const apps = JSON.parse(localStorage.getItem('applications') || '[]');
    const calls = JSON.parse(localStorage.getItem('discovery_calls') || '[]');
    const subsCount = JSON.parse(localStorage.getItem('subscribers') || '[]').length || 0;

    // Update Badges & Counters
    const totalAppsEl = document.getElementById('total-apps');
    const totalCallsEl = document.getElementById('total-calls');
    const totalSubsEl = document.getElementById('total-subs');
    const appsBadgeEl = document.getElementById('apps-badge');
    const callsBadgeEl = document.getElementById('calls-badge');

    if (totalAppsEl) totalAppsEl.textContent = apps.length;
    if (totalCallsEl) totalCallsEl.textContent = calls.length;
    if (totalSubsEl) totalSubsEl.textContent = subsCount;

    if (appsBadgeEl) appsBadgeEl.textContent = `${apps.length} application${apps.length === 1 ? '' : 's'}`;
    if (callsBadgeEl) callsBadgeEl.textContent = `${calls.length} request${calls.length === 1 ? '' : 's'}`;

    // Populate Applications
    const appsTbody = document.getElementById('apps-tbody');
    if (appsTbody) {
        if (apps.length === 0) {
            appsTbody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-8 text-center text-on-surface-variant/60 italic bg-white">
                        No applications submitted yet. Generate demo data to preview.
                    </td>
                </tr>
            `;
        } else {
            appsTbody.innerHTML = apps.map(app => `
                <tr class="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                    <td class="p-4 font-bold text-primary">${escapeHtml(app.name)}</td>
                    <td class="p-4 leading-normal whitespace-nowrap">
                        <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] opacity-70">mail</span> ${escapeHtml(app.email)}</div>
                        <div class="flex items-center gap-1 text-xs text-on-surface-variant"><span class="material-symbols-outlined text-[14px] opacity-70">phone</span> ${escapeHtml(app.phone)}</div>
                    </td>
                    <td class="p-4 leading-normal">
                        <span class="inline-block text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded mb-1">${escapeHtml(app.business_type)}</span>
                        ${app.company_name ? `<div class="text-xs text-on-surface-variant font-bold">${escapeHtml(app.company_name)}</div>` : ''}
                        ${app.sourcing_experience ? `<div class="text-[11px] text-on-surface-variant/70">Exp: ${escapeHtml(app.sourcing_experience)}</div>` : ''}
                    </td>
                    <td class="p-4 max-w-xs truncate leading-normal text-xs" title="${escapeHtml(app.goals || 'No specific goals described.')}">
                        <div class="italic text-on-surface-variant">${escapeHtml(app.goals || '-')}</div>
                        ${app.hearing_from ? `<div class="text-[10px] text-on-surface-variant/60 mt-1">Source: ${escapeHtml(app.hearing_from)}</div>` : ''}
                    </td>
                    <td class="p-4 font-mono text-xs text-on-surface-variant whitespace-nowrap">${formatDate(app.created_at)}</td>
                    <td class="p-4 text-center">
                        <button onclick="deleteRecord('applications', ${app.id})" class="text-error/70 hover:text-error transition-colors focus:outline-none" title="Delete record">
                            <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Populate Discovery Calls
    const callsTbody = document.getElementById('calls-tbody');
    if (callsTbody) {
        if (calls.length === 0) {
            callsTbody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-8 text-center text-on-surface-variant/60 italic bg-white">
                        No discovery calls scheduled yet. Generate demo data to preview.
                    </td>
                </tr>
            `;
        } else {
            callsTbody.innerHTML = calls.map(call => `
                <tr class="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                    <td class="p-4 font-bold text-primary">${escapeHtml(call.name)}</td>
                    <td class="p-4 leading-normal whitespace-nowrap">
                        <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] opacity-70">mail</span> ${escapeHtml(call.email)}</div>
                        <div class="flex items-center gap-1 text-xs text-on-surface-variant"><span class="material-symbols-outlined text-[14px] opacity-70">phone</span> ${escapeHtml(call.phone)}</div>
                        ${call.company_name ? `<div class="text-xs text-on-surface-variant/80 mt-1"><span class="font-bold">Co:</span> ${escapeHtml(call.company_name)}</div>` : ''}
                    </td>
                    <td class="p-4 leading-normal whitespace-nowrap">
                        <div class="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded inline-flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">calendar_today</span>
                            ${formatShortDate(call.preferred_date)}
                        </div>
                        <div class="text-xs text-on-surface-variant mt-1.5 font-bold flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">schedule</span>
                            ${escapeHtml(call.preferred_time)}
                        </div>
                    </td>
                    <td class="p-4 max-w-xs truncate leading-normal text-xs text-on-surface-variant italic" title="${escapeHtml(call.questions || 'No specific questions.')}">
                        ${escapeHtml(call.questions || '-')}
                    </td>
                    <td class="p-4 font-mono text-xs text-on-surface-variant whitespace-nowrap">${formatDate(call.created_at)}</td>
                    <td class="p-4 text-center">
                        <button onclick="deleteRecord('discovery_calls', ${call.id})" class="text-error/70 hover:text-error transition-colors focus:outline-none" title="Delete record">
                            <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// Delete Single Record
function deleteRecord(type, id) {
    if (confirm('Are you sure you want to delete this record?')) {
        const records = JSON.parse(localStorage.getItem(type) || '[]');
        const filtered = records.filter(item => item.id !== id);
        localStorage.setItem(type, JSON.stringify(filtered));
        
        loadData();
        showAdminToast('Record deleted successfully.');
    }
}

// Clear All Data
function clearData() {
    if (confirm('CAUTION: Are you sure you want to delete ALL application and call records from localStorage? This action cannot be undone.')) {
        localStorage.removeItem('applications');
        localStorage.removeItem('discovery_calls');
        localStorage.removeItem('subscribers');
        
        loadData();
        showAdminToast('All localStorage records cleared successfully.', 'info');
    }
}

// Generate Demo Data for Previewing
function generateDemoData() {
    const demoApps = [
        {
            id: 1000000000001,
            name: 'Alexandra Vance',
            email: 'alexandra@vancedecor.co',
            phone: '+1 (415) 392-1240',
            business_type: 'Boutique Owner',
            company_name: 'Vance Home & Living',
            sourcing_experience: 'Some Sourcing Experience',
            goals: 'Looking to source high-end block printed textiles, marble accessories, and custom brass cabinet hardware from artisans in Jaipur.',
            hearing_from: 'Instagram Sourcing Reel',
            created_at: new Date(Date.now() - 3600000 * 2.5).toISOString() // 2.5 hours ago
        },
        {
            id: 1000000000002,
            name: 'Marcus Brody',
            email: 'marcus@brodybrands.com',
            phone: '+44 7911 123456',
            business_type: 'Brand Founder',
            company_name: 'Brody Rugs & Carpets',
            sourcing_experience: 'Experienced Importer',
            goals: 'Seeking to establish direct relationships with master weavers in Agra and Mirzapur for a new line of organic wool rugs.',
            hearing_from: 'Industry newsletter recommendation',
            created_at: new Date(Date.now() - 3600000 * 18).toISOString() // 18 hours ago
        },
        {
            id: 1000000000003,
            name: 'Sophia Patel',
            email: 'sophia@patel-design.com',
            phone: '+1 (646) 555-8291',
            business_type: 'Interior Designer',
            company_name: 'Patel Atelier',
            sourcing_experience: 'No Experience (Beginner)',
            goals: 'Hoping to curate unique, story-driven furniture and lighting pieces for high-end residential projects in NYC.',
            hearing_from: 'Friend referred me',
            created_at: new Date(Date.now() - 3600000 * 52).toISOString() // 2.2 days ago
        }
    ];

    const demoCalls = [
        {
            id: 2000000000001,
            name: 'Eleanor Sterling',
            email: 'eleanor@sterlingtable.com',
            phone: '+1 (312) 555-7382',
            company_name: 'Sterling Tableware',
            preferred_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days from now
            preferred_time: 'Afternoon (12:00 PM - 4:00 PM)',
            questions: 'Can I arrange for custom ceramic samples to be produced and shipped to the US during the trip? What is the average timeline for shipping freight?',
            created_at: new Date(Date.now() - 3600000 * 1.2).toISOString()
        },
        {
            id: 2000000000002,
            name: 'Jonathan Miller',
            email: 'jon@miller-organic.com',
            phone: '+1 (503) 555-0922',
            company_name: 'Miller Organic Linens',
            preferred_date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days from now
            preferred_time: 'Morning (9:00 AM - 12:00 PM)',
            questions: 'Interested in finding organic GOTS certified cotton suppliers. Does our itinerary include visits to certified eco-friendly weavers?',
            created_at: new Date(Date.now() - 3600000 * 29).toISOString()
        }
    ];

    const demoSubs = [
        { id: 1, email: 'info@chicboutique.com', created_at: new Date().toISOString() },
        { id: 2, email: 'hello@luxedesigns.co', created_at: new Date().toISOString() },
        { id: 3, email: 'sourcing_news@gmail.com', created_at: new Date().toISOString() },
        { id: 4, email: 'retail_mag@yahoo.com', created_at: new Date().toISOString() }
    ];

    localStorage.setItem('applications', JSON.stringify(demoApps));
    localStorage.setItem('discovery_calls', JSON.stringify(demoCalls));
    localStorage.setItem('subscribers', JSON.stringify(demoSubs));

    loadData();
    showAdminToast('Demo records loaded successfully! Feel free to test the tables.', 'success');
}

// HTML Escape Helper
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Admin Toast System
function showAdminToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `flex items-center gap-3 bg-white text-on-surface border border-primary/10 px-5 py-3 rounded-xl shadow-lg transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto max-w-sm text-xs font-mono`;
    
    let iconColor = 'text-gold';
    let iconName = 'check_circle';
    if (type === 'error') {
        iconColor = 'text-error';
        iconName = 'error';
    } else if (type === 'info') {
        iconColor = 'text-primary';
        iconName = 'info';
    }
    
    toast.innerHTML = `
        <span class="material-symbols-outlined ${iconColor} text-sm">${iconName}</span>
        <div class="flex-grow">
            <p class="leading-normal">${message}</p>
        </div>
    `;
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('opacity-0', 'translate-y-4');
    });
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Load data on page launch
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
