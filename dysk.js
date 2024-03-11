        // Funkcja do pobierania linków z localStorage i wyświetlania ich na stronie
        window.onload = function() {
            const savedFiles = JSON.parse(localStorage.getItem('savedFiles')) || [];
            const fileList = document.getElementById('file_list');
            savedFiles.forEach(file => {
                const fileListItem = document.createElement('div');
                fileListItem.innerHTML = `<span><a href="${file.url}" target="_blank">${file.name}</a></span> <button onclick="deleteFile('${file.id}')">Usuń</button>`;
                fileList.appendChild(fileListItem);
            });
        };

        // Funkcja do zapisywania przesłanych plików do localStorage
        async function uploadFile() {
            const fileNameInput = document.getElementById('file_name');
            const fileInput = document.getElementById('file_input');
            const file = fileInput.files[0];
            const fileName = fileNameInput.value.trim(); // Pobierz nazwę pliku z pola tekstowego

            if (!fileName) {
                alert("Proszę podać nazwę pliku.");
                return;
            }

            let formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ibuydrxa'); // Zastąp 'YOUR_UPLOAD_PRESET' swoim ustawieniem wstępnym Cloudinary
          
            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dpdnurge6/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const fileURL = response.data.url;
                const fileId = response.data.public_id; // Dodajemy ID pliku z Cloudinary
                
                // Zapisujemy przesłany plik do localStorage
                const savedFiles = JSON.parse(localStorage.getItem('savedFiles')) || [];
                savedFiles.push({ id: fileId, name: fileName, url: fileURL });
                localStorage.setItem('savedFiles', JSON.stringify(savedFiles));
                
                // Dodajemy link do pliku na stronie
                const fileListItem = document.createElement('div');
                fileListItem.innerHTML = `<span><a href="${fileURL}" target="_blank">${fileName}</a></span> <button onclick="deleteFile('${fileId}')">Usuń</button>`;
                document.getElementById('file_list').appendChild(fileListItem);

                document.getElementById('status').innerHTML = `Plik został przesłany! URL: ${fileURL}`;
            } catch (error) {
                console.error(error);
                document.getElementById('status').innerHTML = 'Błąd podczas przesyłania pliku.';
            }
        }

        // Funkcja do usuwania pliku
        async function deleteFile(fileId) {
    try {
        const savedFiles = JSON.parse(localStorage.getItem('savedFiles')) || [];
        // Usuwamy plik z listy w localStorage
        const updatedFiles = savedFiles.filter(file => file.id !== fileId);
        localStorage.setItem('savedFiles', JSON.stringify(updatedFiles));

        // Usuwamy plik z listy na stronie
        const fileToRemove = document.querySelector(`[data-file-id="${fileId}"]`);
        if (fileToRemove) {
            fileToRemove.remove();
        }

        document.getElementById('status').innerHTML = `Plik został usunięty z interfejsu użytkownika!`;
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerHTML = 'Błąd podczas usuwania pliku z interfejsu użytkownika.';
    }
}

async function deleteFile(fileId) {
    try {
        const savedFiles = JSON.parse(localStorage.getItem('savedFiles')) || [];
        // Usuwamy plik z listy w localStorage
        const updatedFiles = savedFiles.filter(file => file.id !== fileId);
        localStorage.setItem('savedFiles', JSON.stringify(updatedFiles));

        // Usuwamy plik z listy na stronie
        const fileToRemove = document.querySelector(`[data-file-id="${fileId}"]`);
        if (fileToRemove) {
            fileToRemove.remove();
        }

        document.getElementById('status').innerHTML = `Plik został usunięty z interfejsu użytkownika!`;
    } catch (error) {
        console.error(error);
        document.getElementById('status').innerHTML = 'Błąd podczas usuwania pliku z interfejsu użytkownika.';
    }
}
