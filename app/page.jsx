import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page">
      <div className="landing-overlay" />
      <section className="landing-content">
        <div className="landing-copy">
          <div className="brand-mark brand-mark--landing">
            <Image
              src="/assets/images/nav.png"
              alt="Biblomania"
              width={260}
              height={62}
              priority
            />
          </div>
          <p className="eyebrow">Store Operations Dashboard</p>
          <h1>أدر الأوردرات والمصروفات بنفس روح Biblomania.</h1>
          <p className="landing-description">
            شاشة أسرع للتسجيل والمتابعة مع نفس الهوية البصرية: الشعار نفسه،
            الألوان نفسها، وتجربة أوضح على الموبايل والكمبيوتر.
          </p>
          <div className="landing-actions">
            <Link href="/system" className="btn-primary">
              دخول النظام
            </Link>
            <span className="landing-chip">Biblomania System</span>
          </div>
        </div>
      </section>
    </main>
  );
}
