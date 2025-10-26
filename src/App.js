// API Base URL
const API_BASE = 'http://localhost:4000/api';

// Utility Functions
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function getTransactions() {
    return fetchJSON(`${API_BASE}/transactions`);
}

async function getTransaction(id) {
    return fetchJSON(`${API_BASE}/transactions/${id}`);
}

async function deleteTransaction(id) {
    const response = await fetch(`${API_BASE}/transactions/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function createTransaction(transaction) {
    const response = await fetch(`${API_BASE}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function getContacts() {
    return fetchJSON(`${API_BASE}/contacts`);
}

async function createContact(contact) {
    const response = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function deleteContact(id) {
    const response = await fetch(`${API_BASE}/contacts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

function loadContactsIntoSelect(selectElement, includeBlank = true) {
    getContacts().then(contacts => {
        selectElement.innerHTML = '';
        if (includeBlank) {
            const blankOption = document.createElement('option');
            blankOption.value = '';
            blankOption.textContent = '-- Select Contact --';
            selectElement.appendChild(blankOption);
        }
        contacts.forEach(contact => {
            const option = document.createElement('option');
            option.value = contact.id;
            option.textContent = contact.name + (contact.phone ? ` (${contact.phone})` : '');
            selectElement.appendChild(option);
        });
    }).catch(err => {
        console.error('Error loading contacts:', err);
        selectElement.innerHTML = '<option value="">Error loading contacts</option>';
    });
}

function directionClass(direction) {
    return direction === 'incoming' ? 'tag-incoming' : 'tag-outgoing';
}

// Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Theme Management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button text
    const themeText = document.querySelector('.theme-text');
    if (themeText) {
        themeText.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
    
    showNotification(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'info', 2000);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const themeText = document.querySelector('.theme-text');
    if (themeText) {
        themeText.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
}

// Initialize theme when app.js loads
document.addEventListener('DOMContentLoaded', initTheme);

// Error handling for API calls
function handleApiError(error, customMessage = 'Operation failed') {
    console.error('API Error:', error);
    
    if (error.message.includes('Failed to fetch')) {
        showNotification('Cannot connect to server. Make sure the backend is running on port 4000.', 'error');
    } else {
        showNotification(`${customMessage}: ${error.message}`, 'error');
    }
}

// Format currency with proper symbols
function formatCurrency(amount) {
    return '₹' + Math.abs(Number(amount)).toFixed(2);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('mobile-open');
    });
    
    document.body.appendChild(mobileMenuBtn);
    
    // Show mobile menu button on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 900) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
            document.querySelector('.sidebar').classList.remove('mobile-open');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu);
