"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
const links = [["/", "Home"], ["/oem-odm", "OEM / ODM"], ["/factory", "Factory & Quality"], ["/applications", "Applications"], ["/about", "About Us"], ["/resources", "Resources"]];
export default function Header({ categories }: { categories: string[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="logo brand-image-link"><img src="/xinshern-logo.jpg" alt="XINSHERN Lighting"/></Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
      <div className="nav-dropdown"><Link href="/products" aria-current={pathname.startsWith("/products") ? "page" : undefined}>Products</Link><div className="mega-menu"><Link className="all-products-link" href="/products">All Products</Link>{categories.map(category => <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>)}</div></div>
      {links.slice(1).map(([href, label]) => href === "/applications" ? <div key={href} className="nav-dropdown"><Link href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link><div className="mega-menu application-menu">{[["case","Case"],["guides","Application Guides"],["scenes","Scenes"]].map(([key,title])=><Link key={key} href={`/applications?category=${key}`}>{title}</Link>)}</div></div> : <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
    </nav><LanguageSwitcher/><Link href="/contact" className="header-cta">Get a Quote</Link>
    <button type="button" className="menu-btn" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div><nav id="mobile-navigation" aria-label="Mobile navigation" className={`mobile-menu ${open ? "open" : ""}`}><LanguageSwitcher loadScript={false}/>{[links[0], ["/products", "Products"], ...links.slice(1), ["/contact", "Get a Quote"]].map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav></header>;
}
