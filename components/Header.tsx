"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  ["/", "Home"],
  ["/oem-odm", "OEM / ODM"],
  ["/factory", "Factory & Quality"],
  ["/applications", "Applications"],
  ["/about", "About Us"],
  ["/resources", "Resources"],
];

export default function Header({categories}:{categories:string[]}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">

        <Link href="/" className="logo-brand-image-link">
          <img src="/xinshern-logo.jpg" alt="XINSHERN Lighting" />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">

          <Link href="/">Home</Link>

          <Link href="/oem-odm">
            OEM / ODM
          </Link>

          <Link href="/factory">
            Factory & Quality
          </Link>


          <div className="nav-dropdown">
            <span className="nav-dropdown-title">
              Applications
            </span>

            <div className="mega-menu application-menu">
              <Link href="/applications?category=case">
                Case
              </Link>

              <Link href="/applications?category=guides">
                Application Guides
              </Link>

              <Link href="/applications?category=scenes">
                Scenes
              </Link>
            </div>
          </div>


          <Link href="/about">
            About Us
          </Link>


          <div className="nav-dropdown">

            <span className="nav-dropdown-title">
              Resources
            </span>

            <div className="mega-menu">

              <Link href="/products">
                Product Catalog
              </Link>

              <Link href="/resources">
                Buyer Guides
              </Link>

              <Link href="/faq">
                Purchasing FAQ
              </Link>

              <Link href="/news">
                News & Updates
              </Link>

            </div>

          </div>


        </nav>


        <LanguageSwitcher />

        <Link href="/contact" className="header-cta">
          Get a Quote
        </Link>


        <button
          type="button"
          className="menu-btn"
          onClick={()=>setOpen(!open)}
          aria-label="Mobile navigation"
        >
          {open ? <X/> : <Menu/>}
        </button>

      </div>
    </header>
  );
}
