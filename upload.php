<?php
$targetDirectory = "uploads/";
$targetFile = $targetDirectory . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));

// Sprawdzenie czy plik jest rzeczywistym plikiem obrazu
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "Plik jest obrazem - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "Plik nie jest obrazem.";
        $uploadOk = 0;
    }
}

// Sprawdzenie czy plik już istnieje
if (file_exists($targetFile)) {
    echo "Plik już istnieje.";
    $uploadOk = 0;
}

// Sprawdzenie wielkości pliku
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Przepraszamy, Twój plik jest zbyt duży.";
    $uploadOk = 0;
}

// Zablokowanie pewnych typów plików
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Przepraszamy, tylko pliki JPG, JPEG, PNG i GIF są dozwolone.";
    $uploadOk = 0;
}

// Jeżeli wszystko jest w porządku, spróbuj przesłać plik
if ($uploadOk == 0) {
    echo "Przepraszamy, Twój plik nie został przesłany.";
// Jeżeli wszystko jest w porządku, przesłań plik
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
        echo "Plik ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " został przesłany.";
    } else {
        echo "Wystąpił błąd podczas przesyłania Twojego pliku.";
    }
}
?>
