document.addEventListener('DOMContentLoaded', function () {
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const closeChatbot = document.querySelector('.close-chatbot');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');

    // Başlangıçta sohbet penceresini gizle
    chatbotContainer.classList.remove('active');

    // Chatbot'u aç/kapat
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Basit yanıt sistemi
    const responses = {
        // Selamlaşma ve Genel
        'merhaba': 'Merhaba! Fluffy Peluş Oyuncak mağazasına hoş geldiniz. Size nasıl yardımcı olabilirim?',
        'selam': 'Selam! Fluffy Peluş Oyuncak mağazasına hoş geldiniz. Size nasıl yardımcı olabilirim?',
        'günaydın': 'Günaydın! Fluffy Peluş Oyuncak mağazasına hoş geldiniz. Size nasıl yardımcı olabilirim?',
        'iyi akşamlar': 'İyi akşamlar! Fluffy Peluş Oyuncak mağazasına hoş geldiniz. Size nasıl yardımcı olabilirim?',
        'nasılsın': 'İyiyim, teşekkür ederim. Siz nasılsınız? Size nasıl yardımcı olabilirim?',
        'teşekkür': 'Rica ederim! Başka bir konuda yardımcı olabileceğim bir şey var mı?',
        'görüşürüz': 'İyi günler! Fluffy Peluş Oyuncak mağazasını tercih ettiğiniz için teşekkür ederiz. Tekrar bekleriz!',

        // Ürün Kategorileri
        'ürünler': 'Mağazamızda birçok farklı kategoride peluş oyuncak bulunmaktadır:\n\n' +
            '• Ayılar: Kahverengi, beyaz ve renkli ayılar\n' +
            '• Köpekler: Farklı ırklarda köpek oyuncaklar\n' +
            '• Kediler: Farklı renk ve boyutlarda kedi oyuncaklar\n' +
            '• Unicornlar: Renkli ve ışıklı unicorn oyuncaklar\n' +
            '• Hayvanlar: Aslan, kaplan, zürafa gibi vahşi hayvanlar\n' +
            '• Karakterler: Çizgi film ve film karakterleri\n\n' +
            'Hangi kategoride ürün görmek istersiniz?',

        // Fiyat Bilgileri
        'fiyat': 'Ürünlerimizin fiyatları boyut ve özelliklerine göre değişmektedir:\n\n' +
            '• Küçük boy oyuncaklar: 50₺ - 150₺\n' +
            '• Orta boy oyuncaklar: 150₺ - 300₺\n' +
            '• Büyük boy oyuncaklar: 300₺ - 500₺\n' +
            '• Özel seri ve limitli ürünler: 500₺ ve üzeri\n\n' +
            'Ayrıca toplu alımlarda özel indirimler sunuyoruz.',

        // Kargo ve Teslimat
        'kargo': 'Kargo ve teslimat bilgileri:\n\n' +
            '• Standart kargo ücreti: 30₺\n' +
            '• 250₺ üzeri alışverişlerde kargo ücretsiz\n' +
            '• Siparişler 1-3 iş günü içinde hazırlanır\n' +
            '• Teslimat süresi 1-5 iş günü arasındadır\n' +
            '• Kargo takibi için sipariş numaranızı kullanabilirsiniz\n' +
            '• Adrese teslimat yapılmaktadır',

        // İade ve Değişim
        'iade': 'İade ve değişim politikamız:\n\n' +
            '• 14 gün içinde iade hakkı\n' +
            '• Ürünün kullanılmamış olması gerekir\n' +
            '• Orijinal ambalajında olmalıdır\n' +
            '• Etiketleri çıkarılmamış olmalıdır\n' +
            '• İade kargo ücreti müşteriye aittir\n' +
            '• Değişimlerde kargo ücreti tarafımızdan karşılanır',

        // İletişim Bilgileri
        'iletişim': 'Bize ulaşmak için:\n\n' +
            '• E-posta: info@fluffy.com\n' +
            '• Telefon: 0212 123 45 67\n' +
            '• WhatsApp: 0532 987 65 43\n' +
            '• Çalışma saatleri: Hafta içi 09:00 - 18:00\n' +
            '• Hafta sonu: 10:00 - 16:00',

        // Adres Bilgisi
        'adres': 'Mağazamızın adresi:\n\n' +
            'Fluffy Peluş Oyuncak\n' +
            'İstiklal Caddesi No:123\n' +
            'Beyoğlu/İstanbul\n\n' +
            '• Metro: Taksim durağına 5 dakika yürüme mesafesi\n' +
            '• Otobüs: İstiklal Caddesi durağı\n' +
            '• Otopark: Mağazamızın arkasında ücretsiz otopark mevcuttur',

        // Ödeme Seçenekleri
        'ödeme': 'Ödeme seçeneklerimiz:\n\n' +
            '• Kredi kartı (tek çekim)\n' +
            '• Kredi kartı (taksitli)\n' +
            '• Havale/EFT\n' +
            '• Kapıda ödeme\n' +
            '• Apple Pay\n' +
            '• Google Pay',

        // Hediye Paketi
        'hediye': 'Hediye paketi seçeneklerimiz:\n\n' +
            '• Standart hediye paketi: Ücretsiz\n' +
            '• Premium hediye paketi: 20₺\n' +
            '• Kişiselleştirilmiş hediye kartı: 10₺\n' +
            '• Özel not ekleme: Ücretsiz',

        // Yeni Ürünler
        'yeni': 'Yeni gelen ürünlerimiz:\n\n' +
            '• Işıklı Unicorn serisi\n' +
            '• Sesli Hayvan serisi\n' +
            '• Yumuşak Dokulu Bebek serisi\n' +
            '• Özel Tasarım Karakterler\n' +
            '• Sınırlı Sayıda Üretilen Koleksiyonlar',

        // Özel Günler
        'özel': 'Özel günler için ürünlerimiz:\n\n' +
            '• Doğum günü\n' +
            '• Sevgililer Günü\n' +
            '• Anneler Günü\n' +
            '• Babalar Günü\n' +
            '• Yılbaşı\n' +
            '• Bayramlar',

        // Temizlik ve Bakım
        'temizlik': 'Peluş oyuncakların bakımı için:\n\n' +
            '• 30 derecede yıkanabilir\n' +
            '• Kurutma makinesinde kurutulabilir\n' +
            '• Kuru temizleme yapılabilir\n' +
            '• Yüzey temizliği için nemli bez kullanılabilir\n' +
            '• Güneşte kurutulmamalıdır',

        // Garanti
        'garanti': 'Garanti koşullarımız:\n\n' +
            '• 1 yıl üretici garantisi\n' +
            '• Garanti kapsamında ücretsiz tamir\n' +
            '• Garanti dışı durumlarda ücretli tamir\n' +
            '• Garanti belgesi gereklidir\n' +
            '• Satış fişi/faturası gereklidir'
    };

    // Mesaj gönderme fonksiyonu
    async function sendMessage() {
        const message = userInput.value.trim().toLowerCase();

        if (message === '') return;

        // Kullanıcı mesajını ekle
        addMessage(message, 'user');
        userInput.value = '';

        // Yanıt ver
        let response = 'Üzgünüm, bu konuda size yardımcı olamıyorum. Başka bir soru sorabilirsiniz.';

        // Mesajı kontrol et
        for (let key in responses) {
            if (message.includes(key)) {
                response = responses[key];
                break;
            }
        }

        // Genel sorular için yanıtlar
        if (message.includes('ne kadar')) {
            response = 'Ürün fiyatları hakkında bilgi almak için ürün sayfalarımızı ziyaret edebilirsiniz.';
        } else if (message.includes('nasıl')) {
            response = 'Size daha iyi yardımcı olabilmem için lütfen sorunuzu detaylandırır mısınız?';
        } else if (message.includes('ne zaman')) {
            response = 'Siparişlerimiz genellikle 1-3 iş günü içinde kargoya verilmektedir.';
        }

        // Bot yanıtını ekle
        setTimeout(() => {
            addMessage(response, 'bot');
        }, 500);
    }

    // Enter tuşu ile mesaj gönderme
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Gönder butonu ile mesaj gönderme
    sendButton.addEventListener('click', sendMessage);

    // Mesaj ekleme fonksiyonu
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}); 