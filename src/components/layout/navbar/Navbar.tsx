import { BarChartIcon, SearchIcon, UserIcon } from "lucide-react";
import Image from "next/image"
import { navbarStyles as styles } from "./navbar.styles";

const navigation = [
  "Corona Updates", "Politics", "Business", "Sports", "World", "Travel", "Podcasts"
];

const Navbar = () => {
  return (
    <div className={styles.mainBox}>
        <nav className={styles.navContainer}>
            <Image src="/logo/logo.png" alt="NBC News Logo" width={50} height={50} />
            
            <ul className={styles.navList}>
                {navigation.map((item) => (
                    <li key={item} className={styles.navItem}>
                        {item}
                    </li>
                ))}
            </ul>

            <div className={styles.iconContainer}>
                <UserIcon className={styles.icon} />
                <SearchIcon className={styles.icon} />
                <BarChartIcon className={styles.barChartIcon} />
            </div>

        </nav>
    </div>
  )
}

export default Navbar