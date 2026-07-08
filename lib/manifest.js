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
       - name:  nombre del negocio
       - url:   enlace a su web o Instagram
       - prize: qué aporta (opcional, sale como pequeño texto)
       - logo:  ruta a un logo en assets/img/ (opcional; si no, se usa el nombre)
       Estos también aparecen salpicados en la portada.
    --------------------------------------------------------- */
    sponsors: [
      { name: "Panadería Sograndio", url: "#", prize: "Lote de dulces", logo: "" },
      { name: "Cervexas Cabo",       url: "#", prize: "Pack degustación", logo: "" },
      { name: "Libraría Trama",      url: "#", prize: "Vale de 30 €", logo: "" },
      { name: "Deportes Miño",       url: "#", prize: "Camiseta oficial", logo: "" }
    ]
  };
})();
