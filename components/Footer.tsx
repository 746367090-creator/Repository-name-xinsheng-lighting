import Link from "next/link";
export default function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-grid">
    <div><div className="logo"><strong>XINSHERN</strong><small>LIGHTING MANUFACTURER</small></div><p>Lighting development, manufacturing and OEM / ODM support for global brands, importers and retailers.</p><a href="mailto:sales@szxinshengtech.com">sales@szxinshengtech.com</a></div>
    <div><h4>Find Your Product</h4><div className="footer-links"><Link href="/products">All Products</Link><Link href="/applications">Applications & Cases</Link><Link href="/oem-odm">OEM / ODM Customization</Link><Link href="/contact?type=Sample%20Request">Request a Sample</Link></div></div>
    <div><h4>Meet XINSHERN</h4><div className="footer-links"><Link href="/about">About Us</Link><Link href="/factory">Factory & Quality</Link><Link href="/contact">Contact & Factory Visits</Link></div></div>
    <div><h4>Buyer Resources</h4><div className="footer-links"><Link href="/resources">Catalog & Guides</Link><Link href="/faq">Frequently Asked Questions</Link><Link href="/news">News & Updates</Link><Link href="/contact">Get a Quote</Link></div></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Shenzhen Xinshern Technology Co., Ltd.</span><span>Lighting manufacturing · Product development · OEM / ODM</span></div></div></footer>;
}
