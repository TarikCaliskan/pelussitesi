<?php
require_once 'baglan.php';

// Kayıt Ekleme İşlemi
if (isset($_POST['insertislemi'])) {

    $kaydet = $db->prepare("INSERT INTO uye SET
        ad = :ad,
        soyad = :soyad,
        e_posta = :e_posta,
        yas = :yas,
        sifre = :sifre
    ");

    $insert = $kaydet->execute(array(
        'ad'      => $_POST['ad'],
        'soyad'   => $_POST['soyad'],
        'e_posta' => $_POST['e_posta'],
        'yas'     => $_POST['yas'],
        'sifre'   => $_POST['sifre']
    ));

    if ($insert) {
        header("Location:kayit.php?durum=ok");
        exit;
    } else {
        header("Location:kayit.php?durum=no");
        exit;
    }
}

// Güncelleme İşlemi (e-posta üzerinden)
if (isset($_POST['updateislemi'])) {

    $kaydet = $db->prepare("UPDATE uye SET
        ad = :ad,
        soyad = :soyad,
        e_posta = :yeni_eposta,
        yas = :yas,
        sifre = :sifre
        WHERE e_posta = :eski_eposta
    ");

    $update = $kaydet->execute(array(
        'ad'          => $_POST['ad'],
        'soyad'       => $_POST['soyad'],
        'yeni_eposta' => $_POST['e_posta'],  // yeni e-posta
        'yas'         => $_POST['yas'],
        'sifre'       => $_POST['sifre'],
        'eski_eposta' => $_POST['eski_eposta'] // gizli inputtan geliyor
    ));

    if ($update) {
        header("Location:duzenle.php?durum=ok&e_posta=" . $_POST['e_posta']);
        exit;
    } else {
        header("Location:duzenle.php?durum=no&e_posta=" . $_POST['eski_eposta']);
        exit;
    }
}


if ($_GET['bilgilerimsil']=="ok") {
 $sil=$db->prepare("DELETE from uye where e_posta=:posta");
 $kontrol=$sil->execute(array(
  'posta'=>$_GET['e_posta']
 ));

 if ($kontrol) {
  Header("Location:admin.php?durum=ok");
  exit;
 }

 else {
  Header("Location:admin.php?durum=no");
  exit;
 }

}

?>
