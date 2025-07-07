import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../Public/images/Caterhealth-new-logo.png"; // Adjust the path as necessary

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white-600 rounded-full flex items-center justify-center">
                <img
                  src={logo}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                    // borderRadius: '50%',
                    // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                />{" "}
              </div>
              <span className="text-xl font-bold">Cater Health</span>
            </div>
            <p className="text-gray-400 mb-4">
              Science-backed probiotics for optimal gut health and overall
              wellness.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/gut-health"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gut Health
                </Link>
              </li>
              <li>
                <Link
                  to="/category/immune-support"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Immune Support
                </Link>
              </li>
              <li>
                <Link
                  to="/category/womens-health"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Women's Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">+91 70 7666 7666,</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">info@caterhealth.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-10 h-10 text-gray-400" />
                <span className="text-gray-400">
                  Plot No: 01, Block No:01, Vittal Rao Nagar, Madhapur,
                  Hyderabad - 500081{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Cater Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
