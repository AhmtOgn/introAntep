function filtrele() {
  const secilenler = Array.from(document.querySelectorAll('.sidebar input:checked'))
                          .map(cb => cb.value);
  const tumYemekler = document.querySelectorAll('.yemek');
  const tumKategoriler = document.querySelectorAll('.kategori');

  // Önce tüm yemekleri filtrele
  tumYemekler.forEach(yemek => {
    // yemek div'inin classList'inde secilen kategorilerden biri var mı?
    const eslestiMi = secilenler.some(kat => yemek.classList.contains(kat));

    if (secilenler.length === 0 || eslestiMi) {
      yemek.classList.remove('hidden');
    } else {
      yemek.classList.add('hidden');
    }
  });

  // Şimdi her kategori için kontrol et
  tumKategoriler.forEach(kategori => {
    const kategoriId = kategori.id;
    const kategoriYemekleri = kategori.querySelectorAll('.yemek');
    
    // Bu kategoride görünür yemek var mı kontrol et
    const gorunurYemekVar = Array.from(kategoriYemekleri).some(yemek => 
      !yemek.classList.contains('hidden')
    );

    // Eğer hiçbir filtre seçilmemişse veya bu kategoride görünür yemek varsa kategoriyi göster
    if (secilenler.length === 0 || gorunurYemekVar) {
      kategori.classList.remove('hidden');
    } else {
      kategori.classList.add('hidden');
    }
  });
}