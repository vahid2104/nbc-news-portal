import Image from "next/image";
import { Menu, Search, User } from "lucide-react";

import { categories } from "@/lib/mockData";
import { navbarStyles as styles } from "./navbar.styles";

export default function Navbar() {
  return (
    <header className={styles.mainBox}>
      <nav className={styles.navContainer}>
        <Image
          src="/logo/logo.png"
          alt="NBC News Logo"
          width={48}
          height={48}
          className={styles.logo}
          priority
        />

        <ul className={styles.navList}>
          {categories.map((item) => (
            <li key={item} className={styles.navItem}>
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.iconContainer}>
          <User className={styles.icon} />
          <Search className={styles.icon} />
          <Menu className={styles.icon} />
        </div>
      </nav>
    </header>
  );
}