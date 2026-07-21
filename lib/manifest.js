/* =============================================================
   GLIFOS — configuración editable
   =============================================================
   Este es el ÚNICO archivo que tocarás para el día a día.
   Tiene tres partes: (1) el concurso activo, (2) el glifo del día,
   (3) los patrocinadores. Todo está explicado abajo.

   IDIOMAS · IMPORTANTE
   --------------------
   Cualquier TEXTO de este archivo puede escribirse de dos formas:
     a) Una sola frase  ->  "Texto igual en los tres idiomas"
     b) Traducido        ->  { es: "...", gl: "...", ca: "..." }
   Si usas la forma (b), la web mostrará cada idioma según el que elija
   el visitante. Si dejas una sola frase, saldrá igual en los tres.
   (Los enlaces, imágenes, fechas numéricas, etc. no se traducen.)
   ============================================================= */
(function () {
  "use strict";

  window.__CONFIG__ = {

    // Próximo concurso (sale en la cabecera de la portada). Deja "" para ocultarlo.
    // Puedes poner una sola frase o traducirla con { es, gl, ca } (ver nota de idiomas arriba).
    nextContest: {
      es: "Personajes · del 19 de julio al 7 de agosto",
      gl: "Personaxes · do 19 de xullo ao 7 de agosto",
      ca: "Personatges · del 19 de juliol al 7 d'agost"
    },

    instagram: "https://instagram.com/cajiquesi",
    instagramHandle: "@cajiquesi",

    /* ---------------------------------------------------------
       (1) CONCURSO ACTIVO
       ---------------------------------------------------------
       Cuando haya un concurso en marcha, rellena esto para que
       la web lo anuncie. Cuando NO haya concurso, déjalo en null:
           activeContest: null,
       y la web mostrará automáticamente el último concurso pasado.
       - season: "verano" (Personajes) o "navidad" (Películas)
       - week / glyphNo: opcionales, solo para el cartelito de la portada.
    --------------------------------------------------------- */
    activeContest: { year: 2026, season: "verano", category: "personajes", week: 1, glyphNo: 3 },
    // Cuando termine el concurso, vuelve a poner:  activeContest: null,

    /* ---------------------------------------------------------
       (2) GLIFO DEL DÍA
       ---------------------------------------------------------
       Solo tiene sentido cuando hay concurso en marcha.
       Pon la imagen del jeroglífico de hoy en assets/img/ y su ruta aquí.
       NO pongas la respuesta mientras el concurso está en marcha:
       la web enseñará el glifo y mandará a responder a Instagram.
       Cuando no haya glifo del día, déjalo en null:
           dailyGlyph: null,
    --------------------------------------------------------- */
    dailyGlyph: { date: "2026-07-21", image: "assets/img/glifos/2026-personajes-03.webp", number: 3 },
    // Cuando no haya glifo del día, vuelve a poner:  dailyGlyph: null,

    /* ---------------------------------------------------------
       (3) PATROCINADORES
       ---------------------------------------------------------
       Marcas y negocios amigos que dan premios. Añade los que quieras.
       Campos de cada patrocinador (solo "name" es obligatorio; el resto,
       si lo dejas en "" o lo quitas, simplemente no se muestra).
       Los textos (description, prize) se pueden traducir con { es, gl, ca }:
         - name:        nombre del negocio (no se traduce)
         - description:  frase breve que lo describe (se puede traducir)
         - prize:        qué premio aporta (se puede traducir)
         - photo:        foto del negocio/producto; sale como cabecera de
                         la tarjeta. Guárdala en assets/img/sponsors/ y pon
                         aquí su ruta. Si no hay, se usa un fondo decorativo.
         - photos:       si tienes varias fotos, usa este campo (una lista)
                         en vez de "photo" y saldrán como galería deslizable:
                         photos: ["ruta/foto1.webp", "ruta/foto2.webp"]
         - logo:         logo cuadrado; sale como chapa sobre la foto.
                         Si no hay, se usa la inicial del nombre.
         - web:          enlace a su página web
         - instagram:    enlace a su perfil de Instagram
       Estos también aparecen salpicados en la portada.
       (Consejo: convierte las imágenes a .webp, igual que los glifos.)
    --------------------------------------------------------- */
    // Plantilla completa (copia este bloque y rellénalo para un patrocinador real).
    // Fíjate en "description"/"prize": se pueden dejar como una frase o traducir con { es, gl, ca }.
    // {
    //   name: "Nombre del negocio",
    //   description: { es: "Frase en castellano", gl: "Frase en galego", ca: "Frase en català" },
    //   prize: "Qué premio aporta",   // (o traducido con { es, gl, ca })
    //   photos: ["assets/img/sponsors/foto1.webp", "assets/img/sponsors/foto2.webp"],
    //   logo:  "assets/img/sponsors/logo.webp",
    //   web:       "https://susitio.com",
    //   instagram: "https://instagram.com/suusuario"
    // },
    sponsors: [
      {
        name: "Cazoliñas",
        description: { es: "Decoración artesanal hecha en Galicia", gl: "Decoración artesanal feita en Galicia", ca: "Decoració artesanal feta a Galícia" },
        prize:       { es: "Pieza artesanal de decoración",         gl: "Peza artesanal de decoración",          ca: "Peça artesanal de decoració" },
        photos: ["assets/img/sponsors/cazoliñas_premio1.webp", "assets/img/sponsors/cazoliñas_premio2.webp", "assets/img/sponsors/cazoliñas_premio3.webp"],
        logo: "assets/img/sponsors/Logo_cazoliñas.webp",
        web: "https://drive.google.com/file/d/1PoT_g1AhMI_F0SoCO5lc5nbAH6-agHpv/view?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnV3PgQd9kK0supz7KSM9AohmVyCMQWm1vaIroxEgYXXBtoi2Xw7hsgN1H4uM_aem_cnPZ5eI7ZT4IZCyveosvtA", instagram: "https://instagram.com/cazolinhas", tiktok:"https://www.tiktok.com/@cazolinhas"
      },
       {
        name: "Cycling Champion",
        description: { es: "Consigue el maillot amarillo carta a carta", gl: "Consegue o maillot amarelo carta a carta", ca: "Aconsegueix el maillot groc carta a carta" },
        prize:       { es: "Juego en versión digital (PC)",         gl: "Xogo en versión dixital (PC)",          ca: "Joc en versió digital (PC)" },
        photos: ["assets/img/sponsors/cycling_premio1.webp"],
        logo: "assets/img/sponsors/Logo_cycling.webp",
        web: "https://store.steampowered.com/app/4782250/Cycling_Champion/", youtube: "https://youtu.be/n342w2_18CU?is=w6zFc7zHG9khok8A", tiktok:"https://www.tiktok.com/@cycling.champion"
      },
        {
        name: "Aphrodite",
        description: { es: "Ropa interior para todos los públicos", gl: "Roupa interior para todos os públicos", ca: "Roba interior per a tots els públics" },
        prize:       { es: "Neceser y ropa interior",         gl: "Neceser e roupa interior",          ca: "Necesser i roba interior" },
        photos: ["assets/img/sponsors/aphrodite1.webp", "assets/img/sponsors/aphrodite2.webp", "assets/img/sponsors/aphrodite3.webp"],
        logo: "assets/img/sponsors/logo_aphrodite.webp",
        web: "", youtube: "", tiktok:"", instagram: "https://www.instagram.com/aphrodite.arousa"
      },
       {
        name: "Rodrigo Ramos",
        description: { es: "Cantautor gallego", gl: "Cantautor galego", ca: "Cantautor gallec" },
        prize:       { es: "Disco firmado",         gl: "Álbum asinado",          ca: "Disc signat" },
        photos: ["assets/img/sponsors/rodrigoramos1.webp", "assets/img/sponsors/rodrigoramos2.webp", "assets/img/sponsors/rodrigoramos3.webp"],
        logo: "assets/img/sponsors/Logo_rodrigoramos.webp",
        web: "https://open.spotify.com/artist/4NtxnsOw7RDBKvgdWzW0xN?si=P_zczL20S-GKC8a2Rx8r-g&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGntJaK0jDXC94Qi-Al-aonlVNJH8KHfcHPzIHWWZutfEdNSjbR4zN-MU8sufs_aem_TSZiXTPqQZ8Wtw-J03e2LA&nd=1&dlsi=b2db60cb0dc443e6", youtube: "", tiktok:"", instagram: "https://www.instagram.com/rodrigoramosmusic/"
      },
          ]
  };
})();
