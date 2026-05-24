import { WifiIcon } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaRedditAlien, FaTwitter } from "react-icons/fa6";
import { footerStyles as styles } from "./footer.styles";

const Footer = () => {
  const footerLinks = [
    "Privaacy Policy",
    "Do not sell my personal info",
    "Terms of Service",
    "nbcnews.com Site Map",
  ];
  const footerNavLinks = ["About", "Contact", "Careers", "Coupons "];
  return (
    <div>
      <footer className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.logoSection}>
            <Image
              src="/logo/logo2.png"
              alt="NBC News Logo"
              width={60}
              height={40}
            />
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} NBC News
            </p>
          </div>
          <ul className={styles.footerLinksDiv}>
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className={styles.footerLinks}
              >
                {link}
              </a>
            ))}
          </ul>
          <div className={styles.footerNavLinksContainer}>
            <ul className={styles.footerNavLinksDiv}>
              {footerNavLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className={styles.footerLinks}
                >
                  {link}
                </a>
              ))}
            </ul>
            <div className={styles.socialIcons}>
              <WifiIcon className={styles.socialIcon} size={20} />
              <FaTwitter className={styles.socialIcon} size={20} />
              <FaRedditAlien className={styles.socialIcon} size={20} />
              <FaFacebook className={styles.socialIcon} size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
