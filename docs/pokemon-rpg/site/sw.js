/* Service Worker mínimo do Diário de Treinador.
   Existe só pra deixar o site instalável como app (alguns navegadores só
   oferecem "Instalar app" com um Service Worker registrado e um handler de
   fetch de verdade) -- NÃO guarda cache nenhum de propósito.

   A Arena depende de dados em tempo real (Firestore) e o HTML/JS deste
   site precisa vir sempre fresco do servidor: qualquer atualização
   publicada aqui (novo Movimento, correção de regra, feature nova) tem que
   aparecer sozinha na próxima vez que o app abrir, sem precisar desinstalar
   nada. Por isso cada fetch aqui só repassa direto pra rede, sem cache
   nenhum no meio -- o app instalado nunca fica "preso" numa versão velha. */

self.addEventListener('install', function(event){
  self.skipWaiting(); /* ativa a versão nova na hora, sem esperar todas as abas antigas fecharem */
});

self.addEventListener('activate', function(event){
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event){
  event.respondWith(fetch(event.request));
});
