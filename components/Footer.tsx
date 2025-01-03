'use client';

import Link from 'next/link';
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin, BsYoutube } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white border-t-8 border-teal-500 py-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Footer Top Section */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Title Section */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="text-xl font-bold text-blue-500 flex items-center"
            >
              <span className="px-3 py-1 bg-blue-700 text-white rounded-lg">MAMLA</span>
              <span className="ml-2 text-white">
                KARO<sup>®</sup>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              MAMLA KARO is a cutting-edge platform connecting users to expert legal professionals and services for a better, accessible legal experience.
            </p>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Work with Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://legabyte.zohorecruit.in/jobs/Careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Lawyers Click Here
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Follow Us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="https://www.instagram.com/mamla_karo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/company/mamla-karo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-700"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/channel/mamlakaro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/mamla_karo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/mamla_karo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/terms-of-use" className="text-gray-400 hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-white">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="border-t border-gray-600 my-8" />

        {/* Footer Bottom Section */}
        <div className="w-full flex justify-between sm:flex-col sm:items-center sm:gap-4 mt-8">
          <div className="text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} MAMLA KARO®</p>
          </div>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Link
              href="https://www.facebook.com/mamla_karo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-600"
            >
              <BsFacebook />
            </Link>
            <Link
              href="https://www.instagram.com/mamla_karo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-pink-600"
            >
              <BsInstagram />
            </Link>
            <Link
              href="https://twitter.com/mamla_karo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400"
            >
              <BsTwitter />
            </Link>
            <Link
              href="https://www.linkedin.com/company/mamla-karo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-700"
            >
              <BsLinkedin />
            </Link>
            <Link
              href="https://www.youtube.com/channel/mamlakaro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-red-600"
            >
              <BsYoutube />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-gray-400 mt-4">
          <p>
            Disclaimer: Please note that MAMLA KARO is not a law firm and does not engage in the practice of law or solicit Lawyers. MAMLA KARO is an advanced, AI-powered technology platform as web and Mobile Application designed to facilitate connections between users and a diverse range of legal and financial professionals. Our aim is to provide an accessible and convenient way for users to seek guidance from Legal Experts and other professionals based on their specific needs and demands. All interactions or consultations facilitated through MAMLA KARO are between users and independent professionals. MAMLA KARO is not responsible for any advice or services provided by these independent professionals.
          </p>
        </div>

        {/* Contact Email */}
        <div className="text-center text-sm text-gray-400 mt-4">
          <p>Contact us: <a href="mailto:help@mamlakaro.com" className="text-blue-500">care@mamlakaro.com</a></p>
        </div>
      </div>
    </footer>
  );
}
