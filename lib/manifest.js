/* =============================================================
   GLIFOS — configuración editable
   =============================================================
   Este es el ÚNICO archivo que tocarás para el día a día.
   Tiene tres partes: (1) el concurso activo, (2) el glifo del día,
   (3) los patrocinadores. Todo está explicado abajo.
   ============================================================= */
(function () {
  "use strict";

  window.__CONFIG__ = {

    // Próximo concurso (sale en la cabecera de la portada). Deja "" para ocultarlo.
    nextContest: "Personajes · del 19 de julio al 7 de agosto",

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
    activeContest: null,
    // Ejemplo de cómo se rellenaría cuando empiece uno:
    // activeContest: { year: 2026, season: "verano", category: "personajes", week: 2, glyphNo: 7 },

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
    dailyGlyph: null,
    // Ejemplo:
    // dailyGlyph: { date: "2026-07-15", image: "assets/img/glifo-2026-07-15.webp", number: 7 },

    /* ---------------------------------------------------------
       (3) PATROCINADORES
       ---------------------------------------------------------
       Marcas y negocios amigos que dan premios. Añade los que quieras.
       Campos de cada patrocinador (solo "name" es obligatorio; el resto,
       si lo dejas en "" o lo quitas, simplemente no se muestra):
         - name:        nombre del negocio
         - description:  frase breve que lo describe
         - prize:        qué premio aporta
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
    // Plantilla completa (copia este bloque y rellénalo para un patrocinador real):
    // {
    //   name: "Nombre del negocio",
    //   description: "Frase breve que lo describe",
    //   prize: "Qué premio aporta",
    //   photos: ["assets/img/sponsors/foto1.webp", "assets/img/sponsors/foto2.webp"],
    //   logo:  "assets/img/sponsors/logo.webp",
    //   web:       "https://susitio.com",
    //   instagram: "https://instagram.com/suusuario"
    // },
    sponsors: [
      { name: "Cazoliñas", description: "Decoración artesanal hecha en Galicia", prize: "Pieza artesanal de decoración", photos: ["assets/img/sponsors/cazoliñas_premio.webp", "assets/img/sponsors/cazoliñas_premio2.webp"], logo: "assets/img/sponsors/Logo_cazoliñas.webp", web: "", instagram: "https://instagram.com/cazolinhas" },
      { name: "Cervexas Cabo",       description: "Cervexa artesá galega.",            prize: "Pack degustación", photo: "", logo: "", web: "", instagram: "" },
      { name: "Libraría Trama",      description: "Libraría independente.",            prize: "Vale de 30 €",     photo: "", logo: "", web: "", instagram: "" },
      { name: "Deportes Miño",       description: "Material deportivo.",               prize: "Camiseta oficial", photo: "", logo: "", web: "", instagram: "" }
    ]
  };
})();
