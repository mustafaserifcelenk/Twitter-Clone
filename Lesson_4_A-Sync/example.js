console.log("1");

setTimeout(function () {
  console.log("2");
}, 3000);

setTimeout(() => {
  console.log("2");
}, 3000);

// setTimeout bir callback fonksiyondur. Sebebi 5 saniye sonra 'beni ara' diyoruz. Yani 5 sn boyunca setTimeout çalışıyor ve o arada js başka kodları çalıştırabiliyor. setTimeout() 5 sn sonra ben işimi bitirdim diyor ve işlemci geri ona dönüyor. Bu yapıya asenkron yapı diyoruz.

console.log("1");

setTimeout(function () {
    console.log("2");
}, 3000);

console.log("3");

// Burada ilk olarak 1'i yazdırıyor, sonra setTimeout'a giriyor, o 3 sn beklerken js çalışmaya devam ediyor ve sonraki console.log("3")'ü çalıştırıyor ve 3 sn'nin sonunda 2'yi yazdırıyor. Bu dilin non-blocking dil olduğunu gösteriyor. 
