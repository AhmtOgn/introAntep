function filtrele() {
    // Seçilen kategoriler
    const secilenKategoriler = Array.from(document.querySelectorAll('.sidebar input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    // Seçilen fiyat aralığı
    const secilenFiyat = document.querySelector('input[name="fiyat"]:checked')?.value;

    // Arama terimi
    const aramaTerimi = document.getElementById('searchBox').value.toLowerCase();

    const tumYemekler = document.querySelectorAll('.yemek');
    const tumKategoriler = document.querySelectorAll('.kategori');
    let gorunurYemekSayisi = 0;

    // Yemekleri filtrele
    tumYemekler.forEach(yemek => {
        let goster = true;

        // Kategori filtresi
        if (secilenKategoriler.length > 0) {
            const kategoriEslesti = secilenKategoriler.some(kat => yemek.classList.contains(kat));
            if (!kategoriEslesti) goster = false;
        }

        // Fiyat filtresi
        if (secilenFiyat && !yemek.classList.contains(secilenFiyat)) {
            goster = false;
        }

        // Arama filtresi
        if (aramaTerimi) {
            const yemekAdi = yemek.getAttribute('data-name')?.toLowerCase() || '';
            const yemekBaslik = yemek.querySelector('h3')?.textContent.toLowerCase() || '';
            if (!yemekAdi.includes(aramaTerimi) && !yemekBaslik.includes(aramaTerimi)) {
                goster = false;
            }
        }

        if (goster) {
            yemek.classList.remove('hidden');
            gorunurYemekSayisi++;
        } else {
            yemek.classList.add('hidden');
        }
    });

    // Kategorileri kontrol et
    tumKategoriler.forEach(kategori => {
        const kategoriYemekleri = kategori.querySelectorAll('.yemek');
        const gorunurYemekVar = Array.from(kategoriYemekleri).some(yemek =>
            !yemek.classList.contains('hidden')
        );

        if (gorunurYemekVar) {
            kategori.classList.remove('hidden');
        } else {
            kategori.classList.add('hidden');
        }
    });

    // Sonuç sayısını güncelle
    document.getElementById('resultCount').textContent = gorunurYemekSayisi;

    // Sonuç mesajını güncelle
    const resultsInfo = document.getElementById('resultsInfo');
    if (gorunurYemekSayisi === 0) {
        resultsInfo.innerHTML = '❌ Arama kriterlerinize uygun yemek bulunamadı';
        resultsInfo.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    } else {
        resultsInfo.innerHTML = `✅ Toplam <span id="resultCount">${gorunurYemekSayisi}</span> yemek gösteriliyor`;
        resultsInfo.style.background = 'linear-gradient(135deg, #8B0000, #CD5C5C)';
    }
}

function temizleFiltreler() {
    // Tüm checkbox'ları temizle
    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    // Tüm radio button'ları temizle
    document.querySelectorAll('.sidebar input[type="radio"]').forEach(rb => {
        rb.checked = false;
    });

    // Arama kutusunu temizle
    document.getElementById('searchBox').value = '';

    // Filtreleri yeniden uygula
    filtrele();
}

// Sayfa yüklendiğinde tüm yemekleri göster
document.addEventListener('DOMContentLoaded', function () {
    filtrele();
});