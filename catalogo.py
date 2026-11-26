"""Presentación pública de los productos y proyectos personales de NovaLabs."""

PRODUCTOS = {
    "novafinance": {
        "nombre": "NovaFinance", "color": "green", "icono": "wallet",
        "categoria": "Finanzas personales",
        "estado": "Windows local · Móvil en desarrollo",
        "titulo": "Tus finanzas, con más claridad.",
        "descripcion": "Un producto de NovaLabs para organizar tus movimientos, presupuestos y metas. Una versión local para Windows y una experiencia móvil en desarrollo.",
        "imagen": "novafinance-desktop.jpg",
        "funciones": [
            ("Movimientos ordenados", "Registrá ingresos y gastos y revisá cómo se distribuye tu dinero."),
            ("Presupuestos y metas", "Organizá tus objetivos y seguí tu planificación desde una misma herramienta."),
            ("Dos experiencias", "Windows funciona de forma local. La versión móvil está en desarrollo; la conexión entre dispositivos es una próxima etapa."),
        ],
        "demo_disponible": False,
        "demo": "Conocé las capturas de la aplicación y el estado de cada versión.",
    },
    "novashop": {
        "nombre": "NovaShop", "color": "purple", "icono": "cart",
        "categoria": "Comercio digital", "estado": "Demo interactiva",
        "titulo": "Una tienda para explorar ideas.",
        "descripcion": "Una demostración de catálogo y carrito que permite recorrer productos, buscar y simular un pedido. Un proyecto para practicar experiencias de compra claras.",
        "imagen": "novashop_mockup.png",
        "funciones": [
            ("Catálogo y búsqueda", "Explorá los productos ficticios y encontrá uno por su nombre o categoría."),
            ("Carrito interactivo", "Agregá productos, ajustá cantidades y consultá el total de ejemplo."),
            ("Pedido simulado", "Probá el recorrido de compra. No se realizan cobros ni se envían pedidos."),
        ],
        "demo_disponible": True,
        "demo": "Probá un catálogo con carrito y un pedido simulado. Los importes y productos son de ejemplo; no se realizan cobros ni se envían pedidos.",
    },
    "novacore": {
        "nombre": "NovaCore", "color": "blue", "icono": "gear",
        "categoria": "Organización y gestión", "estado": "Demo interactiva",
        "titulo": "Un inventario, todo más claro.",
        "descripcion": "Una demostración de gestión para agregar productos, buscar y ajustar existencias. Una forma simple de explorar cómo el software puede ayudar a ordenar tareas.",
        "imagen": "novacore_mockup.png",
        "funciones": [
            ("Productos ordenados", "Agregá productos de ejemplo y encontralos con el buscador."),
            ("Control de existencias", "Ajustá cantidades y distinguí los artículos con stock bajo."),
            ("Guardado en el navegador", "Los cambios de la demo se conservan en este navegador. No es un sistema multiusuario."),
        ],
        "demo_disponible": True,
        "demo": "Probá un inventario de ejemplo: agregá productos y ajustá las cantidades. Los cambios se guardan únicamente en este navegador.",
    },
    "nova-ai": {
        "nombre": "Nova AI", "color": "cyan", "icono": "brain",
        "categoria": "Asistentes y automatización", "estado": "Demo guiada",
        "titulo": "Ideas que empiezan con una conversación.",
        "descripcion": "La línea de NovaLabs dedicada a explorar asistentes y automatización. Conocé a ADAM mediante un recorrido guiado con opciones y respuestas predefinidas.",
        "imagen": "adam_robot.png",
        "funciones": [
            ("Conocé a ADAM", "Recorré una interfaz de conversación pensada para orientar consultas."),
            ("Opciones guiadas", "Elegí un tema y descubrí los proyectos relacionados de NovaLabs."),
            ("Un alcance claro", "Esta demostración usa respuestas predefinidas y no está conectada a un modelo de inteligencia artificial."),
        ],
        "demo_disponible": True,
        "demo": "Conocé un recorrido guiado de ADAM. Esta demostración usa respuestas predefinidas; no está conectada a un modelo de inteligencia artificial.",
    },
}

# Solo enlaces públicos verificados. Los campos vacíos no se muestran.
CONFIGURACION = {
    "correo": "",
    "whatsapp": "",
    "instagram": "",
    "linkedin": "https://www.linkedin.com/in/gregorio-devey/",
    "github": "https://github.com/gregoriodevey99-oss",
    "youtube": "",
    "ubicacion": "Buenos Aires, Argentina",
}
