// LocalStorage logic template for +62
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('aspirasiForm');
    const aspirasiList = document.getElementById('aspirasiList');

    let aspirasiData = JSON.parse(localStorage.getItem('plus62_data')) || [];

    function renderAspirasi() {
        if (aspirasiData.length === 0) {
            aspirasiList.innerHTML = '<p class="empty-state">Belum ada aspirasi masuk. Jadilah yang pertama bersuara!</p>';
            return;
        }

        aspirasiList.innerHTML = '';
        aspirasiData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'aspirasi-item';
            div.innerHTML = `
                <div class="meta">
                    <span><strong>[${item.kategori}]</strong> ${item.nama || 'Anonim'}</span>
                    <span class="date">${item.tanggal}</span>
                </div>
                <p class="message-text">${item.pesan}</p>
            `;
            aspirasiList.appendChild(div);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const kategori = document.getElementById('kategori').value;
        const nama = document.getElementById('nama').value.trim();
        const pesan = document.getElementById('pesan').value.trim();
        const tanggal = new Date().toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const newAspirasi = { kategori, nama, pesan, tanggal };
        aspirasiData.unshift(newAspirasi);

        localStorage.setItem('plus62_data', JSON.stringify(aspirasiData));
        
        form.reset();
        renderAspirasi();
    });

    renderAspirasi();
});
