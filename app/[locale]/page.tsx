import { getIntl } from "../../lib/intl";
import styles from "./page.module.css";

type HomeProps = {
  params: { locale: string };
};

export default async function Home({ params: { locale } }: HomeProps) {
  const intl = await getIntl(locale);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {intl.formatMessage(
            { id: "page.home.title" }
          )}
        </h1>

        <p className={styles.description}>
          {intl.formatMessage({ id: "page.home.description" })}
        </p>
      </main>
    </div>
  );
}
