import Link from "next/link";
import styles from "./index.module.scss";
import { Image } from "cloudinary-react";
export default function Index({ post }) {
  return (
    <Link href={`/program/${post._id}`}>
      <div className={styles.a_post}>
        <div className={styles.top_post}>
          {post.photo && (
            <>
              {
                <Image
                  publicId={post.photo.public_id}
                  className={styles.image}
                  height="170px"
                  cloudName="drbir95bf"
                ></Image>
              }
            </>
          )}
        </div>
        <div className={styles.bottom_post}>
          <div className={styles.post_name}>
            <strong>{post.name}</strong>
          </div>
          <div className={styles.post_info}>
            <strong>Downloaded:</strong>
            {post.downloadCount}
          </div>
          <div className={styles.post_info}>
            <strong>Mod:</strong>
            {post.updatedAt}
          </div>
        </div>
      </div>
    </Link>
  );
}
