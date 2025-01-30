// Theme Toggle
const themeButton = document.getElementById('themeButton');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme and charts together
function initializeApp() {
    // Set initial theme
    currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme); // Changed to documentElement
    themeButton.innerHTML = currentTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
        
    // Initialize charts
    initializeCharts();
    
    // Apply theme colors to charts immediately
    updateChartColors();
    
    // Start live updates
    simulateLiveData();
    setInterval(simulateLiveData, 3000);
    setInterval(updateCharts, 5000);
}

themeButton.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme); // Changed to documentElement
    localStorage.setItem('theme', currentTheme);
    themeButton.innerHTML = currentTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    updateChartColors();
});

// Sidebar
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Chart color management
function updateChartColors() {
    userGrowthChart.data.datasets[0].borderColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--chart1');
    resourceChart.data.datasets[0].backgroundColor = [
        getComputedStyle(document.documentElement).getPropertyValue('--chart1'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart2'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart3'),
        getComputedStyle(document.documentElement).getPropertyValue('--danger')
    ];
    revenueChart.data.datasets[0].backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--chart2');
    
    userGrowthChart.update();
    resourceChart.update();
    revenueChart.update();
}

// Live Data Simulation
let peakSpeed = 250;
function simulateLiveData() {
    // Users Online
    const usersOnline = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    const userTrend = Math.floor(Math.random() * 30) - 15;
    document.getElementById('usersOnline').textContent = usersOnline.toLocaleString();
    const trendElement = document.querySelector('.metric-trend');
    trendElement.innerHTML = `<i class="fas fa-arrow-${userTrend >= 0 ? 'up' : 'down'}"></i>
                             <span style="color: ${userTrend >= 0 ? '#10b981' : '#ef4444'}">
                             ${Math.abs(userTrend)}%</span>`;

    // CPU Usage
    const cpuUsage = Math.floor(Math.random() * 100);
    document.getElementById('cpuUsage').textContent = `${cpuUsage}%`;
    document.getElementById('cpuProgress').style.width = `${cpuUsage}%`;

    // Network Speed
    const networkSpeed = Math.floor(Math.random() * 400);
    document.getElementById('networkSpeed').textContent = `${networkSpeed} Mbps`;
    if(networkSpeed > peakSpeed) peakSpeed = networkSpeed;
    document.querySelector('.metric-subtext').textContent = `Peak: ${peakSpeed} Mbps`;
}

// Initialize Charts with proper colors
let userGrowthChart, resourceChart, revenueChart;

function initializeCharts() {
    const ctx1 = document.getElementById('userGrowthChart');
    const ctx2 = document.getElementById('resourceChart');
    const ctx3 = document.getElementById('revenueChart');
    
    // User Growth Chart
    userGrowthChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Active Users',
                data: [500, 1200, 800, 1500, 2000, 1800],
                borderColor: 'var(--chart1)',
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: 'var(--background)',
                pointBorderColor: 'var(--chart1)',
                pointBorderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--text)',
                        font: {
                            color: 'var(--text)'
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'var(--border)' },
                    ticks: { 
                        color: 'var(--text)',
                        font: {
                            color: 'var(--text)'
                        }
                    }
                },
                y: {
                    grid: { color: 'var(--border)' },
                    ticks: { 
                        color: 'var(--text)',
                        font: {
                            color: 'var(--text)'
                        }
                    }
                }
            }
        }
    });
    
    // Resource Chart
    resourceChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['CPU', 'Memory', 'Storage', 'Network'],
            datasets: [{
                data: [25, 35, 20, 20],
                backgroundColor: [
                    'var(--chart1)',
                    'var(--chart2)',
                    'var(--chart3)',
                    'var(--danger)'
                ],
                borderColor: 'var(--card-bg)',
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--text)',
                        font: {
                            color: 'var(--text)'
                        }
                    }
                }
            }
        }
    });
    
    // Revenue Chart
    revenueChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Revenue (USD)',
                data: [25000, 32000, 41000, 38500],
                backgroundColor: 'var(--chart2)',
                borderColor: 'var(--chart2)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--text)',
                        font: {
                            color: 'var(--text)'
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'var(--border)' },
                    ticks: { 
                        color: 'var(--text)',
                        font: {
                            color: 'var(--text)'
                        }
                    }
                },
                y: {
                    grid: { color: 'var(--border)' },
                    ticks: { 
                        color: 'var(--text)',
                        font: {
                            color: 'var(--text)'
                        }
                    }
                }
            }
        }
    });
}

// Update charts periodically
function updateCharts() {
    userGrowthChart.data.datasets[0].data = 
        Array.from({length: 6}, () => Math.floor(Math.random() * 2500));
    userGrowthChart.update();
    
    resourceChart.data.datasets[0].data = 
        [Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50];
    resourceChart.update();
    
    revenueChart.data.datasets[0].data = 
        Array.from({length: 4}, () => Math.floor(Math.random() * 50000));
    revenueChart.update();
}

// Initialize everything
initializeApp();

// Responsive Charts
window.addEventListener('resize', () => {
    userGrowthChart.resize();
    resourceChart.resize();
    revenueChart.resize();
});

const resizeObserver = new ResizeObserver(() => {
    userGrowthChart.resize();
    resourceChart.resize();
    revenueChart.resize();
});

resizeObserver.observe(document.querySelector('.main-content'));