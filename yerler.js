function filtrele() {
    // Seçilen kategoriler
    const secilenKategoriler = Array.from(document.querySelectorAll('.sidebar input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    // Seçilen fiyat aralığı
    const secilenFiyat = document.querySelector('input[name="fiyat"]:checked')?.value;

    // Arama terimi
    const aramaTerimi = document.getElementById('searchBox').value.toLowerCase();

    const tumYerler = document.querySelectorAll('.yerler');
    const tumKategoriler = document.querySelectorAll('.kategori');
    let gorunurYerSayisi = 0;

    // Yerleri filtrele
    tumYerler.forEach(yerler => {
        let goster = true;

        // Kategori filtresi
        if (secilenKategoriler.length > 0) {
            const kategoriEslesti = secilenKategoriler.some(kat => yerler.classList.contains(kat));
            if (!kategoriEslesti) goster = false;
        }

        // Fiyat filtresi
        if (secilenFiyat && !yerler.classList.contains(secilenFiyat)) {
            goster = false;
        }

        // Arama filtresi
        if (aramaTerimi) {
            const yerAdi = yerler.getAttribute('data-name')?.toLowerCase() || '';
            const yerBaslik = yerler.querySelector('h3')?.textContent.toLowerCase() || '';
            if (!yerAdi.includes(aramaTerimi) && !yerBaslik.includes(aramaTerimi)) {
                goster = false;
            }
        }

        if (goster) {
            yerler.classList.remove('hidden');
            gorunurYerSayisi++;
        } else {
            yerler.classList.add('hidden');
        }
    });

    // Kategorileri kontrol et
    tumKategoriler.forEach(kategori => {
        const kategoriYerleri = kategori.querySelectorAll('.yerler');
        const gorunurYerVar = Array.from(kategoriYerleri).some(yerler =>
            !yerler.classList.contains('hidden')
        );

        if (gorunurYerVar) {
            kategori.classList.remove('hidden');
        } else {
            kategori.classList.add('hidden');
        }
    });

    // Sonuç mesajını güncelle
    const resultsInfo = document.getElementById('resultsInfo');
    const resultCount = document.getElementById('resultCount');

    if (gorunurYerSayisi === 0) {
        resultsInfo.innerHTML = '❌ Arama kriterlerinize uygun yer bulunamadı';
        resultsInfo.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    } else {
        resultsInfo.innerHTML = `✅ Toplam <span id="resultCount">${gorunurYerSayisi}</span> yer gösteriliyor`;
        resultsInfo.style.background = 'linear-gradient(135deg, #8B0000, #CD5C5C)';
    }
}


function temizleFiltreler() {
    // Tüm checkbox'ları temizle
    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    // Tüm radio button'ları temizle - Bu kısım düzeltildi
    document.querySelectorAll('input[name="fiyat"]').forEach(rb => {
        rb.checked = false;
    });

    // Arama kutusunu temizle
    document.getElementById('searchBox').value = '';

    // Filtreleri yeniden uygula
    filtrele();
}

// Radio button'ların tekrar tıklanınca deselect olması için
let sonTiklananRadio = null;

function radioButtonlariAyarla() {
    const fiyatRadioButtons = document.querySelectorAll('input[name="fiyat"]');

    fiyatRadioButtons.forEach(radio => {
        radio.addEventListener('click', function () {
            if (sonTiklananRadio === this) {
                // Aynı radio button'a tekrar tıklandı, seçimi kaldır
                this.checked = false;
                sonTiklananRadio = null;
                filtrele(); // Filtreleri yeniden uygula
            } else {
                // Farklı bir radio button seçildi
                sonTiklananRadio = this;
                filtrele(); // Filtreleri yeniden uygula
            }
        });
    });
}

// Sayfa yüklendiğinde tüm yemekleri göster ve radio button ayarlarını yap
document.addEventListener('DOMContentLoaded', function () {
    radioButtonlariAyarla();
    filtrele();
});