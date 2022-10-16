(function () {
    const lat = -18.4823629;
    const lng = -70.3130372;
    const mapa = L.map('mapa').setView([lat, lng], 16);
    let marker;

    //Utilizar provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Agregar el pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(mapa);

    //Detectar movimiento del marker
    marker.on('moveend', function (event) {
        marker = event.target;
        const posicion = marker.getLatLng();
        const { lat, lng } = posicion;
        mapa.panTo(new L.LatLng(lat, lng));

        //Obtener la información de la dirección
        geocodeService.reverse().latlng(posicion, 13).run(function (error, resultado) {
            console.log(resultado.address.LongLabel);
            marker.bindPopup(resultado.address.LongLabel);

            //Llenar los input
            document.querySelector('.calle').textContent = resultado.address.Address ?? '';
            document.querySelector('#calle').value = resultado.address.Address ?? '';
            document.querySelector('#lat').value = resultado.latlng.lat ?? '';
            document.querySelector('#lng').value = resultado.latlng.lng ?? '';
        });

    });


})()