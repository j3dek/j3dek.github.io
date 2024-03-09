async function uploadFile() {
    const fileInput = document.getElementById('file_input');
    const file = fileInput.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ibuydrxa'); // Zastąp 'YOUR_UPLOAD_PRESET' swoim ustawieniem wstępnym Cloudinary
  
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dpdnurge6/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        document.getElementById('status').innerHTML = `Plik został przesłany! URL: ${response.data.url}`;
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerHTML = 'Błąd podczas przesyłania pliku.';
    }
}
