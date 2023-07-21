# Twitter Clone Backend

Bu proje, popüler sosyal medya platformu Twitter'ın bir backend klonudur. Bu backend, kullanıcıların tweet atmasını, tweetlere yorum yapmasını ve anasayfalarında kendi tweetlerini ve takip ettikleri kullanıcıların tweetlerini görüntülemesini sağlar. Kullanıcılar ayrıca yeni bir hesap oluşturabilir ve belirledikleri gizli soru ve yanıtı kullanarak şifrelerini değiştirebilirler.

Canlı projeyi [buradan](https://ihsan-twitter-backend.onrender.com/) görüntüleyebilirsiniz.

## Kullanılan Teknolojiler

Bu projede aşağıdaki teknolojiler ve paketler kullanılmıştır:

- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Şifreleme için.
- [cors](https://www.npmjs.com/package/cors): Cross-Origin Resource Sharing (CORS) yönetimi için.
- [dotenv](https://www.npmjs.com/package/dotenv): Ortam değişkenlerini yüklemek için.
- [express](https://www.npmjs.com/package/express): Web uygulaması çatısı.
- [helmet](https://www.npmjs.com/package/helmet): Güvenlik için HTTP başlıklarını ayarlar.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JWT'ler oluşturmak ve doğrulamak için.
- [knex](https://www.npmjs.com/package/knex): SQL sorgu oluşturucu ve veritabanı yönetimi için.
- [morgan](https://www.npmjs.com/package/morgan): HTTP istek günlüğü middleware'i.
- [redis](https://www.npmjs.com/package/redis): Redis istemcisi.
- [sqlite3](https://www.npmjs.com/package/sqlite3): SQLite3 veritabanı.

## Kurulum

1. Projeyi yerel makinenize klonlayın. Bunun için aşağıdaki komutu kullanabilirsiniz:

git clone https://github.com/ihsanyazarel/twitter-clone-backend.git

2. Projeyi klonladığınız dizine gidin.
3. `npm install` komutunu çalıştırın.
4. `.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ayarlayın.
5. `npm start` komutunu çalıştırın.

## Kullanım

Bu backend API, çeşitli endpoint'ler sunar ve bu endpoint'lere HTTP istekleri göndererek kullanabilirsiniz. İsteklerinizi oluşturmak ve göndermek için Postman gibi bir API test aracı kullanabilirsiniz.

- `/api/tweets`: Tweetleri almak, yeni bir tweet oluşturmak, bir tweeti güncellemek ve bir tweeti silmek için.
- `/api/users`: Kullanıcıları almak, kullanıcı bilgilerini güncellemek ve bir kullanıcıyı silmek için.
- `/api/auth`: Kullanıcıların oturum açmasını, oturumu kapatmasını, yeni bir hesap oluşturmasını ve şifrelerini sıfırlamasını sağlar.
- `/api/comments`: Yorumları almak, yeni bir yorum oluşturmak, bir yorumu güncellemek ve bir yorumu silmek için.

## Testler

Bu projede, kodun doğruluğunu ve güvenilirliğini sağlamak için unit ve integration testleri bulunmaktadır. Testleri çalıştırmak için `npm run test` komutunu kullanabilirsiniz.

## Postman Collection

Bu projede, API'nin nasıl kullanılacağını göstermek için bir Postman collection dosyası bulunmaktadır. Bu dosyayı indirmek ve Postman'da içe aktarmak için [bu linki](https://github.com/ihsanyazarel/twitter-clone-backend/blob/main/documents/S16-Backend-Challenge(Render).postman_collection.json) kullanabilirsiniz. Bu collection, her bir endpoint için örnek istekler içerir ve bu istekleri kullanarak API'nin nasıl çalıştığını görebilirsiniz.
