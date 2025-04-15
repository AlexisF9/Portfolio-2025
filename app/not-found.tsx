import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Page introuvable</h1>
      <p className="text-lg mb-6">
        Désolé, la page que vous recherchez n&apos;existe pas.
      </p>
      <Link href="/">
        <button>Retour à l&apos;accueil</button>
      </Link>
    </div>
  );
}
