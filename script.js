/* ═══════════════════════════════════════════════════════════════
   KAUSHAL JHARKHAND — Full App Logic
   Auth, Dashboards, Filters, Certificate, Mock Data
   ═══════════════════════════════════════════════════════════════ */

// ── MOCK TRAINEE DATA ──
const TRAINEES = [
    { id:1,name:'Birsa Murmu',age:22,gender:'Male',community:'Munda',district:'Khunti',phone:'9876543210',enrolled:'15 Jul 2026',courses:['Solar Panel Installation','Welding & Fabrication'],completed:['Solar Panel Installation'],videos:7,progress:72 },
    { id:2,name:'Sita Soren',age:19,gender:'Female',community:'Santhal',district:'Dumka',phone:'9812345678',enrolled:'20 Jul 2026',courses:['House Wiring & Electrician'],completed:[],videos:4,progress:45 },
    { id:3,name:'Raju Oraon',age:24,gender:'Male',community:'Oraon',district:'Gumla',phone:'9834567890',enrolled:'1 Aug 2026',courses:['Plumbing & Sanitation','Masonry & Construction'],completed:['Plumbing & Sanitation'],videos:9,progress:80 },
    { id:4,name:'Meena Hembram',age:20,gender:'Female',community:'Santhal',district:'Giridih',phone:'9856789012',enrolled:'5 Aug 2026',courses:['Solar Panel Installation'],completed:['Solar Panel Installation'],videos:6,progress:100 },
    { id:5,name:'Sunil Munda',age:26,gender:'Male',community:'Munda',district:'W.Singhbhum',phone:'9878901234',enrolled:'10 Aug 2026',courses:['Two-Wheeler Mechanic'],completed:[],videos:3,progress:30 },
    { id:6,name:'Lakhi Kisku',age:21,gender:'Female',community:'Santhal',district:'Dumka',phone:'9890123456',enrolled:'15 Aug 2026',courses:['Welding & Fabrication'],completed:[],videos:5,progress:55 },
    { id:7,name:'Mangal Ho',age:23,gender:'Male',community:'Ho',district:'W.Singhbhum',phone:'9801234567',enrolled:'20 Aug 2026',courses:['Masonry & Construction'],completed:[],videos:2,progress:25 },
    { id:8,name:'Phoolmani Kharia',age:18,gender:'Female',community:'Kharia',district:'Gumla',phone:'9823456789',enrolled:'25 Aug 2026',courses:['Solar Panel Installation'],completed:[],videos:4,progress:40 },
    { id:9,name:'Soma Gond',age:25,gender:'Male',community:'Gond',district:'Giridih',phone:'9845678901',enrolled:'1 Sep 2026',courses:['House Wiring & Electrician','Two-Wheeler Mechanic'],completed:['House Wiring & Electrician'],videos:11,progress:85 },
    { id:10,name:'Anjali Munda',age:20,gender:'Female',community:'Munda',district:'Khunti',phone:'9867890123',enrolled:'5 Sep 2026',courses:['Plumbing & Sanitation'],completed:['Plumbing & Sanitation'],videos:8,progress:100 },
    { id:11,name:'Deepak Soren',age:27,gender:'Male',community:'Santhal',district:'Dumka',phone:'9889012345',enrolled:'8 Sep 2026',courses:['Welding & Fabrication'],completed:[],videos:3,progress:35 },
    { id:12,name:'Savitri Ho',age:22,gender:'Female',community:'Ho',district:'W.Singhbhum',phone:'9800123456',enrolled:'10 Sep 2026',courses:['Rainwater Harvesting'],completed:['Rainwater Harvesting'],videos:5,progress:100 },
];

const COURSE_COLORS = {
    'Solar Panel Installation':'var(--orange)','House Wiring & Electrician':'var(--orange)',
    'EV Battery & Charger Tech':'var(--orange)','Two-Wheeler Mechanic':'var(--blue)',
    'Welding & Fabrication':'var(--blue)','Agri-Equipment Repair':'var(--blue)',
    'Plumbing & Sanitation':'var(--green)','Masonry & Construction':'var(--green)',
    'Rainwater Harvesting':'var(--green)','Road Construction Basics':'var(--green)'
};

const AVATAR_COLORS = ['#1a56db','#0d9488','#d97706','#7c3aed','#16a34a','#dc2626'];

document.addEventListener('DOMContentLoaded', () => {

    // ── NAVBAR SCROLL ──
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 100 && window.scrollY < s.offsetTop + s.clientHeight) current = s.id;
        });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
    });

    // ── MOBILE NAV ──
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navLinksEl.classList.toggle('open'); });
    navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { navToggle.classList.remove('active'); navLinksEl.classList.remove('open'); }));

    // ── SCROLL REVEAL ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }); }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObs.observe(el));

    // ── COURSE FILTERS ──
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            document.querySelectorAll('#coursesGrid .course-card').forEach(c => { c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none'; });
        });
    });

    // ── SCHEDULE FILTERS ──
    document.querySelectorAll('[data-sfilter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-sfilter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.sfilter;
            document.querySelectorAll('#schedBody tr').forEach(r => { r.style.display = (f === 'all' || r.dataset.centre === f) ? '' : 'none'; });
        });
    });

    // ── MODAL TABS ──
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('form-' + tab.dataset.tab).classList.add('active');
        });
    });

    // ── MODAL CLOSE ──
    document.getElementById('modalClose').addEventListener('click', () => { document.getElementById('loginModal').classList.remove('show'); });
    document.getElementById('loginModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('show'); });

    // ── MENTOR SEARCH & FILTER ──
    const mentorSearch = document.getElementById('mentorSearch');
    const mentorFilterCourse = document.getElementById('mentorFilterCourse');
    const mentorFilterStatus = document.getElementById('mentorFilterStatus');
    if (mentorSearch) mentorSearch.addEventListener('input', filterTrainees);
    if (mentorFilterCourse) mentorFilterCourse.addEventListener('change', filterTrainees);
    if (mentorFilterStatus) mentorFilterStatus.addEventListener('change', filterTrainees);

    // ── FORM VALIDATION ──
    const form = document.getElementById('regForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); let ok = true;
            [['inp-name','fg-name',v=>v.trim().length>0],['inp-age','fg-age',v=>{const n=parseInt(v);return n>=16&&n<=35}],['inp-gender','fg-gender',v=>v!==''],['inp-community','fg-community',v=>v!==''],['inp-district','fg-district',v=>v!==''],['inp-phone','fg-phone',v=>v.replace(/\D/g,'').length===10],['inp-course','fg-course',v=>v!=='']].forEach(([id,gid,check])=>{
                const el=document.getElementById(id),g=document.getElementById(gid);
                if(!check(el.value)){g.classList.add('error');ok=false}else{g.classList.remove('error')}
            });
            if(ok){form.style.display='none';document.getElementById('formSuccess').classList.add('show')}
        });
        form.querySelectorAll('.form-input,.form-select').forEach(inp=>{
            const h=()=>{const g=inp.closest('.form-group');if(g)g.classList.remove('error')};
            inp.addEventListener('input',h);inp.addEventListener('change',h);
        });
    }

    // ── CHECK SAVED LOGIN ──
    const saved = localStorage.getItem('kj_user');
    if (saved) {
        const user = JSON.parse(saved);
        if (user.role === 'trainee') showTraineeDash(user);
        else if (user.role === 'mentor') showMentorDash();
    }
});

// ── OPEN LOGIN MODAL ──
function openLogin() { document.getElementById('loginModal').classList.add('show'); }

// ── LOGIN TRAINEE ──
function loginTrainee() {
    const name = document.getElementById('login-t-name').value.trim();
    const phone = document.getElementById('login-t-phone').value.trim();
    if (!name || phone.replace(/\D/g,'').length !== 10) { alert('Please enter your name and valid 10-digit phone number.'); return; }
    const user = { role:'trainee', name, phone, enrolled: new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) };
    localStorage.setItem('kj_user', JSON.stringify(user));
    document.getElementById('loginModal').classList.remove('show');
    showTraineeDash(user);
}

// ── LOGIN MENTOR ──
function loginMentor() {
    const email = document.getElementById('login-m-email').value.trim();
    const pass = document.getElementById('login-m-pass').value;
    if (email !== 'mentor@kaushal.in' || pass !== 'mentor123') { alert('Invalid credentials.\n\nDemo: mentor@kaushal.in / mentor123'); return; }
    const user = { role:'mentor', name:'Mentor', email };
    localStorage.setItem('kj_user', JSON.stringify(user));
    document.getElementById('loginModal').classList.remove('show');
    showMentorDash();
}

// ── SHOW TRAINEE DASHBOARD ──
function showTraineeDash(user) {
    // Keep public site visible — dashboard shows above it
    document.getElementById('publicSite').style.display = '';
    document.getElementById('mentorDash').classList.remove('show');
    document.getElementById('traineeDash').classList.add('show');

    // Update nav — keep nav links visible
    document.getElementById('navSignin').style.display = 'none';
    document.getElementById('navProfile').classList.add('show');
    document.getElementById('navProfName').textContent = user.name;
    document.getElementById('navProfRole').textContent = '🎓 Trainee';
    document.getElementById('navAvatarSm').textContent = user.name.charAt(0).toUpperCase();

    // Keep nav links visible so trainee can browse courses, videos, schemes etc.
    document.getElementById('navLinks').style.display = '';

    // Hide hero section since dashboard replaces it
    const hero = document.getElementById('hero');
    if (hero) hero.style.display = 'none';

    // Update profile
    document.getElementById('t-profile-name').textContent = user.name;
    document.getElementById('t-profile-phone').textContent = '📱 ' + user.phone;
    document.getElementById('t-profile-date').textContent = '📅 Enrolled: ' + user.enrolled;
    document.getElementById('t-profile-community').textContent = '🏘️ Santhal';
    document.getElementById('t-profile-district').textContent = '📍 Dumka';

    // Certificate
    document.getElementById('cert-name').textContent = user.name;
    document.getElementById('cert-id').textContent = 'KJ-2026-' + String(Math.floor(Math.random()*9000)+1000);
    window.scrollTo(0,0);
}

// ── SHOW MENTOR DASHBOARD ──
function showMentorDash() {
    // Keep public site visible — dashboard shows above it
    document.getElementById('publicSite').style.display = '';
    document.getElementById('traineeDash').classList.remove('show');
    document.getElementById('mentorDash').classList.add('show');

    // Update nav — keep nav links visible
    document.getElementById('navSignin').style.display = 'none';
    document.getElementById('navProfile').classList.add('show');
    document.getElementById('navProfName').textContent = 'Mentor';
    document.getElementById('navProfRole').textContent = '👨‍🏫 Mentor';
    document.getElementById('navAvatarSm').textContent = 'M';
    document.getElementById('navLinks').style.display = '';

    // Hide hero section since dashboard replaces it
    const hero = document.getElementById('hero');
    if (hero) hero.style.display = 'none';

    // Render trainees table
    renderTraineesTable(TRAINEES);

    // Render course cards
    renderMentorCourses();
    window.scrollTo(0,0);
}

// ── RENDER TRAINEES TABLE ──
function renderTraineesTable(data) {
    const tbody = document.getElementById('traineeTableBody');
    tbody.innerHTML = data.map((t,i) => {
        const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
        const status = t.progress >= 100 ? 'Completed' : 'Active';
        const statusClass = status === 'Completed' ? 'background:var(--green-l);color:var(--green)' : 'background:var(--blue-l);color:var(--blue)';
        const fillColor = t.progress >= 100 ? 'var(--green)' : t.progress >= 50 ? 'var(--blue)' : 'var(--orange)';
        const completedList = t.completed.length > 0 ? t.completed.map(c => '✅ ' + c).join(', ') : 'None yet';
        const inProgressList = t.courses.filter(c => !t.completed.includes(c));
        const inProgressStr = inProgressList.length > 0 ? inProgressList.map(c => '🔄 ' + c).join(', ') : 'None';
        return `<tr class="trainee-row" data-name="${t.name.toLowerCase()}" data-course="${t.courses.join(',')}" data-status="${status}" data-tid="${t.id}" onclick="toggleTraineeDetail(this, ${t.id})" style="cursor:pointer">
            <td><div class="t-name"><div class="t-avatar" style="background:${color}">${t.name.charAt(0)}</div><div><strong>${t.name}</strong><div style="font-size:.65rem;color:var(--text-m)">${t.gender}, ${t.phone}</div></div></div></td>
            <td>${t.age}</td><td>${t.community}</td><td>📍 ${t.district}</td>
            <td><div style="font-size:.75rem;line-height:1.6">${t.courses.map(c=>'• '+c).join('<br>')}</div></td>
            <td>${t.enrolled}</td><td style="text-align:center">${t.videos}</td>
            <td><div class="progress-bar-sm"><div class="fill" style="width:${t.progress}%;background:${fillColor}"></div></div>${t.progress}%</td>
            <td><span class="status" style="${statusClass}">${status}</span></td></tr>
        <tr class="trainee-detail" id="detail-${t.id}" style="display:none">
            <td colspan="9">
                <div class="trainee-detail-panel">
                    <div class="tdp-grid">
                        <div class="tdp-section">
                            <h4>👤 Profile</h4>
                            <div class="tdp-item"><span class="tdp-label">Full Name:</span> ${t.name}</div>
                            <div class="tdp-item"><span class="tdp-label">Age:</span> ${t.age} years</div>
                            <div class="tdp-item"><span class="tdp-label">Gender:</span> ${t.gender}</div>
                            <div class="tdp-item"><span class="tdp-label">Community:</span> ${t.community}</div>
                            <div class="tdp-item"><span class="tdp-label">District:</span> ${t.district}</div>
                            <div class="tdp-item"><span class="tdp-label">Phone:</span> ${t.phone}</div>
                            <div class="tdp-item"><span class="tdp-label">Enrolled:</span> ${t.enrolled}</div>
                        </div>
                        <div class="tdp-section">
                            <h4>📚 Courses</h4>
                            <div class="tdp-item"><span class="tdp-label">Enrolled In:</span> ${t.courses.map(c => '• ' + c).join('<br>')}</div>
                            <div class="tdp-item"><span class="tdp-label">Completed:</span> ${completedList}</div>
                            <div class="tdp-item"><span class="tdp-label">In Progress:</span> ${inProgressStr}</div>
                        </div>
                        <div class="tdp-section">
                            <h4>📊 Progress</h4>
                            <div class="tdp-item"><span class="tdp-label">Overall:</span> ${t.progress}%</div>
                            <div class="my-course-progress" style="margin:8px 0"><div class="fill" style="width:${t.progress}%;background:${fillColor}"></div></div>
                            <div class="tdp-item"><span class="tdp-label">Videos Watched:</span> ${t.videos}</div>
                            <div class="tdp-item"><span class="tdp-label">Status:</span> <span class="status" style="${statusClass}">${status}</span></div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>`;
    }).join('');
}

// ── TOGGLE TRAINEE DETAIL PANEL ──
function toggleTraineeDetail(row, id) {
    const detail = document.getElementById('detail-' + id);
    if (!detail) return;
    const isVisible = detail.style.display !== 'none';
    // Close all other open details
    document.querySelectorAll('.trainee-detail').forEach(d => { d.style.display = 'none'; });
    document.querySelectorAll('.trainee-row').forEach(r => { r.classList.remove('row-active'); });
    if (!isVisible) {
        detail.style.display = '';
        row.classList.add('row-active');
        // Flash animation
        detail.querySelector('.trainee-detail-panel').classList.remove('flash');
        void detail.querySelector('.trainee-detail-panel').offsetWidth;
        detail.querySelector('.trainee-detail-panel').classList.add('flash');
    }
}

// ── FILTER TRAINEES ──
function filterTrainees() {
    const search = document.getElementById('mentorSearch').value.toLowerCase();
    const course = document.getElementById('mentorFilterCourse').value;
    const status = document.getElementById('mentorFilterStatus').value;

    const filtered = TRAINEES.filter(t => {
        if (search && !t.name.toLowerCase().includes(search)) return false;
        if (course !== 'all' && !t.courses.includes(course)) return false;
        if (status !== 'all') {
            const s = t.progress >= 100 ? 'Completed' : 'Active';
            if (s !== status) return false;
        }
        return true;
    });
    renderTraineesTable(filtered);
}

// ── RENDER MENTOR COURSE CARDS ──
function renderMentorCourses() {
    const courses = {};
    TRAINEES.forEach(t => {
        t.courses.forEach(c => {
            if (!courses[c]) courses[c] = { enrolled: 0, completed: 0 };
            courses[c].enrolled++;
            if (t.completed.includes(c)) courses[c].completed++;
        });
    });

    const container = document.getElementById('mentorCourseCards');
    container.innerHTML = Object.entries(courses).map(([name, data]) => {
        const color = COURSE_COLORS[name] || 'var(--blue)';
        const pct = Math.round((data.completed / data.enrolled) * 100);
        return `<div class="card" style="padding:18px;border-top:3px solid ${color}">
            <h3 style="font-size:.88rem;margin-bottom:8px">${name}</h3>
            <div style="display:flex;justify-content:space-between;font-size:.8rem;color:var(--text-s);margin-bottom:6px">
                <span>👥 ${data.enrolled} enrolled</span><span>✅ ${data.completed} completed</span>
            </div>
            <div class="my-course-progress"><div class="fill" style="width:${pct}%;background:${color}"></div></div>
            <div style="font-size:.72rem;color:var(--text-m);margin-top:4px">${pct}% completion rate</div>
        </div>`;
    }).join('');
}

// ── SIGN OUT ──
function signOut() {
    localStorage.removeItem('kj_user');
    document.getElementById('publicSite').style.display = '';
    document.getElementById('traineeDash').classList.remove('show');
    document.getElementById('mentorDash').classList.remove('show');
    document.getElementById('navSignin').style.display = '';
    document.getElementById('navProfile').classList.remove('show');
    document.getElementById('navLinks').style.display = '';
    // Restore hero section
    const hero = document.getElementById('hero');
    if (hero) hero.style.display = '';
    window.scrollTo(0,0);
}

// ── GO HOME (logo click) ──
function goHome() {
    if (localStorage.getItem('kj_user')) return; // if logged in, stay in dashboard
}

// ── UPLOAD AVATAR ──
function uploadAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const avatar = document.getElementById('traineeAvatar');
        avatar.innerHTML = `<img src="${e.target.result}" alt="Avatar"><input type="file" id="avatarUpload" accept="image/*" style="display:none" onchange="uploadAvatar(event)"><div class="avatar-upload" onclick="document.getElementById('avatarUpload').click()">📷 Change</div>`;
        // Update nav avatar too
        document.getElementById('navAvatarSm').innerHTML = `<img src="${e.target.result}" alt="">`;
    };
    reader.readAsDataURL(file);
}

// ── DOWNLOAD CERTIFICATE ──
function downloadCert() {
    const cert = document.getElementById('certArea');
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>Certificate — Kaushal Jharkhand</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap" rel="stylesheet">
        <style>
            *{margin:0;padding:0;box-sizing:border-box}
            body{font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f5f7fa;padding:40px}
            .cert{background:#fff;border:3px solid #1a56db;border-radius:16px;padding:50px;text-align:center;max-width:700px;width:100%;position:relative;overflow:hidden}
            .cert::before,.cert::after{content:'';position:absolute;left:0;right:0;height:8px;background:linear-gradient(90deg,#1a56db,#0d9488,#1a56db)}
            .cert::before{top:0}.cert::after{bottom:0}
            .logo{font-size:2.5rem;margin-bottom:8px}
            .title{font-size:1.8rem;font-weight:900;color:#1a56db;margin-bottom:4px}
            .subtitle{font-size:.9rem;color:#9ca3af;margin-bottom:24px}
            .label{font-size:.85rem;color:#9ca3af;margin-bottom:8px}
            .name{font-size:2.2rem;font-weight:800;color:#111827;margin-bottom:8px}
            .course{font-size:1.2rem;font-weight:600;color:#0d9488;margin-bottom:8px}
            .badge{display:inline-block;padding:8px 24px;border-radius:24px;background:#dcfce7;color:#16a34a;font-size:.9rem;font-weight:700;margin:16px 0;border:1px solid #bbf7d0}
            .details{font-size:.85rem;color:#4b5563;line-height:2}
            .footer{display:flex;justify-content:space-between;margin-top:28px;padding-top:18px;border-top:2px dashed #e5e7eb}
            .footer div{text-align:center}
            .sig{font-size:.95rem;font-weight:700;margin-bottom:2px}
            .sig-role{font-size:.75rem;color:#9ca3af}
            @media print{body{background:#fff;padding:0}.cert{border:3px solid #1a56db;box-shadow:none}}
        </style></head><body>
        <div class="cert">
            <div class="logo">🎓</div>
            <div class="title">KAUSHAL JHARKHAND</div>
            <div class="subtitle">Certificate of Vocational Training Completion</div>
            <div class="label">This is to certify that</div>
            <div class="name">${document.getElementById('cert-name').textContent}</div>
            <div class="label">has successfully completed the training programme</div>
            <div class="course">${document.getElementById('cert-course').textContent}</div>
            <div class="badge">✅ NSQF Level 4 Certified</div>
            <div class="details">
                <div>Duration: 3 Months • Centre: Dumka</div>
                <div>Scheme: PMKVY — Pradhan Mantri Kaushal Vikas Yojana</div>
                <div>Date: ${document.getElementById('cert-date').textContent}</div>
            </div>
            <div class="footer">
                <div><div class="sig">Kaushal Jharkhand</div><div class="sig-role">Training Authority</div></div>
                <div><div class="sig">NSDC / PMKVY</div><div class="sig-role">Certifying Body</div></div>
                <div><div class="sig">${document.getElementById('cert-id').textContent}</div><div class="sig-role">Certificate ID</div></div>
            </div>
        </div>
        <script>setTimeout(()=>{ window.print(); },500)<\/script>
    </body></html>`);
}

// ── RESET FORM ──
function resetForm() {
    const form = document.getElementById('regForm');
    form.reset(); form.style.display = 'block';
    document.getElementById('formSuccess').classList.remove('show');
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
}

// ── PROFILE MENU TOGGLE ──
function toggleProfileMenu() {
    const user = JSON.parse(localStorage.getItem('kj_user') || '{}');
    if (confirm('Sign out of ' + (user.name || 'account') + '?')) signOut();
}
