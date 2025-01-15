import Link from "next/link";
import Image from 'next/image';
import styles from './Footer.module.css'

const ShareThis = ({ headline, post }) => {
  return (
    <div className="text-align-center">
      {headline && <h3>{headline}</h3>}
      <div className={styles.iconLinks} style={{ justifyContent: 'center', margin: '1rem auto 8rem' }}>
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${post.link}`} target="_blank">
          <Image
            src={"/icon-facebook-green.svg"}
            width={20}
            height={20}
            alt="Facebook"
          />
        </Link>
        <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${post.link}`} target="_blank">
          <Image
            src={"/icon-linkedin-green.svg"}
            width={20}
            height={20}
            alt="LinkedIn"
          />
        </Link>
        <Link href={`https://twitter.com/intent/tweet?url=${post.link}`} target="_blank">
          <Image
            src={"/icon-x-green.svg"}
            width={20}
            height={20}
            alt="Twitter"
          />
        </Link>
      </div>
    </div>
  );
}

export default ShareThis;