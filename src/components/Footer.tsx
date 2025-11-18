import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-blue-900 text-white text-center py-6">
    <p>© {new Date().getFullYear()} Believers Temple Assemblies of God. All rights reserved.</p>
    <p className="text-sm mt-2">Follow us on Facebook | YouTube | WhatsApp | TikTok</p>
  </footer>
);

export default Footer;
