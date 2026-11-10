"""Aplicación pública de portfolio para NovaLabs y sus demostraciones."""
from datetime import datetime

from flask import Flask, abort, redirect, render_template, url_for
from catalogo import CONFIGURACION, PRODUCTOS


def create_app(test_config=None):
    app = Flask(__name__)

    if test_config:
        app.config.update(test_config)

    @app.context_processor
    def contexto():
        negocio = CONFIGURACION.copy()
        negocio["whatsapp_url"] = (
            "https://wa.me/" + negocio["whatsapp"] if negocio.get("whatsapp") else ""
        )
        return {
            "negocio": negocio,
            "productos": PRODUCTOS,
            "anio": datetime.now().year,
        }

    @app.get("/")
    def inicio():
        return render_template("index.html", activo="inicio")

    @app.get("/productos")
    def productos_pagina():
        return redirect(url_for("inicio") + "#productos")

    @app.get("/productos/<slug>")
    def producto(slug):
        if slug not in PRODUCTOS:
            abort(404)
        return render_template(
            "producto.html", producto=PRODUCTOS[slug], slug=slug, activo="productos"
        )

    @app.get("/demos/<slug>")
    def demo(slug):
        if slug not in PRODUCTOS:
            abort(404)
        return render_template(
            "demo.html", producto=PRODUCTOS[slug], slug=slug, activo="productos"
        )

    @app.get("/soluciones")
    def soluciones():
        return render_template("soluciones.html", activo="soluciones")

    @app.get("/nosotros")
    def nosotros():
        return render_template("nosotros.html", activo="nosotros")

    @app.get("/contacto")
    def contacto():
        return render_template("contacto.html", activo="contacto")

    @app.get("/privacidad")
    def privacidad():
        return render_template("privacidad.html")

    @app.get("/favicon.ico")
    def favicon():
        return redirect(url_for("static", filename="img/favicon.svg"), code=302)

    @app.errorhandler(404)
    def no_encontrado(error):
        return render_template(
            "error.html",
            codigo=404,
            mensaje="La página que buscás no existe.",
        ), 404

    @app.errorhandler(405)
    def metodo_no_permitido(error):
        return render_template(
            "error.html",
            codigo=405,
            mensaje="Esta acción no está disponible en esta demostración.",
        ), 405

    return app


if __name__ == "__main__":
    from waitress import serve

    app = create_app()
    print(
        "\nNovaLabs Portfolio: http://127.0.0.1:5000\n"
        "Esta versión pública no recopila consultas ni incluye funciones privadas.\n"
        "Ctrl+C para detener.\n",
        flush=True,
    )
    serve(app, host="127.0.0.1", port=5000, threads=4)
