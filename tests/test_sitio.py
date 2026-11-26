import unittest

from app import create_app


class PublicSiteTests(unittest.TestCase):
    def setUp(self):
        self.app = create_app({"TESTING": True})
        self.client = self.app.test_client()

    def test_public_pages(self):
        routes = [
            "/",
            "/soluciones",
            "/nosotros",
            "/contacto",
            "/privacidad",
            "/productos/novashop",
            "/productos/novacore",
            "/productos/nova-ai",
            "/productos/novafinance",
            "/demos/novashop",
            "/demos/novacore",
            "/demos/nova-ai",
        ]
        for route in routes:
            with self.subTest(route=route):
                response = self.client.get(route)
                self.assertEqual(response.status_code, 200)

    def test_invalid_product_returns_404(self):
        response = self.client.get("/productos/no-existe")
        self.assertEqual(response.status_code, 404)

    def test_finance_demo_opens_version_information(self):
        response = self.client.get("/demos/novafinance")
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.headers["Location"], "/productos/novafinance#versiones")

    def test_finance_has_its_own_page_and_no_unavailable_demo(self):
        response = self.client.get("/productos/novafinance")
        self.assertIn(b'id="versiones"', response.data)
        self.assertNotIn(b'href="/demos/novafinance"', response.data)
        self.assertNotIn(b'id="chat-messages"', response.data)

    def test_only_public_routes_are_registered(self):
        routes = {rule.rule for rule in self.app.url_map.iter_rules()}
        expected = {
            "/",
            "/productos",
            "/productos/<slug>",
            "/demos/<slug>",
            "/soluciones",
            "/nosotros",
            "/contacto",
            "/privacidad",
            "/favicon.ico",
            "/static/<path:filename>",
        }
        self.assertEqual(routes, expected)

    def test_public_pages_do_not_show_private_access_link(self):
        response = self.client.get("/")
        self.assertNotIn("Acceso privado".encode(), response.data)

    def test_favicon_redirects_to_svg(self):
        response = self.client.get("/favicon.ico")
        self.assertEqual(response.status_code, 302)
        self.assertIn("/static/img/favicon.svg", response.headers["Location"])


if __name__ == "__main__":
    unittest.main()
