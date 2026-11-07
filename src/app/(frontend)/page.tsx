"use client"

import { useEffect, useMemo, useState } from "react"

const products = [
  [
    "Prayers Tee",
    "/brand/web/product-1.webp",
    "/brand/web/product-1-black.webp",
  ],
  [
    "Signature Pocket Tee",
    "/brand/web/product-2.webp",
    "/brand/web/product-2-black.webp",
  ],
  [
    "Signature Tee",
    "/brand/web/product-3.webp",
    "/brand/web/product-3-black.webp",
  ],
  [
    "Property Tee",
    "/brand/web/product-4.webp",
    "/brand/web/product-4-black.webp",
  ],
] as const

const sizes = ["S", "M", "L", "XL", "2XL", "3XL"] as const
type Size = typeof sizes[number]
type Currency = "XOF" | "EUR" | "USD"
type Mode = "light" | "dark"
type ContentPanel = "collection" | "story" | "contact"
type SocialLink = {
  label: string
  href: string
}
type CartItem = {
  key: string
  productIndex: number
  name: string
  color: Mode
  size: Size
  quantity: number
}

const copy = {
  fr: {
    menu: "Menu",
    close: "Fermer",
    collection: "Collection",
    story: "Histoire",
    contact: "Contact",
    cart: "Panier",
    empty: "Votre panier est vide.",
    hero: "Fort par Son Esprit",
    intro: "Créé pour les forts.",
    light: "Clair",
    dark: "Sombre",
    shop: "Acheter",
    newCollection: "Nouvelle collection",
    size: "Taille",
    add: "Ajouter",
    campaign: "Jeunes Prodiges",
    discover: "Découvrir",
    navigation: "Navigation",
    social: "Réseaux",
    remove: "Supprimer",
    subtotal: "Sous-total",
    checkout: "Commander",
    continue: "Continuer mes achats",
    order: "Commande Valens Studios",
    customerName: "Nom & Prénoms :",
    whatsapp: "Numéro WhatsApp :",
    deliveryAddress: "Localisation ou adresse de livraison :",
    orderDetails: "Détails de la commande :",
  },
  en: {
    menu: "Menu",
    close: "Close",
    collection: "Collection",
    story: "Story",
    contact: "Contact",
    cart: "Bag",
    empty: "Your bag is empty.",
    hero: "Strong by His Spirit",
    intro: "Made for the strong.",
    light: "Light",
    dark: "Dark",
    shop: "Shop",
    newCollection: "New collection",
    size: "Size",
    add: "Add",
    campaign: "Young Prodigies",
    discover: "Discover",
    navigation: "Navigation",
    social: "Social",
    remove: "Remove",
    subtotal: "Subtotal",
    checkout: "Checkout",
    continue: "Continue shopping",
    order: "Valens Studios order",
    customerName: "Full name:",
    whatsapp: "WhatsApp number:",
    deliveryAddress: "Location or delivery address:",
    orderDetails: "Order details:",
  },
}

const socialLinks: SocialLink[] = []

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function HomePage() {
  const [language, setLanguage] = useState<"fr" | "en">("fr")
  const [currency, setCurrency] = useState<Currency>("XOF")
  const [mode, setMode] = useState<Mode>("light")
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [contentPanel, setContentPanel] = useState<ContentPanel | null>(null)
  const [productSizes, setProductSizes] = useState<Record<number, Size>>({})
  const [cart, setCart] = useState<CartItem[]>([])
  const t = copy[language]
  const unitPrice = currency === "XOF" ? 12000 : 35

  const price = (value: number) => {
    if (currency === "XOF")
      return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`
    if (currency === "EUR") return `${value} €`
    return `$${value}`
  }

  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * unitPrice,
    0,
  )

  const checkoutHref = useMemo(() => {
    const lines = cart.map(
      (item) =>
        `${item.quantity} × ${item.name} — ${
          item.color === "dark" ? t.dark : t.light
        }, ${t.size} ${item.size}`,
    )
    return `mailto:valensbrand214@gmail.com?subject=${encodeURIComponent(t.order)}&body=${encodeURIComponent(
      [
        t.order,
        "",
        t.customerName,
        "",
        t.whatsapp,
        "",
        t.deliveryAddress,
        "",
        "————————————",
        t.orderDetails,
        "",
        ...lines,
        "",
        `${t.subtotal}: ${price(subtotal)}`,
      ].join("\n"),
    )}`
  }, [cart, currency, language, subtotal, t])

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || cartOpen || contentPanel ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen, cartOpen, contentPanel])

  const addToCart = (productIndex: number) => {
    const size = productSizes[productIndex] ?? "M"
    const [name] = products[productIndex]
    const key = `${productIndex}-${mode}-${size}`
    setCart((items) => {
      const exists = items.some((item) => item.key === key)
      return exists
        ? items.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [
            ...items,
            { key, productIndex, name, color: mode, size, quantity: 1 },
          ]
    })
    setContentPanel(null)
    setCartOpen(true)
  }

  const updateQuantity = (key: string, change: number) => {
    setCart((items) =>
      items
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const links = [
    [t.collection, "collection"],
    [t.story, "story"],
    [t.contact, "contact"],
  ] as const

  const openPanel = (panel: ContentPanel) => {
    setMenuOpen(false)
    setContentPanel(panel)
  }

  return (
    <main className={`valens-site mode-${mode}`}>
      <header className="site-header">
        <button className="mobile-only" onClick={() => setMenuOpen(true)}>
          {t.menu}
        </button>
        <nav className="desktop-nav">
          {links.map(([label, panel]) => (
            <button onClick={() => openPanel(panel)} key={panel}>
              {label}
            </button>
          ))}
        </nav>
        <a className="logo" href="#top" aria-label="Valens">
          <img src="/brand/valens-logo.svg" alt="" />
        </a>
        <div className="header-tools">
          <div className="selectors desktop-only">
            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as "fr" | "en")
              }
              aria-label="Langue"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as Currency)}
              aria-label="Devise"
            >
              <option value="XOF">FCFA</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <button onClick={() => setCartOpen(true)}>
            {t.cart} {count > 0 && `(${count})`}
          </button>
        </div>
      </header>

      <button
        className={`backdrop ${
          menuOpen || cartOpen || contentPanel ? "open" : ""
        }`}
        onClick={() => {
          setMenuOpen(false)
          setCartOpen(false)
          setContentPanel(null)
        }}
        aria-label={t.close}
      />

      <aside
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button className="panel-close" onClick={() => setMenuOpen(false)}>
          {t.close}
        </button>
        <img src="/brand/valens-logo.svg" alt="Valens" />
        <nav>
          {links.map(([label, panel]) => (
            <button onClick={() => openPanel(panel)} key={panel}>
              {label}
            </button>
          ))}
        </nav>
        <div className="selectors mobile-selectors">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as "fr" | "en")}
            aria-label="Langue"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as Currency)}
            aria-label="Devise"
          >
            <option value="XOF">FCFA</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </aside>

      <aside
        className={`content-panel ${contentPanel ? "open" : ""}`}
        aria-hidden={!contentPanel}
      >
        <div className="content-panel-head">
          <span>Valens Studios</span>
          <button onClick={() => setContentPanel(null)}>{t.close}</button>
        </div>

        {contentPanel === "collection" && (
          <div className="panel-section panel-collection">
            <div className="panel-title">
              <p>2026</p>
              <h2>{t.newCollection}</h2>
              <div className="mode-switch">
                <button
                  className={mode === "light" ? "active" : ""}
                  onClick={() => setMode("light")}
                >
                  {t.light}
                </button>
                <button
                  className={mode === "dark" ? "active" : ""}
                  onClick={() => setMode("dark")}
                >
                  {t.dark}
                </button>
              </div>
            </div>
            <div className="panel-products">
              {products.map(([name, whiteImage, blackImage], index) => {
                const image = mode === "light" ? whiteImage : blackImage
                const size = productSizes[index] ?? "M"
                return (
                  <article key={name}>
                    <img src={image} alt={name} />
                    <div>
                      <h3>{name}</h3>
                      <p>{price(unitPrice)}</p>
                    </div>
                    <div className="panel-product-sizes">
                      {sizes.map((option) => (
                        <button
                          key={option}
                          className={size === option ? "active" : ""}
                          onClick={() =>
                            setProductSizes((current) => ({
                              ...current,
                              [index]: option,
                            }))
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <button
                      className="panel-add"
                      onClick={() => addToCart(index)}
                    >
                      {t.add} <span>+</span>
                    </button>
                  </article>
                )
              })}
            </div>
          </div>
        )}

        {contentPanel === "story" && (
          <article className="panel-section story-panel">
            <p className="panel-kicker">Valens Studios</p>
            <h2>
              MORE THAN WHAT YOU WEAR.
              <br />
              IT&apos;S WHAT YOU STAND FOR.
            </h2>
            <div className="story-copy">
              <p>
                VALENS was born from a simple belief: true strength is not
                defined by what you show, but by what you carry within.
              </p>
              <p>
                In a world that constantly changes, we believe in building
                something that lasts. Something rooted in purpose, shaped by
                discipline, and driven by the courage to become more.
              </p>
              <p>
                Our name represents strength, resilience, and the determination
                to stand firm. It is a reminder that identity goes beyond
                appearance, and that what you wear should reflect what you
                believe.
              </p>
              <p>
                Every piece tells a story. Every detail carries an intention.
                Every collection is an expression of a mindset.
              </p>
              <p>
                We don&apos;t create clothing just to follow trends. We create
                to express identity, challenge limits, and inspire a generation
                to stand for something greater.
              </p>
              <strong>
                VALENS IS NOT JUST WHAT YOU WEAR.
                <br />
                IT IS WHAT YOU REPRESENT.
              </strong>
            </div>
          </article>
        )}

        {contentPanel === "contact" && (
          <section className="panel-section contact-panel">
            <p className="panel-kicker">Valens Studios</p>
            <h2>{t.contact}</h2>
            <div className="contact-list">
              <div>
                <span>Email</span>
                <a href="mailto:valensbrand214@gmail.com">
                  valensbrand214@gmail.com
                </a>
              </div>
              <div>
                <span>WhatsApp</span>
                <a
                  href="https://wa.me/22944955178"
                  target="_blank"
                  rel="noreferrer"
                >
                  +229 44 95 51 78
                </a>
              </div>
              {socialLinks.length > 0 && (
                <div>
                  <span>{t.social}</span>
                  {socialLinks.map((social) => (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      key={social.label}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </aside>

      <aside
        className={`cart-drawer ${cartOpen ? "open" : ""}`}
        aria-hidden={!cartOpen}
      >
        <div className="cart-head">
          <h2>
            {t.cart} <span>{count}</span>
          </h2>
          <button onClick={() => setCartOpen(false)}>{t.close}</button>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <p className="empty-cart">{t.empty}</p>
          ) : (
            cart.map((item) => {
              const product = products[item.productIndex]
              const image = item.color === "dark" ? product[2] : product[1]
              return (
                <article className="cart-item" key={item.key}>
                  <img src={image} alt="" />
                  <div>
                    <div className="cart-item-title">
                      <h3>{item.name}</h3>
                      <p>{price(unitPrice * item.quantity)}</p>
                    </div>
                    <p className="variant">
                      {item.color === "dark" ? t.dark : t.light} · {t.size}{" "}
                      {item.size}
                    </p>
                    <div className="cart-actions">
                      <div className="quantity">
                        <button onClick={() => updateQuantity(item.key, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.key, 1)}>
                          +
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          setCart((items) =>
                            items.filter((entry) => entry.key !== item.key),
                          )
                        }
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </div>
        <div className="cart-foot">
          <div>
            <span>{t.subtotal}</span>
            <strong>{price(subtotal)}</strong>
          </div>
          <a
            className={cart.length ? "checkout" : "checkout disabled"}
            href={cart.length ? checkoutHref : undefined}
          >
            {t.checkout} <Arrow />
          </a>
          <button onClick={() => setCartOpen(false)}>{t.continue}</button>
        </div>
      </aside>

      <section className="hero" id="top">
        <picture>
          <source
            media="(min-width: 761px)"
            srcSet="/brand/web/hero-desktop.webp"
          />
          <img src="/brand/web/hero-mobile.webp" alt="Valens collection 2026" />
        </picture>
        <div className="shade" />
        <div className="hero-copy">
          <h1>{t.hero}</h1>
          <button onClick={() => openPanel("collection")}>
            {t.collection} 2026 <Arrow />
          </button>
        </div>
      </section>

      <section className="intro" id="story">
        <p>Valens Studios</p>
        <h2>{t.intro}</h2>
        <span>1 Jean 2:14</span>
      </section>

      <section className="mode-visual">
        <img
          key={mode}
          src={
            mode === "light" ? "/brand/web/light.webp" : "/brand/web/dark.webp"
          }
          alt={
            mode === "light"
              ? "Collection Valens claire"
              : "Collection Valens sombre"
          }
        />
        <div>
          <span>{mode === "light" ? t.light : t.dark}</span>
          <div className="mode-buttons">
            <button
              className={mode === "light" ? "active" : ""}
              onClick={() => setMode("light")}
            >
              {t.light}
            </button>
            <button
              className={mode === "dark" ? "active" : ""}
              onClick={() => setMode("dark")}
            >
              {t.dark}
            </button>
          </div>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="section-title">
          <h2>{t.newCollection}</h2>
          <div className="mode-switch">
            <button
              className={mode === "light" ? "active" : ""}
              onClick={() => setMode("light")}
            >
              {t.light}
            </button>
            <button
              className={mode === "dark" ? "active" : ""}
              onClick={() => setMode("dark")}
            >
              {t.dark}
            </button>
          </div>
        </div>
        <div className="product-grid">
          {products.map(([name, whiteImage, blackImage], index) => {
            const size = productSizes[index] ?? "M"
            const image = mode === "light" ? whiteImage : blackImage
            return (
              <article className="product" key={name}>
                <button
                  className="product-image"
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                >
                  <img
                    key={`${name}-${mode}`}
                    src={image}
                    alt={`${name} — ${mode === "light" ? t.light : t.dark}`}
                  />
                </button>
                <div className="product-meta">
                  <div className="product-info">
                    <h3>{name}</h3>
                    <p>{price(unitPrice)}</p>
                  </div>
                  <div className="size-block">
                    <span>{t.size}</span>
                    <div>
                      {sizes.map((option) => (
                        <button
                          key={option}
                          className={size === option ? "active" : ""}
                          onClick={() =>
                            setProductSizes((current) => ({
                              ...current,
                              [index]: option,
                            }))
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    className="add-product"
                    onClick={() => addToCart(index)}
                  >
                    {t.add}
                    <span>+</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="campaign">
        <picture>
          <source
            media="(min-width: 761px)"
            srcSet="/brand/web/campaign-desktop.webp"
          />
          <img src="/brand/web/campaign-mobile.webp" alt="Campagne Valens" />
        </picture>
        <div>
          <h2>{t.campaign}</h2>
          <button onClick={() => openPanel("collection")}>
            {t.discover} <Arrow />
          </button>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-mark">
          <img src="/brand/valens-logo-footer.svg" alt="" />
          <strong>VALENS</strong>
        </div>
        <div className="footer-links">
          <div>
            <span>{t.navigation}</span>
            <button onClick={() => openPanel("collection")}>
              {t.collection}
            </button>
            <button onClick={() => openPanel("story")}>{t.story}</button>
          </div>
          <div>
            <span>{t.social}</span>
            {socialLinks.length > 0 ? (
              socialLinks.map((social) => (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  key={social.label}
                >
                  {social.label}
                </a>
              ))
            ) : (
              <button onClick={() => openPanel("contact")}>{t.contact}</button>
            )}
          </div>
          <div>
            <span>{t.contact}</span>
            <a href="mailto:valensbrand214@gmail.com">
              valensbrand214@gmail.com
            </a>
            <a
              href="https://wa.me/22944955178"
              target="_blank"
              rel="noreferrer"
            >
              +229 44 95 51 78
            </a>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Valens Studios</span>
          <span>{t.hero}</span>
        </div>
      </footer>
    </main>
  )
}
