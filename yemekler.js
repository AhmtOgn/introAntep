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

    // Sonuç mesajını güncelle - Bu kısım düzeltildi
    const resultsInfo = document.getElementById('resultsInfo');
    const resultCount = document.getElementById('resultCount');

    if (gorunurYemekSayisi === 0) {
        resultsInfo.innerHTML = '❌ Arama kriterlerinize uygun yemek bulunamadı';
        resultsInfo.style.background = 'linear-gradient(135deg, rgb(65, 57, 57), rgb(147, 72, 15))'; 
    } else {
        resultsInfo.innerHTML = `✅ Toplam <span id="resultCount">${gorunurYemekSayisi}</span> yemek gösteriliyor`;
        resultsInfo.style.background = 'linear-gradient(135deg, rgb(147, 72, 15), rgb(65, 57, 57))';
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