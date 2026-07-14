import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Layout } from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] w-full flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <AlertCircle className="h-10 w-10 dark:text-white/40 text-foreground/45 mx-auto mb-6" />
          <h1 className="font-oxanium text-3xl chrome-text mb-4 uppercase">Страница не найдена</h1>
          <p className="font-space-grotesk dark:text-white/50 text-foreground/55 mb-8">
            Такой страницы не существует или она была перемещена.
          </p>
          <Link href="/" className="eom-btn-primary inline-flex">
            На главную
          </Link>
        </div>
      </div>
    </Layout>
  );
}
