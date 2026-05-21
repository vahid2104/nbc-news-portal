import { BookmarkIcon, HeartIcon, ShareIcon } from "lucide-react";
import Image from "next/image";
import { heroStyles as styles } from "./hero.styles";

const HeroSection = () => {
  return (
    <div className={styles.mainContainer}>
      <Image
        src="/images/hero.png"
        alt="Hero Image"
        className={styles.image}
        width={700}
        height={600}
      />
      <div className={styles.content}>
        <div className="flex">
          <span className={styles.trending}>Trending</span>
          <div className={styles.iconContainer}>
            <button className={styles.iconButton}>
              <HeartIcon className={styles.icon} />
            </button>
            <button className={styles.iconButton}>
              <ShareIcon className={styles.icon} />
            </button>
            <button className={styles.iconButton}>
              <BookmarkIcon className={styles.icon} />
            </button>
          </div>
        </div>
        <h2 className={styles.title}>
          Cake meme reflects coronavirus absurdity in a world where nothing is
          what it seems
        </h2>
        <p className={styles.description}>
          Earlier this month, a viral video depicting hyper-realistic cakes as
          everyday items had folks on social media double-guessing every other
          post, and sometimes even their own realities, effectively launching
          the next meme : “Is this real or is this cake?”
        </p>
          
          <p className={styles.metaInfo}>
            <span className={styles.metaHighlight}>2 hours ago</span>
            By Lucy Hiddleston | 4min read</p>
      </div>
    </div>
  );
};

export default HeroSection;
