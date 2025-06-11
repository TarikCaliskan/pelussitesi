<?php
require_once 'baglan.php';

$bilgilerimsor = $db->prepare("SELECT * from uye WHERE e_posta=:e_posta");
$bilgilerimsor->execute(
    [
        'e_posta' => $_GET['e_posta']
    ]
);

$bilgilerimcek = $bilgilerimsor->fetch(PDO::FETCH_ASSOC);
?>

<hr>
<hr>
<h4>Kayıtların Listelenmesi</h4>
<hr>
<div class="auth-container">
    <div class="auth-box">

<?php
/*
$bilgilerimsor=$db->prepare("SELECT * from uye");
$bilgilerimsor->execute();


while ($bilgilerimcek=$bilgilerimsor->fetch(PDO::FETCH_ASSOC)) {
  echo $bilgilerimcek['ad'];  echo "<br>";
}
*/
//where işlemi
/*
$bilgilerimsor = $db->prepare("SELECT * from uye WHERE yas=:yas");
$bilgilerimsor->execute(
     [
        'yas' => 32
    ]
);


while ($bilgilerimcek = $bilgilerimsor->fetch(PDO::FETCH_ASSOC)) {
    echo $bilgilerimcek['ad'];
    echo "<br>";
}
*/


?>

<table style="width:60% ;" border="1">
    <tr>
        <td>Sıra No</td>
        <th>Ad</th>
        <th>Soyad</th>
        <th>E-posta</th>
        <th>Yaş</th>
        <th>Adres</th>
        <th>Şifre</th>
        <th width="50">İşlemler</th>
        <th width="50">İşlemler</th>
    </tr>
    <?php
    $bilgilerimsor = $db->prepare("SELECT * from uye ");
    $bilgilerimsor->execute();

    $say = 0;

    while ($bilgilerimcek = $bilgilerimsor->fetch(PDO::FETCH_ASSOC)) {
        $say++ ?>



        <tr>
            <td><?php echo $say ?></td>
            <td><?php echo $bilgilerimcek['ad'] ?></td>
            <td><?php echo $bilgilerimcek['soyad'] ?></td>
            <td><?php echo $bilgilerimcek['e_posta'] ?></td>
            <td><?php echo $bilgilerimcek['yas'] ?></td>
            <td><?php echo $bilgilerimcek['adres'] ?></td>
            <td><?php echo $bilgilerimcek['sifre'] ?></td>
            <td align="center"><a href="duzenle.php?e_posta=<?php echo $bilgilerimcek['e_posta'] ?>"><button>Düzenle</button></td></a>
            <td align="center"><a href="islem.php?e_posta=<?php echo $bilgilerimcek['e_posta'] ?>&bilgilerimsil=ok"><button>Sil</button></td></a>
        </tr>

    <?php } ?>

</table>