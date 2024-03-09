document.getElementById('dysk').addEventListener('click', function(e) {
    e.preventDefault(); // Zapobiegamy domyślnej akcji kliknięcia na link
    var password = prompt('Wprowadź hasło:'); // Wyświetlamy pole do wprowadzania hasła
    if (password === '4444') { // Sprawdzamy, czy hasło jest poprawne
        window.location.href = 'dysk.html'; // Przekierowujemy użytkownika do docelowego linku
    } else {
        alert('Nieprawidłowe hasło.'); // Wyświetlamy alert, jeśli hasło jest nieprawidłowe
    }
});
